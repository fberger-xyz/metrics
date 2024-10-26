import LinkWithIcon from '@/components/common/LinkWithIcon'
import PageWrapper from '@/components/common/PageWrapper'
// import { AptosBlockFetcher } from '@/components/data/AptosBlockFetcher'
import { FarsideScrapper } from '@/components/data/FarsideScrapper'
// import { TransactionsFetcher } from '@/components/data/TransactionsFetcher'

export default function Page() {
    return (
        <PageWrapper>
            <LinkWithIcon href="https://t.me/+R7QS7yXrDX4zMWU0">
                <p>Telegram</p>
            </LinkWithIcon>
            {/* <TransactionsFetcher /> */}
            {/* <VaultReallocatesFetcher /> */}
            {/* <AptosBlockFetcher /> */}
            <FarsideScrapper />
        </PageWrapper>
    )
}
