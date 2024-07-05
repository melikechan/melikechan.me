import { getSortedPostsData, getPostData } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export default async function Post({ params }) {
  const postData = getPostData(params.slug)

  if (!postData) {
    return notFound()
  }
  return (
    <article className="flex flex-col mx-8 my-4 h-screen space-y-4">
      <h1 class="text-4xl font-bold">{postData.title}</h1>
      <div className="flex flex-col xs:flex-row gap-4 items-center">
        <time>{postData.date}</time>
        {postData.author && <span>by {postData.author}</span>}
      </div>
      <MDXRemote source={postData.content} />
    </article>
  )
}