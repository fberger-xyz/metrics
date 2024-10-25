import { inngest } from '@/inngest/client'
import { helloWorld } from '@/inngest/hello-word.function'
import { postTelegramMessageInChannelCron } from '@/inngest/post-telegram-message-in-channel-cron.function'
import { postTelegramMessageInGroupCron } from '@/inngest/post-telegram-message-in-group-cron.function.ts'
import { someRandomCron } from '@/inngest/some-random-cron.function.ts'
import { serve } from 'inngest/next'

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [helloWorld, someRandomCron, postTelegramMessageInGroupCron, postTelegramMessageInChannelCron],
    streaming: 'allow',
})
