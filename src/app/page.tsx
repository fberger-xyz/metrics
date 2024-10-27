// import LinkWithIcon from '@/components/common/LinkWithIcon'
import PageWrapper from '@/components/common/PageWrapper'
import { AptosBlockFetcher } from '@/components/data/AptosBlockFetcher'

export default function Page() {
    return (
        <PageWrapper>
            {/* <LinkWithIcon href="https://t.me/+R7QS7yXrDX4zMWU0">
                <p>Telegram</p>
            </LinkWithIcon> */}
            <AptosBlockFetcher />
        </PageWrapper>
    )
}
