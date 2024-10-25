import dayjs from 'dayjs'
import { inngest } from './client'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { Bot } from 'grammy'

// helpers
dayjs.extend(utc)
dayjs.extend(timezone)
const format = 'D MMMM YYYY hh:mm:ss A'
const timestamp = () => dayjs().tz('Europe/Paris').format(format)

// telegram
const token = process.env.TELEGRAM_BOT_TOKEN
if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.')
const channelId = process.env.TELEGRAM_CHANNEL_ID
if (!channelId) throw new Error('TELEGRAM_CHANNEL_ID environment variable not found.')

// doc
// https://crontab.guru/every-5-minutes
// https://vercel.com/docs/cron-jobs

export const postTelegramMessageInChannelCron = inngest.createFunction(
    { id: 'post-telegram-message-in-channel-cron' },
    { cron: 'TZ=Europe/Paris * * * * *' },
    async ({ event, step }) => {
        // 1
        await step.run('Send telegram message', async () => {
            const bot = new Bot(token)
            const chatId = channelId
            const message = `This is a cron job - ${timestamp()}`
            await bot.api.sendMessage(chatId, message)
        })

        // 2
        const getMe = await step.run('Get bot data', async () => {
            const bot = new Bot(token)
            const getMe = await bot.api.getMe()
            return getMe
        })

        // ret
        return { event, body: `Done at ${timestamp()}`, getMe }
    },
)
