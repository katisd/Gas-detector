import { type NextPage } from "next";
import Head from "next/head";
import ChartLayout from "../components/Charts/ChartLayout";
import Layout from "../components/layout/Layout";
import Content from "../components/SideContent/Content";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gas Detector</title>
        <meta name="description" content="Gas detector web" />
        {/* TODO add new favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ChartLayout />
        <Content />
      </Layout>
    </>
  );
};

export default Home;
