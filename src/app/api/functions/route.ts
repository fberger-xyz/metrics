// https://vercel.com/docs/functions

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic' // static by default, unless reading the request

export function GET(request: NextRequest) {
    if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`)
        return NextResponse.json({
            status: 401,
            message: 'Unauthorized',
        })
    return NextResponse.json({
        message: `Hello from ${process.env.VERCEL_REGION}`,
    })
}
