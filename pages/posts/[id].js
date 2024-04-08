import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { useRouter } from 'next/navigation';

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: true, //빌드시 생성되지않은 페이지 처리(true, false or "blocking")
    //fallback: https://nextjs.org/learn-pages-router/basics/dynamic-routes/dynamic-routes-details
  };
}

export async function getStaticProps({ params }) {
  // getPostData calling시에도 await필요함(remark에서 사용했기때문)
  //   H [Error]: Error serializing `.postData` returned from `getStaticProps` in "/posts/[id]".
  // Reason: `object` ("[object Promise]") cannot be serialized as JSON. Please only return JSON serializable data types.
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Page({ postData }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div>
        Loading...Loading...Loading...Loading...Loading...Loading...Loading...Loading...Loading...
      </div>
    );
  }
  return (
    <Layout>
      <Head>
        <title>test</title>
      </Head>
      {postData && (
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      )}
    </Layout>
  );
}
