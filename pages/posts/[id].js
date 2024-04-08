import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Page({ postData }) {
  // const router = useRouter();
  // console.log(router);
  return (
    <Layout>
      <Head>
        <title>{postData.id}</title>
      </Head>
      {/* <h1>{router.query.slug}</h1> */}
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
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
