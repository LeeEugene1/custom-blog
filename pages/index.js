import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Date from '../components/date';

//[SSG]
export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  console.log(allPostsData);
  return {
    props: {
      allPostsData,
    },
  };
}

//참고: serverSide에서는 api routes를 사용하지않는다.
// export async function getServerSideProps() {
//   const { allPostsData } = await fetch('http://localhost:3000/api/post').then(
//     (res) => res.json(),
//   );

//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export default function Home({ allPostsData }) {
  //[CSR]:Private, user-specific pages where SEO is not relevant

  // const [allPostsData, setAllPostsData] = useState([]);
  // useEffect(() => {
  //   fetch('/api/post')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       debugger;
  //       setAllPostsData(data.allPostsData);
  //     });
  // }, []);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, I'm Eugene!</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
