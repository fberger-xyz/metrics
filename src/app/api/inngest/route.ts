import { inngest } from '@/inngest/client'
import { postTelegramMessageInChannelCron } from '@/inngest/post-telegram-message-in-channel-cron.function'
import { postTelegramMessageInGroupCron } from '@/inngest/post-telegram-message-in-group-cron.function'
import { serve } from 'inngest/next'

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [postTelegramMessageInGroupCron, postTelegramMessageInChannelCron],
    streaming: 'allow',
})
