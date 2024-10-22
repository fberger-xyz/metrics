import { inngest } from './client'

export const someRandomCron = inngest.createFunction({ id: 'some-random-cron' }, { cron: 'TZ=Europe/Paris * * * * *' }, async ({ event, step }) => {
    await step.run('1', async () => console.log(Date.now(), 'step 1'))
    await step.run('2', async () => console.log(Date.now(), 'step 2'))
    await step.run('3', async () => console.log(Date.now(), 'step 3'))
    return { event, body: `Done at ${Date.now()}` }
})
