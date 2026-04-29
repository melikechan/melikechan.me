import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostData {
  id: string;
  title?: string;
  description?: string;
  date?: string;
  tags: string[];
  author?: string;
  keywords?: string[];
  locale?: string;
  [key: string]: unknown;
}

export interface PostDataWithContent extends PostData {
  slug: string;
  content: string;
}

let mdxFilesCache: string[] | null = null;

function getAllMdxFiles(
  dirPath: string,
  arrayOfFiles: string[] = [],
): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllMdxFiles(fullPath, arrayOfFiles);
    } else if (fullPath.endsWith(".mdx")) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

function getCachedMdxFiles(): string[] {
  if (!mdxFilesCache) {
    mdxFilesCache = getAllMdxFiles(postsDirectory);
  }
  return mdxFilesCache;
}

export function getSortedPostsData(): PostData[] {
  const allMdxFiles = getCachedMdxFiles();
  const allPostsData: PostData[] = allMdxFiles.map((filePath) => {
    const id = path.basename(filePath, ".mdx");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      id,
      ...data,
      tags: (data.tags as string[]) || [],
    } as PostData;
  });

  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.date ?? "");
    const dateB = new Date(b.date ?? "");

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0;
    }

    return dateB.getTime() - dateA.getTime();
  });
}

export function getAllTags(): string[] {
  const allPosts = getSortedPostsData();
  const allTags = new Set<string>();

  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => allTags.add(tag));
  });

  return Array.from(allTags).sort();
}

export function getPostData(slug: string): PostDataWithContent | null {
  const allMdxFiles = getCachedMdxFiles();
  const fullPath = allMdxFiles.find(
    (filePath) => path.basename(filePath, ".mdx") === slug,
  );

  if (!fullPath) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    slug,
    content: matterResult.content,
    ...matterResult.data,
    tags: (matterResult.data.tags as string[]) || [],
  } as PostDataWithContent;
}
