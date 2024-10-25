import dayjs from 'dayjs'
import { inngest } from './client'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

const format = 'D MMMM YYYY hh:mm:ss A'
const timestamp = () => dayjs().tz('Europe/Paris').format(format)

// https://crontab.guru/every-5-minutes
// https://vercel.com/docs/cron-jobs

export const someRandomCron = inngest.createFunction(
    { id: 'some-random-cron' },
    { cron: 'TZ=Europe/Paris */30 * * * *' },
    async ({ event, step }) => {
        await step.run('Do stuff', async () => console.log(timestamp(), 'Do stuff'))
        return { event, body: `Done at ${timestamp()}` }
    },
)
