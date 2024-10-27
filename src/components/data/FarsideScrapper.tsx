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
            const pageToScrap = 'https://farside.co.uk/bitcoin-etf-flow-all-data/'
            const response = await fetch(`${root}/api/proxy?url=${encodeURIComponent(pageToScrap)}`, {
                method: 'GET',
                headers: { Accept: 'text/html', 'User-Agent': 'Mozilla/5.0' },
            })
            if (!response.ok) throw new Error(`Failed to fetch text/html of ${pageToScrap}`)
            const htmlContent = await response.text()
            console.log({ htmlContent })
            const parsedHtlm = cheerio.load(htmlContent)

            // chatgpt
            const table = parsedHtlm('table.etf') // Select the specific ETF table
            const headers: string[] = []
            table.find('th').each((_, element) => {
                headers.push(parsedHtlm(element).text().trim())
            })
            const rows: string[][] = []
            table.find('tr').each((_, row) => {
                const rowData: string[] = []
                parsedHtlm(row)
                    .find('td')
                    .each((_, cell) => {
                        rowData.push(parsedHtlm(cell).text().trim())
                    })
                if (rowData.length > 0) {
                    rows.push(rowData)
                }
            })
            const tableData = rows.map((row) => {
                const rowObject: { [key: string]: string } = {}
                headers.forEach((header, i) => {
                    rowObject[header] = row[i]
                })
                return rowObject
            })

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
