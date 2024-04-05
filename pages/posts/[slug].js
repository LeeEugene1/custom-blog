import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  console.log(router);
  return (
    <Layout>
      <Head>
        <title>{router.query.slug}</title>
      </Head>
      <h1>{router.query.slug}</h1>
    </Layout>
  );
}
