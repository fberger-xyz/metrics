import { ETF_TICKERS_CONFIG } from '@/config/farside.config'
import { EtfTickers, IconIds } from '@/enums'
import { cn } from '@/utils'
import dayjs from 'dayjs'
import { ReactNode } from 'react'
import IconWrapper from '../common/IconWrapper'

/**
 * helpers
 */

export const getConfig = (ticker: EtfTickers | string) =>
    ticker in EtfTickers
        ? ETF_TICKERS_CONFIG[ticker as EtfTickers]
        : {
              provider: ticker,
              index: Object.keys(ETF_TICKERS_CONFIG).length,
              colors: { light: 'black', dark: 'white' },
              url: '/',
          }
export const monthName = (monthIndex: number) =>
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][monthIndex]

/**
 * comp
 */

export function dateCell(props: { date: string | number; isHeader: boolean }) {
    return (
        <div className="flex w-20 justify-start overflow-hidden text-discreet md:w-32">
            {props.isHeader ? (
                <p className="text-nowrap sm:hidden">{props.date}</p>
            ) : (
                <>
                    <p className="hidden text-nowrap sm:flex">{dayjs(props.date).format('ddd DD MMM. YY')}</p>
                    <p className="text-nowrap sm:hidden">{dayjs(props.date).format('ddd DD')}</p>
                </>
            )}
        </div>
    )
}
export function tickerCell(props: { key: string; ticker: EtfTickers | string; flow: string | number | undefined; isHeader: boolean }) {
    return (
        <div
            key={props.key}
            className={cn('flex w-12 items-center justify-center overflow-hidden md:w-16 text-light-hover', {
                '-rotate-45 sm:rotate-0 h-8': props.isHeader,
            })}
        >
            <p className="text-nowrap" style={{ color: props.isHeader || !isNaN(Number(props.flow)) ? getConfig(props.ticker).colors.dark : '' }}>
                {props.flow ?? '-'}
            </p>
        </div>
    )
}
export function totalCell(props: { total: string | number; isHeader: boolean }) {
    return (
        <div className="flex w-12 justify-end overflow-hidden pl-2 text-discreet md:w-20">
            {props.isHeader ? (
                <>
                    <p className="hidden text-nowrap sm:flex">{props.total}</p>
                    <p className="sm:hidden">∑</p>
                </>
            ) : (
                <p className={cn('text-nowrap', { 'text-green-400': Number(props.total) > 0, 'text-red-400': Number(props.total) < 0 })}>
                    {props.total}
                </p>
            )}
        </div>
    )
}
export function rankCell(props: { rank: string | number; isHeader: boolean }) {
    return (
        <div className="flex w-12 items-center justify-end overflow-hidden text-discreet md:w-20">
            {props.isHeader ? (
                <>
                    <p className="hidden text-nowrap md:flex">{props.rank}</p>
                    <IconWrapper icon={IconIds.RANK} className="w-5" />
                </>
            ) : (
                <p className="text-nowrap">{props.rank}</p>
            )}
        </div>
    )
}

export function TableRow(props: { children: ReactNode; className?: string }) {
    return <div className={cn('flex items-center sm:gap-1 hover:bg-light-hover px-1', props.className)}>{props.children}</div>
}
