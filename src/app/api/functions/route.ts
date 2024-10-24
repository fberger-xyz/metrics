// https://vercel.com/docs/functions

import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic' // static by default, unless reading the request

export function GET(request: NextRequest) {
    const debug = false
    if (debug) console.log(request)
    return new Response(`Hello from ${process.env.VERCEL_REGION}`)
}
