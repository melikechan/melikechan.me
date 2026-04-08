import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

let mdxFilesCache = null;

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

function getCachedMdxFiles() {
  if (!mdxFilesCache) {
    mdxFilesCache = getAllMdxFiles(postsDirectory);
  }
  return mdxFilesCache;
}

export function getSortedPostsData() {
  const allMdxFiles = getCachedMdxFiles();
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

export function getPostData(slug) {
  const allMdxFiles = getCachedMdxFiles();
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
