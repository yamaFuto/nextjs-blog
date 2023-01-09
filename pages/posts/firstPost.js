import Link from "next/link";
import Head from "next/head";

export default function FirstPost() {
  return (
    <div>
      <Head>
        <title>最初の投稿</title>
      </Head>
      <h1>最初の投稿</h1>
      <Link href="/">ホームに戻る</Link>
    </div>
  );
}

//ホットリローディング：整合、リロードをしなくても中身の内容が更新される
//aタグはページがリロードされている、Linkはページをリロードせず高速で遷移できる
//静的なファイルはpublicの中に存在する(imageタグの中では/で自動的にpublicを見る)
//headのコンポーネントを使ってメタデータを変更する