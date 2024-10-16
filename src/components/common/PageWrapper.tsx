'use client'

import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import GoBack from './GoBack'

export default function PageWrapper({ children, ...props }: { children: React.ReactNode }) {
    const pathname = usePathname()
    return (
        <Suspense
            fallback={
                <div className="flex h-full w-full items-center justify-center">
                    <p className="text-orange-400">Page loading...</p>
                </div>
            }
        >
            <div
                {...props}
                className="mx-auto mb-40 mt-24 flex max-w-[600px] flex-col items-start gap-8 overflow-auto px-5 sm:max-w-[800px] sm:px-16 md:max-w-[900px]"
            >
                {pathname !== '/' && <GoBack />}
                {children}
            </div>
        </Suspense>
    )
}
