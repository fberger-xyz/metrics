import PageWrapper from '@/components/common/PageWrapper'
import dayjs from 'dayjs'
import { promises as fs } from 'fs'
import numeral from 'numeral'

interface FarsideRow {
    Date: string | number
    IBIT: string | number
    FBTC: string | number
    BITB: string | number
    ARKB: string | number
    BTCO: string | number
    EZBC: string | number
    BRRR: string | number
    HODL: string | number
    BTCW: string | number
    GBTC: string | number
    BTC: string | number
    Total: string | number
    TotalCheck?: number
}

export default async function Page() {
    // load json
    const path = process.cwd() + '/src/data/farside-btc.json'
    const file = await fs.readFile(path, 'utf8')
    const rawData = JSON.parse(file) as FarsideRow[]

    // parse json
    const parsedData = rawData
        .filter((day) => dayjs(day.Date).isValid())
        .map((day) => {
            let totalCheck = 0
            const dup = { ...day }
            const entries = Object.entries(dup)
            for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
                const key = entries[entryIndex][0] as keyof typeof dup
                const value = entries[entryIndex][1]
                if (key === 'Date' || dayjs(key).isValid()) continue
                if (key === 'Total') continue
                else if (value === '-') dup[key] = 0
                else {
                    const sign = String(value).includes('(') || String(value).includes(')') ? -1 : 1
                    const parsedValue = numeral(String(value).replaceAll('(', '').replaceAll(')', '')).multiply(sign).value()
                    if (parsedValue === null || isNaN(parsedValue)) continue
                    dup[key] = parsedValue
                    totalCheck += parsedValue
                }
            }
            dup.TotalCheck = totalCheck
            return dup
        })

    return (
        <PageWrapper>
            {/* <FarsideScrapper /> */}
            <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </PageWrapper>
    )
}
