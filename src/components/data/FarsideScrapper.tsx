'use client'

import { toastStyle } from '@/config/toasts.config'
import { usePollingStore } from '@/stores/polling.store'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'
import * as cheerio from 'cheerio'

export function FarsideScrapper() {
    const { interval } = usePollingStore()
    const query = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const root = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://metrics-five.vercel.app'
            const pageToScrap = 'https://farside.co.uk/btc/'
            const response = await fetch(`${root}/api/proxy?url=${encodeURIComponent(pageToScrap)}`, {
                method: 'GET',
                headers: { Accept: 'text/html', 'User-Agent': 'Mozilla/5.0' },
            })
            if (!response.ok) throw new Error(`Failed to fetch text/html of ${pageToScrap}`)
            const htmlContent = await response.text()
            const parsedHtlm = cheerio.load(htmlContent)

            // chatgpt
            const tableData: unknown[] = []
            const etfTable = parsedHtlm('table.etf') // Select the specific ETF table
            const headers: string[] = []
            etfTable
                .find('thead tr')
                .eq(1)
                .find('th')
                .each((_, th) => {
                    headers.push(parsedHtlm(th).text().trim())
                }) // Extract headers
            etfTable.find('tbody tr').each((_, row) => {
                const rowData: { [key: string]: string } = {}
                parsedHtlm(row)
                    .find('td')
                    .each((index, cell) => {
                        const cellText = parsedHtlm(cell).text().trim()
                        rowData[headers[index]] = cellText
                    })
                tableData.push(rowData)
            }) // Extract rows of data

            // notify
            toast.success('Refreshed', { style: toastStyle })

            // ret
            return tableData
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
            <pre className="bg-light-hover p-2 text-xs">{JSON.stringify(query.data, null, 2)}</pre>
        </div>
    )
}
