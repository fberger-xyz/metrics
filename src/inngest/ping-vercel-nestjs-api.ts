import dayjs from 'dayjs'
import { inngest } from './client'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// helpers
dayjs.extend(utc)
dayjs.extend(timezone)
const format = 'D MMMM YYYY hh:mm:ss A'
const timestamp = () => dayjs().tz('Europe/Paris').format(format)

export const pingVercelNestjsApi = inngest.createFunction(
    { id: 'ping-vercel-nestjs-api' },
    { cron: 'TZ=Europe/Paris * * * * *' },
    async ({ event, step }) => {
        // 1
        const data = await step.run('Ping API', async () => {
            const response = await fetch('https://nestjs-template-one.vercel.app', { method: 'GET' })
            const text = await response.text()
            return text
        })

        // ret
        return { event, body: `Done at ${timestamp()}`, data }
    },
)
