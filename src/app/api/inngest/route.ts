import { inngest } from '@/inngest/client'
import { helloWorld } from '@/inngest/hello-word.function'
import { postTelegramMessageCron } from '@/inngest/post-telegram-message-cron.function.ts'
import { someRandomCron } from '@/inngest/some-random-cron.function.ts'
import { serve } from 'inngest/next'

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [helloWorld, someRandomCron, postTelegramMessageCron],
    streaming: 'allow',
})
