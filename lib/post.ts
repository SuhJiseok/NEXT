import fs from 'fs';
import matter from 'gray-matter';
import html from 'remark-html'
import path from 'path';
import { remark } from 'remark';

const postsDirectory = path.join(process.cwd(), 'posts');
console.log('process.cwd()',process.cwd());
console.log('postsDirectory',postsDirectory);

export function getSortedPostsDate(){
  const fileNames = fs.readdirSync(postsDirectory); //동기식 Sync, 비동기식async
  console.log('fileNames',fileNames);
  //fileNames ['pre-rendering.md','ssg-ssr.md']
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '' );
    // id = 'pre-rendering'
    const fullPath = path.join(postsDirectory, fileName);
    // C:\projects\app_nextjs_typescript_2023/posts/pre-rendering.md
    const fileContents = fs.readFileSync(fullPath, 'utf8'); //파일내용
    const matterResult = matter(fileContents) ; //객체변환
    console.log('matterResult',matterResult);
    return {
      id,
      ...(matterResult.data as {date:string; title:string})
    }
  });//allPostsData

  return allPostsData.sort((a,b) =>{
    if(a.date < b.date) {
      return 1
    }else{
      return -1
    }
  })
}//getSortedPostsData

export function getAllPostIds(){
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName =>{
    return{
      params: {
        id: fileName.replace(/.\md$/,'') //id= 'pre-rendering' id='ssg-ssr'
      }
    }
  })
}

export async function getPostData(id:string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const  fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents); //객체변환
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString();//remark 는 markdown을 html로 변환
  return{
    id,
    contentHtml,
    ...(matterResult.data as {date:string, title:string})
  }
}