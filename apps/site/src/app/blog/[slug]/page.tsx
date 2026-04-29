import Link from "next/link";
import type { ResolvingMetadata, Metadata } from "next";
import { getSortedPostsData, getPostData } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Badge, Button } from "@melikechan/ui";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyParagraph,
  TypographyLink,
  TypographyBlockquote,
  TypographyHr,
  TypographyUnorderedList,
  TypographyOrderedList,
  TypographyInlineCode,
} from "@melikechan/ui/typography";
import { siteConfig } from "@/config/site";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import Admonition from "@/components/Admonition";

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
  Admonition,
};

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
};

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const postData = getPostData(slug);
  if (!postData) return {};
  const parentMetadata = await parent;
  return {
    title: postData.title,
    description: postData.description,
    keywords: postData.keywords ?? postData.tags,
    authors: postData.author
      ? [{ name: postData.author as string }]
      : [{ name: "Melike Vurucu" }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      ...parentMetadata.openGraph,
      title: postData.title,
      description: postData.description,
      url: siteConfig.url + "/blog/" + postData.id,
      locale: (postData.locale as string) ?? "en_US",
      type: "article",
      siteName: siteConfig.name,
      publishedTime: postData.date
        ? new Date(postData.date as string).toISOString()
        : undefined,
      authors: postData.author
        ? [postData.author as string]
        : ["Melike Vurucu"],
    },
    twitter: {
      ...parentMetadata.twitter,
      card: "summary_large_image",
      title: postData.title,
      description: postData.description,
    },
  };
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.id }));
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = getPostData(slug);

  if (!postData) {
    return notFound();
  }

  return (
    <main className="flex flex-col items-center gap-8 py-8 animate-fade-in">
      <div className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
        <Button asChild variant="ghost" className="-ml-4">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <span className="material-symbols-outlined text-[1.25rem]! size-5">
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
              <time dateTime={postData.date as string}>
                {postData.date as string}
              </time>
              {postData.author && <span>by {postData.author as string}</span>}
            </div>
            {(postData.tags as string[] | undefined)?.map((tag) => (
              <Badge key={tag} variant="secondary" className="mt-4 mr-2">
                {tag}
              </Badge>
            ))}
          </header>
          <div className="prose dark:prose-invert max-w-none">
            <MDXRemote
              source={postData.content as string}
              options={mdxOptions}
              components={mdxComponents}
            />
          </div>
        </article>
      </div>
    </main>
  );
}
