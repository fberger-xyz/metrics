import { beaconchainSnapshotCron } from '@/inngest/beaconchain-snapshot-cron.function'
import { inngest } from '@/inngest/client'
import { serve } from 'inngest/next'

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [beaconchainSnapshotCron],
    streaming: 'allow',
})
