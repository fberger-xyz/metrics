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
        // epoch
        const { epoch, ms: epochMs } = await step.run('1. Epoch', async () => {
            const before = Date.now()
            const epoch = await BeaconChainAPI.getEpoch(BeaconChainEpoch.LATEST)
            const after = Date.now()
            return { epoch, ms: after - before }
        })

        // queue
        const { queue, ms: queueMs } = await step.run('2. Queue', async () => {
            const before = Date.now()
            const queue = await BeaconChainAPI.getQueue()
            const after = Date.now()
            return { queue, ms: after - before }
        })

        // apr
        const { apr, ms: aprMs } = await step.run('3. APR', async () => {
            const before = Date.now()
            const apr = await BeaconChainAPI.getAPR(BeaconChainEpoch.LATEST)
            const after = Date.now()
            return { apr, ms: after - before }
        })

        // xata
        const { ms: xataMs } = await step.run('4. Xata', async () => {
            const before = Date.now()
            await prisma.beaconchain.create({
                data: {
                    epoch: epoch.raw?.data,
                    queue: queue.raw?.data,
                    apr: apr.raw?.data,
                },
            })
            const after = Date.now()
            return { ms: after - before }
        })

        // telegram
        const { ms: telegramMs } = await step.run('5. Notify execution', async () => {
            const before = Date.now()
            const bot = new Bot(token)
            const chatId = channelId
            const message = `${timestamp()}\nSnapshot of beaconchain metrics (${process.env.NODE_ENV})\nEpoch: ${epochMs}ms | Queue: ${queueMs}ms | APR: ${aprMs}ms | xata: ${xataMs}ms | Telegram: ${telegramMs}ms`
            await bot.api.sendMessage(chatId, message)
            const after = Date.now()
            return { ms: after - before }
        })

        // finally
        return { event, body: `Done at ${timestamp()}`, beaconchain: { epoch, queue, apr } }
    },
)
