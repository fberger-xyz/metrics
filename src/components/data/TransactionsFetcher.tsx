'use client'

import { usePollingStore } from '@/stores/polling.store'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { gql, request } from 'graphql-request'
import { PaginatedTransactions } from '@morpho-org/blue-api-sdk'
import toast from 'react-hot-toast'

// https://tanstack.com/query/latest/docs/framework/react/graphql
// https://the-guild.dev/graphql/codegen/docs/guides/react-query

export function TransactionsFetcher() {
    const { interval } = usePollingStore()
    const query = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            // toast.loading('Refreshing...')
            const page = await request<PaginatedTransactions>(
                'https://blue-api.morpho.org/graphql',
                gql`
                    query {
                        transactions(first: 3, skip: 0, orderBy: Timestamp, orderDirection: Desc) {
                            pageInfo {
                                count
                                countTotal
                            }
                            items {
                                blockNumber
                                chain {
                                    network
                                }
                                id
                                timestamp
                                hash
                                logIndex
                                type
                                data {
                                    __typename
                                }
                            }
                        }
                    }
                `,
            )
            toast.success('Refreshed', {
                style: {
                    borderRadius: '8px',
                    background: 'var(--color-background)',
                    borderColor: 'var(--color-discreet)',
                    border: 1,
                    color: 'var(--color-primary)',
                },
            })
            return page
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
        <div>
            <h1>status: {query.status}</h1>
            <h1>updated at: {dayjs(query.dataUpdatedAt).format('ddd. DD MMM. YYYY hh:mm:ss')} UTC</h1>
            <pre className="bg-light-hover p-2 text-xs">{JSON.stringify(query.data, null, 2)}</pre>
        </div>
    )
}
