import fs from "fs/promises";
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

async function getAllMdxFiles(
  dirPath: string,
  arrayOfFiles: string[] = [],
): Promise<string[]> {
  const files = await fs.readdir(dirPath);

  await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(dirPath, file);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        await getAllMdxFiles(fullPath, arrayOfFiles);
      } else if (fullPath.endsWith(".mdx")) {
        arrayOfFiles.push(fullPath);
      }
    }),
  );

  return arrayOfFiles;
}

export async function getSortedPostsData(): Promise<PostData[]> {
  "use cache";
  const allMdxFiles = await getAllMdxFiles(postsDirectory);

  const allPostsData = await Promise.all(
    allMdxFiles.map(async (filePath) => {
      const id = path.basename(filePath, ".mdx");
      const fileContents = await fs.readFile(filePath, "utf8");
      const { data } = matter(fileContents);
      return {
        id,
        ...data,
        tags: (data.tags as string[]) || [],
      } as PostData;
    }),
  );

  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.date ?? "");
    const dateB = new Date(b.date ?? "");
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getAllTags(): Promise<string[]> {
  "use cache";
  const allPosts = await getSortedPostsData();
  const allTags = new Set<string>();
  allPosts.forEach((post) => post.tags?.forEach((tag) => allTags.add(tag)));
  return Array.from(allTags).sort();
}

export async function getPostData(
  slug: string,
): Promise<PostDataWithContent | null> {
  "use cache";
  const allMdxFiles = await getAllMdxFiles(postsDirectory);
  const fullPath = allMdxFiles.find(
    (filePath) => path.basename(filePath, ".mdx") === slug,
  );

  if (!fullPath) return null;

  const fileContents = await fs.readFile(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    slug,
    content: matterResult.content,
    ...matterResult.data,
    tags: (matterResult.data.tags as string[]) || [],
  } as PostDataWithContent;
}
