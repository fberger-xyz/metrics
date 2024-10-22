import dayjs from 'dayjs'
import { inngest } from './client'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

const format = 'D MMMM YYYY hh:mm:ss A'
const timestamp = () => dayjs().tz('Europe/Paris').format(format)
export const someRandomCron = inngest.createFunction({ id: 'some-random-cron' }, { cron: 'TZ=Europe/Paris * * * * *' }, async ({ event, step }) => {
    await step.run('1', async () => console.log(timestamp(), 'step 1'))
    await step.run('2', async () => console.log(timestamp(), 'step 2'))
    await step.run('3', async () => console.log(timestamp(), 'step 3'))
    return { event, body: `Done at ${timestamp()}` }
})
