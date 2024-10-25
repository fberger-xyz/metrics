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
const groupId = String(process.env.TELEGRAM_GROUP_ID)
if (!groupId) throw new Error('TELEGRAM_GROUP_ID environment variable not found.')

// doc
// https://crontab.guru/every-5-minutes
// https://vercel.com/docs/cron-jobs

export const postTelegramMessageInGroupCron = inngest.createFunction(
    { id: 'post-telegram-message-in-group-cron' },
    { cron: 'TZ=Europe/Paris */5 * * * *' },
    async ({ event, step }) => {
        // 1
        await step.run('Send telegram message in group', async () => {
            const bot = new Bot(token)
            const chatId = groupId
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
