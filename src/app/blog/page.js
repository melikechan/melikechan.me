import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export async function generateMetadata() {
  return {
    title: "Blog",
    description: "melikechan's blog posts.",

    openGraph: {
      title: "Blog",
      description: "melikechan's blog posts.",
    },
  };
}

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <h1 className="text-4xl font-bold">Blog</h1>
      <ul className="flex flex-col gap-4">
        {allPostsData.map(({ id, date, title }) => (
          <li key={id} className="flex flex-col gap-1">
            <Link
              href={`/blog/${id}`}
              className="text-xl hover:underline focus:underline active:underline"
            >
              {title}
            </Link>
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </>
  );
}
