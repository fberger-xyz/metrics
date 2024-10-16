import PageWrapper from '@/components/common/PageWrapper'

export default function Page() {
    return (
        <PageWrapper>
            {Array(4)
                .fill(0)
                .map((_, index) => index)
                .map((index) => (
                    <div key={index} className="w-full rounded-md border border-discreet p-4">
                        <p className="text-primary">primary</p>
                        <p className="text-secondary">secondary</p>
                        <p className="text-discreet">discreet</p>
                        <p className="text-inactive">off</p>
                        <p className="text-light-hover">hover</p>
                    </div>
                ))}
        </PageWrapper>
    )
}
