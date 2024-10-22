import { inngest } from '@/inngest/client'
import { prepareWeeklyDigest } from '@/inngest/some-random-cron.function.ts'
import { helloWorld } from '@/inngest/hello-word.function'
import { serve } from 'inngest/next'

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [helloWorld, prepareWeeklyDigest],
    streaming: 'allow',
})
