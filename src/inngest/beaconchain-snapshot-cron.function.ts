import dayjs from 'dayjs'
import { inngest } from './client'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { BeaconChainAPI } from '@/utils'
import { BeaconChainEpoch } from '@/enums'
import { PrismaClient } from '@prisma/client'

// helpers
dayjs.extend(utc)
dayjs.extend(timezone)
const format = 'D MMMM YYYY hh:mm:ss A'
const timestamp = () => dayjs().tz('Europe/Paris').format(format)
const prisma = new PrismaClient()

export const beaconchainSnapshotCron = inngest.createFunction(
    { id: 'beaconchain-snapshot-cron' },
    { cron: 'TZ=Europe/Paris 0 * * * *' }, // https://crontab.guru/every-1-hour
    async ({ event, step }) => {
        const epoch = await step.run('1. Epoch', async () => await BeaconChainAPI.getEpoch(BeaconChainEpoch.LATEST))
        const queue = await step.run('2. Queue', async () => await BeaconChainAPI.getQueue())
        const apr = await step.run('3. APR', async () => await BeaconChainAPI.getAPR(BeaconChainEpoch.LATEST))
        await step.run('4. Xata', async () => {
            await prisma.beaconchain.create({
                data: {
                    epoch: epoch.raw?.data,
                    queue: queue.raw?.data,
                    apr: apr.raw?.data,
                },
            })
        })
        return { event, body: `Done at ${timestamp()}`, beaconchain: { epoch, queue, apr } }
    },
)
