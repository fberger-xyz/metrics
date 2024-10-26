import dayjs from 'dayjs'
import { inngest } from './client'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { BeaconChainAPI } from '@/utils'
import { BeaconChainEpoch } from '@/enums'
import { PrismaClient } from '@prisma/client'
import { Bot } from 'grammy'

// helpers
dayjs.extend(utc)
dayjs.extend(timezone)
const format = 'D MMMM YYYY hh:mm:ss A'
const timestamp = () => dayjs().tz('Europe/Paris').format(format)

// telegram
const token = process.env.TELEGRAM_BOT_TOKEN
if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.')
const channelId = String(process.env.TELEGRAM_CHANNEL_ID)
if (!channelId) throw new Error('TELEGRAM_CHANNEL_ID environment variable not found.')

// prisma
const prisma = new PrismaClient()

export const beaconchainSnapshotCron = inngest.createFunction(
    { id: 'beaconchain-snapshot-cron' },
    { cron: 'TZ=Europe/Paris */30 * * * *' }, // https://crontab.guru/every-1-hour
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
        const telegramNotification = await step.run('5. Notify execution', async () => {
            const bot = new Bot(token)
            const chatId = channelId
            const message = `${timestamp()}\nSnapshot of beaconchain metrics.\nEpoch: ${epoch ? 'OK' : 'Error'} | Queue: ${queue ? 'OK' : 'Error'} | apr: ${apr ? 'OK' : 'Error'}`
            return await bot.api.sendMessage(chatId, message)
        })
        return { event, body: `Done at ${timestamp()}`, beaconchain: { epoch, queue, apr }, telegramNotification }
    },
)
