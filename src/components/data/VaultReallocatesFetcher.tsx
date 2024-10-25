'use client'

import { usePollingStore } from '@/stores/polling.store'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { gql, request } from 'graphql-request'
import { PaginatedVaultReallocates } from '@morpho-org/blue-api-sdk'

// https://tanstack.com/query/latest/docs/framework/react/graphql
// https://the-guild.dev/graphql/codegen/docs/guides/react-query

export function VaultReallocatesFetcher() {
    const { interval } = usePollingStore()
    const query = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const page = await request<PaginatedVaultReallocates>(
                'https://blue-api.morpho.org/graphql',
                gql`
                    query {
                        vaultReallocates(first: 3, skip: 0, orderBy: Timestamp, orderDirection: Desc) {
                            pageInfo {
                                count
                                countTotal
                            }
                            items {
                                id
                                timestamp
                                hash
                                logIndex
                                blockNumber
                                caller
                                shares
                                assets
                                type
                                market {
                                    id
                                    uniqueKey
                                    lltv
                                    oracleAddress
                                    irmAddress
                                    creationBlockNumber
                                    creationTimestamp
                                    creatorAddress
                                    whitelisted
                                    collateralPrice
                                    reallocatableLiquidityAssets
                                    targetBorrowUtilization
                                    targetWithdrawUtilization
                                }
                                vault {
                                    id
                                    address
                                    symbol
                                    name
                                    creationBlockNumber
                                    creationTimestamp
                                    creatorAddress
                                    whitelisted
                                }
                            }
                        }
                    }
                `,
            )
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
