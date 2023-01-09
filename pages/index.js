import Head from 'next/head'
import Image from 'next/image'
import styles from "../styles/Home.module.css";
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from '../lib/post';

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id, title, date, thumbnail

  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合(requestごとにおこる動作)
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <>
      {/* homeがついているコンポーネントだけプロフィール画像を大きくする */}
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
          </Head>
        <section className={utilStyle.headingMd}>
          <p>
            ああああああああああああああああああ
          </p>
        </section>
        <section>
          <h2>📝山元の日常</h2>
          <div className={styles.grid}>
            {allPostsData.map(({id, title, date, thumbnail}) => (
              <article key={id}>
                <Link href={`/posts/${id}`}>
                  <img 
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                    />
                </Link>
                <Link 
                  href={`/posts/${id}`}
                  className={utilStyle.boldText}
                  >
                  {title}
                </Link>
                <br />
                <small className={utilStyle.lightText}>{date}</small>
              </article>
            ))}
            </div>
        </section>
      </Layout>
    </>
  )
}
