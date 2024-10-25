// https://vercel.com/docs/functions

import { NextResponse, type NextRequest } from 'next/server'

export function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', { status: 401 })
    return NextResponse.json({ success: true })
}
