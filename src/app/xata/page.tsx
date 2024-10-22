import PageWrapper from '@/components/common/PageWrapper'
import { getPosts } from '@/data/post.access-layer'
import { AppPagePaths } from '@/enums'
import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function Page() {
    // https://hightrag.kinde.com/admin
    const { isAuthenticated, getUser } = getKindeServerSession()
    const isUserAuthenticated = await isAuthenticated()
    const user = await getUser()
    const posts = await getPosts()
    return (
        <PageWrapper>
            <div className="flex flex-col">
                <pre>isUserAuthenticated={JSON.stringify(isUserAuthenticated, null, 2)}</pre>
                <pre>user={JSON.stringify(user, null, 2)}</pre>
                <LoginLink postLoginRedirectURL={AppPagePaths.XATA}>Log in</LoginLink>
                <RegisterLink postLoginRedirectURL={AppPagePaths.XATA}>Register</RegisterLink>
                <LogoutLink>Log out</LogoutLink>
            </div>

            {!posts ? (
                <p>Log in to see posts</p>
            ) : posts.length === 0 ? (
                <p>No blog posts found</p>
            ) : (
                posts.map((post) => (
                    <div key={post.xata_id} className="mb-16">
                        <p className="mb-2 text-xs text-purple-950 dark:text-purple-200">{post.created_at?.toDateString()}</p>
                        <h2 className="mb-2 text-2xl">
                            <a href={`posts/${post.slug}`}>{post.title}</a>
                        </h2>
                        <p className="mb-5 text-purple-950 dark:text-purple-200">{post.labels}</p>
                        <a
                            href={`posts/${post.slug}`}
                            className="w-fit rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white shadow-sm"
                        >
                            Read more &rarr;
                        </a>
                    </div>
                ))
            )}
        </PageWrapper>
    )
}
