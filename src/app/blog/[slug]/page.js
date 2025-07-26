import Link from "next/link";
import { getSortedPostsData, getPostData } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/components/typography/headings";
import {
  TypographyParagraph,
  TypographyLink,
} from "@/components/typography/paragraph";
import { TypographyBlockquote } from "@/components/typography/blockquote";
import { TypographyHr } from "@/components/typography/hr";
import {
  TypographyUnorderedList,
  TypographyOrderedList,
} from "@/components/typography/list";
import { TypographyInlineCode } from "@/components/typography/inline-code";

const headings = {
  h1: TypographyH1,
  h2: TypographyH2,
  h3: TypographyH3,
  h4: TypographyH4,
};

const textBlocks = {
  p: TypographyParagraph,
  blockquote: TypographyBlockquote,
  hr: TypographyHr,
};

const lists = {
  ul: TypographyUnorderedList,
  ol: TypographyOrderedList,
};

const inlineElements = {
  a: TypographyLink,
  code: TypographyInlineCode,
};

export const mdxComponents = {
  ...headings,
  ...textBlocks,
  ...lists,
  ...inlineElements,
};

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const postData = getPostData(slug);
  if (!postData) return notFound();
  return {
    title: postData.title,
    description: postData.description,
    keywords: postData.keywords ?? postData.tags,
    openGraph: {
      title: postData.title,
      description: postData.description,
      url: siteConfig.url + "/blog/" + postData.slug,
      locale: postData.locale,
      type: "article",
      siteName: siteConfig.name,
    },
  };
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.id }));
}

export default async function Post({ params }) {
  const { slug } = await params;
  const postData = getPostData(slug);

  if (!postData) {
    return notFound();
  }

  return (
    <main className="flex flex-col items-center gap-8 py-8 px-4 animate-fade-in">
      <div className="w-full max-w-3xl">
        <Button asChild variant="ghost" className="-ml-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <span className="material-symbols-outlined !text-[1.25rem] size-5">
              chevron_left
            </span>
            Back to Blog
          </Link>
        </Button>
        <article className="mt-4">
          <header className="border-b pb-6 mb-8">
            <TypographyH1 className="text-4xl font-bold tracking-tight">
              {postData.title}
            </TypographyH1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-muted-foreground">
              <time dateTime={postData.date}>{postData.date}</time>
              {postData.author && <span>by {postData.author}</span>}
            </div>
            {postData.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="mt-4 mr-2">
                {tag}
              </Badge>
            ))}
          </header>
          <div className="prose dark:prose-invert max-w-none">
            <MDXRemote
              source={postData.content}
              options={mdxOptions}
              components={mdxComponents}
            />
          </div>
        </article>
      </div>
    </main>
  );
}
