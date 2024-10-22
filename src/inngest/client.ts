import { Inngest } from 'inngest'

console.log('process.env.BRANCH', process.env.BRANCH)
export const inngest = new Inngest({
    id: 'metrics',
    // env: process.env.BRANCH,
})
