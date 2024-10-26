'use client'

import { toastStyle } from '@/config/toasts.config'
import { EventsData } from '@/interfaces'
import { usePollingStore } from '@/stores/polling.store'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'

export function AptosBlockFetcher() {
    const APTOS_MAINNET_API = 'https://api.mainnet.aptoslabs.com/v1/blocks'
    const { interval } = usePollingStore()
    const query = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const blockResponse = await fetch('https://fullnode.mainnet.aptoslabs.com/v1')
            if (!blockResponse.ok) throw new Error('Failed to fetch the latest block')
            const latestBlock: { block_height: string } = await blockResponse.json()
            console.log({ latestBlock })
            const eventsResponse = await fetch(`${APTOS_MAINNET_API}/by_height/${latestBlock.block_height}?with_transactions=true`)
            if (!eventsResponse.ok) throw new Error(`Failed to fetch events for block ${latestBlock.block_height}`)
            const eventsData: EventsData = await eventsResponse.json()
            console.log({ eventsData })
            toast.success('Refreshed', { style: toastStyle })
            return { latestBlock, eventsData }
        },
        refetchInterval: interval,
    })

    // loading
    if (query.isLoading)
        return (
            <div>
                <h1>status: {query.status}</h1>
                <p>Loading...</p>
            </div>
        )

    // error
    if (query.error instanceof Error)
        return (
            <div>
                <h1>status: {query.status}</h1>
                <p>Error: {query.error.message}</p>
            </div>
        )

    // status
    return (
        <div className="flex flex-col gap-1">
            <h1>status: {query.status}</h1>
            <h1>updated at: {dayjs(query.dataUpdatedAt).format('ddd. DD MMM. YYYY hh:mm:ss')} UTC</h1>
            <pre className="bg-light-hover p-2 text-xs">{JSON.stringify(query.data?.latestBlock, null, 2)}</pre>
            {query.data?.eventsData && (
                <pre className="bg-light-hover p-2 text-xs">
                    {dayjs(query.data.eventsData.block_timestamp).format('ddd. DD MMM. YYYY hh:mm:ss')} UTC
                </pre>
            )}
            {query.data?.eventsData && <pre className="bg-light-hover p-2 text-xs">{query.data.eventsData.transactions.length}</pre>}
            <pre className="bg-light-hover p-2 text-xs">{JSON.stringify(query.data?.eventsData, null, 2)}</pre>
        </div>
    )
}
