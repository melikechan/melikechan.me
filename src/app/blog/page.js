import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'

export default function Blog() {
  const allPostsData = getSortedPostsData()

  return (
    <main className="flex flex-col mx-8 my-4 min-h-screen space-y-4 animate-fadeIn">
      <h1 className="text-4xl font-bold">Blog</h1>
      <ul className="flex flex-col gap-4">
        {allPostsData.map(({ id, date, title }) => (
          <li key={id} className="flex flex-col gap-1">
            <Link href={`/blog/${id}`} className='text-xl hover:underline focus:underline active:underline'>
              {title}
            </Link>
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </main>
  )
}