import PageWrapper from '@/components/common/PageWrapper'
import { EtfTickers, IconIds } from '@/enums'
import { FarsideDayData } from '@/interfaces'
import dayjs from 'dayjs'
import { promises as fs } from 'fs'
import numeral from 'numeral'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { TableRow, dateCell, tickerCell, totalCell, rankCell, monthName, getConfig } from '@/components/farside/table'
import IconWrapper from '@/components/common/IconWrapper'
import LinkWrapper from '@/components/common/LinkWrapper'
dayjs.extend(weekOfYear)

export default async function Page() {
    // load json
    const path = process.cwd() + '/src/data/farside-btc.json'
    const file = await fs.readFile(path, 'utf8')
    const rawData = JSON.parse(file) as FarsideDayData[]

    // parse json
    const tickers: (EtfTickers | string)[] = []
    const farsideData = rawData
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
                if (!tickers.includes(key)) tickers.push(key)
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

    // apply rank
    const farsideDataSortedByTotal = [...farsideData].sort((curr, next) => next.TotalCheck - curr.TotalCheck)
    for (let sortedDayIndex = 0; sortedDayIndex < farsideDataSortedByTotal.length; sortedDayIndex++) {
        const dayIndex = farsideData.findIndex((day) => day.Date === farsideDataSortedByTotal[sortedDayIndex].Date)
        if (dayIndex >= 0) farsideData[dayIndex].dayRank = sortedDayIndex + 1
    }

    // group by month / week
    const farsideDataGroupedBy: { year: number; index: number; weeks: { index: number; days: FarsideDayData[] }[] }[] = []
    for (let dayIndex = 0; dayIndex < farsideData.length; dayIndex++) {
        // month
        const dayMonth = dayjs(farsideData[dayIndex].Date).month()
        let monthIndex = farsideDataGroupedBy.findIndex((month) => month.index === dayMonth)
        if (monthIndex < 0) {
            farsideDataGroupedBy.unshift({ year: dayjs(farsideData[dayIndex].Date).year(), index: dayMonth, weeks: [] })
            monthIndex = farsideDataGroupedBy.findIndex((month) => month.index === dayMonth)
        }

        // week
        const dayWeek = dayjs(farsideData[dayIndex].Date).week()
        let weekIndex = farsideDataGroupedBy[monthIndex].weeks.findIndex((week) => week.index === dayWeek)
        if (weekIndex < 0) {
            farsideDataGroupedBy[monthIndex].weeks.unshift({ index: dayWeek, days: [] })
            weekIndex = farsideDataGroupedBy[monthIndex].weeks.findIndex((week) => week.index === dayWeek)
        }

        // push
        farsideDataGroupedBy[monthIndex].weeks[weekIndex].days.unshift(farsideData[dayIndex])
    }

    // html
    return (
        <PageWrapper>
            {/* table */}
            <div className="flex w-full flex-col text-xs">
                {/* context */}
                <div className="flex w-full justify-center text-base text-discreet">
                    <p>Bitcoin ETF Flow $m USD</p>
                </div>

                {/* headers */}
                <TableRow className="border border-transparent bg-light-hover">
                    {dateCell({ date: 'Date', isHeader: true })}
                    {tickers
                        .sort((curr, next) => getConfig(curr).index - getConfig(next).index)
                        .map((ticker) => tickerCell({ key: ticker, ticker, flow: ticker, isHeader: true }))}
                    {totalCell({ total: 'Total', isHeader: true })}
                    {rankCell({ rank: 'Rank', isHeader: true })}
                </TableRow>

                {/* rows */}
                <div className="flex h-[450px] w-full flex-col overflow-y-scroll border border-light-hover">
                    {/* for each month */}
                    {farsideDataGroupedBy.map((month, monthIndex) => (
                        <div key={`${monthIndex}-${month.index}`} className="flex flex-col py-1">
                            <p className="px-1">
                                {monthName(month.index)} {month.year}
                            </p>

                            {/* for each week */}
                            {month.weeks.map((week, weekIndex) => (
                                <div
                                    key={`${monthIndex}-${month.index}-${weekIndex}-${week.index}`}
                                    className="flex flex-col gap-0 border-t border-light-hover py-0.5 sm:gap-0.5"
                                >
                                    {/* for each day */}
                                    {week.days.map((day, dayIndex) => (
                                        <TableRow key={`${monthIndex}-${month.index}-${weekIndex}-${week.index}-${dayIndex}-${day.Date}`}>
                                            {dateCell({ date: day.Date, isHeader: false })}
                                            {tickers
                                                .sort((curr, next) => getConfig(curr).index - getConfig(next).index)
                                                .map((ticker) =>
                                                    tickerCell({
                                                        key: `${monthIndex}-${month.index}-${weekIndex}-${week.index}-${dayIndex}-${day.Date}-${ticker}`,
                                                        ticker,
                                                        flow: day[ticker as keyof typeof day]
                                                            ? numeral(day[ticker as keyof typeof day]).format('0,0')
                                                            : '-',
                                                        isHeader: false,
                                                    }),
                                                )}
                                            {totalCell({ total: numeral(day.TotalCheck).format('0,0'), isHeader: false })}
                                            {rankCell({ rank: numeral(day.dayRank).format('0,0'), isHeader: false })}
                                        </TableRow>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex w-full items-center justify-center">
                    <LinkWrapper href="https://farside.co.uk/btc/" className="flex gap-1 text-light-hover hover:text-primary" target="_blank">
                        <p className="truncate text-xs">Data: farside.co.uk</p>
                    </LinkWrapper>
                    <div className="mt-1 flex w-full items-center justify-center">
                        <p className="text-light-hover">Scroll</p>
                        <IconWrapper icon={IconIds.SCROLL} className="w-5 animate-pulse" />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1 text-light-hover hover:text-primary">
                            <p className="truncate text-xs">CSV</p>
                            <IconWrapper icon={IconIds.CARBON_DOWNLOAD} className="w-4 animate-pulse text-primary" />
                        </button>
                        <button className="flex items-center gap-1 text-light-hover hover:text-primary">
                            <p className="truncate text-xs">Copy</p>
                            <IconWrapper icon={IconIds.CARBON_COPY} className="w-4 animate-pulse text-primary" />
                        </button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}
