import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

//getStaticPropsと同時に使う
//外部のデータに対してSSGを行う
export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

//getPostData()字体が非同期処理のため
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>
          {postData.title}
        </h1>
        <div className={utilStyles.lightText}>
          {postData.date}
        </div>

        {/* html喉無の中に入れ込んでいる */}
        <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML}} />
      </article>
    </Layout>
  );
}