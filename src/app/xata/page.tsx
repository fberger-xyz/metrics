import { getXataClient } from '@/xata'

import PageWrapper from '@/components/common/PageWrapper'

const xata = getXataClient()
export default async function Page() {
    const posts = await xata.db.posts.getAll()
    return (
        <PageWrapper>
            {posts.length === 0 && <p>No blog posts found</p>}
            {posts.map((post) => (
                <div key={post.id} className="mb-16">
                    <p className="mb-2 text-xs text-purple-950 dark:text-purple-200">{post.created_at?.toDateString()}</p>
                    <h2 className="mb-2 text-2xl">
                        <a href={`posts/${post.slug}`}>{post.title}</a>
                    </h2>
                    <p className="mb-5 text-purple-950 dark:text-purple-200">{post.labels}</p>
                    <a href={`posts/${post.slug}`} className="w-fit rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white shadow-sm">
                        Read more &rarr;
                    </a>
                </div>
            ))}
        </PageWrapper>
    )
}
