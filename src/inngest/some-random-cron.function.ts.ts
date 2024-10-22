import dayjs from 'dayjs'
import { inngest } from './client'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

const format = 'D MMMM YYYY hh:mm:ss A'
const timestamp = () => dayjs().tz('Europe/Paris').format(format)

// https://crontab.guru/every-5-minutes
export const someRandomCron = inngest.createFunction(
    { id: 'some-random-cron' },
    { cron: 'TZ=Europe/Paris */30 * * * *' },
    async ({ event, step }) => {
        await step.run('Do stuff', async () => console.log(timestamp(), 'Do stuff'))
        // await step.run('1', async () => console.log(timestamp(), 'step 1'))
        // await step.run('2', async () => console.log(timestamp(), 'step 2'))
        // await step.run('3', async () => console.log(timestamp(), 'step 3'))
        // await step.run('4', async () => console.log(timestamp(), 'step 4'))
        // await step.run('5', async () => console.log(timestamp(), 'step 5'))
        return { event, body: `Done at ${timestamp()}` }
    },
)
