import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
}

export function getSortedPostsData() {
  const allFiles = getAllFiles(postsDirectory);
  const allPostsData = allFiles.map(filePath => {
    const id = filePath.replace(/^.*[\\\/]/, '').replace(/\.mdx$/, '');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      path: filePath.substring(postsDirectory.length + 1), // Remove the base directory path
      ...matterResult.data
    };
  });

  return allPostsData.sort((a, b) => b.date - a.date);
}

export function getPostData(id) {
  const allFiles = getAllFiles(postsDirectory);
  const filePath = allFiles.find(filePath => filePath.split(path.sep).pop() === `${id}.mdx`);

  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    content: matterResult.content,
    ...matterResult.data
  };
}
