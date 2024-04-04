import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>첫번째글</title>
      </Head>
      <h1>첫번째 페이지입니다</h1>
    </Layout>
  );
}
