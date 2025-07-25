import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const postsDirectory = path.join(process.cwd(), "posts");

function getAllMdxFiles(dirPath, arrayOfFiles = []) {
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

export function getSortedPostsData() {
  const allMdxFiles = getAllMdxFiles(postsDirectory);
  const allPostsData = allMdxFiles.map((filePath) => {
    const id = path.basename(filePath, ".mdx");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      id,
      ...data,
      tags: data.tags || [],
    };
  });

  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0;
    }

    return dateB - dateA;
  });
}

export function getAllTags() {
  const allPosts = getSortedPostsData();
  const allTags = new Set();

  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => allTags.add(tag));
  });

  return Array.from(allTags).sort();
}

export function getAllPostIds() {
  const allMdxFiles = getAllMdxFiles(postsDirectory);
  return allMdxFiles.map((filePath) => {
    return {
      params: {
        id: path.basename(filePath, ".mdx"),
      },
    };
  });
}

export function getPostData(slug) {
  const allMdxFiles = getAllMdxFiles(postsDirectory);
  const fullPath = allMdxFiles.find(
    (filePath) => path.basename(filePath, ".mdx") === slug
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
  };
}
