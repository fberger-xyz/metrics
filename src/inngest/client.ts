import { Inngest } from 'inngest'

if (!process.env.INGEST_CLIENT_ID) throw new Error(`value not found for INGEST_CLIENT_ID: ${process.env.INGEST_CLIENT_ID}`)
export const inngest = new Inngest({
    id: String(process.env.INGEST_CLIENT_ID) ?? 'metrics',
    env: process.env.INGEST_BRANCH,
})
