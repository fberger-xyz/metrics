import LinkWithIcon from '@/components/common/LinkWithIcon'
import PageWrapper from '@/components/common/PageWrapper'

export default async function Page() {
    return (
        <PageWrapper>
            <div className="flex flex-col gap-1">
                <LinkWithIcon href="https://app.inngest.com/">
                    <p>Inngest</p>
                </LinkWithIcon>
                <LinkWithIcon href="https://app.xata.io/workspaces/">
                    <p>Xata</p>
                </LinkWithIcon>
                <LinkWithIcon href="https://kinde.com/">
                    <p>Kinde</p>
                </LinkWithIcon>
                <LinkWithIcon href="https://vercel.com/">
                    <p>Vercel</p>
                </LinkWithIcon>
            </div>
        </PageWrapper>
    )
}
