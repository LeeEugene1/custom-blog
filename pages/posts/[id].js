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
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
