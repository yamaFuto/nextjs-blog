import path from "path";
import matter from "gray-matter";
import fs from "fs";
import { remark } from "remark";
import html from "remark-html";

//process.cwd()→ルートディレクトリを取得
const postsDirectory = path.join(process.cwd(), "posts");

//mdファイルのデータを取り出す
export function getPostsData() {

  // const fetchaData = await fetch("endpoint");

  //dir名をオブジェクトとして所得
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    //.mdをファイル名から削除
    const id = fileName.replace(/\.md$/, ""); //ファイル名(id)

    //マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    //idとデータを返す
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData;
}

//getStaticPathでreturnを使うpath(オブジェクトでなくてはならない)を取得する
//paramsの中の変数名と鍵かっこの中の名前は同一にしなくてはならない
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/.md$/, ""),
      }
    };
  });
  // [
  //   {
  //     params: {
  //       id: "ssg-ssr"
  //     },
  //     params: {
  //       id: "next-react"
  //     }
  //   }
  // ]
}

//idに基づいてブログ投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  //メタデータを読み込む
  const matterResult = matter(fileContent); //文字列

  //本文をhtmlとして解析出力する
  const blogContent = await remark()
  .use(html).
  process(matterResult.content); //htmlとして解析

  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  }

}

