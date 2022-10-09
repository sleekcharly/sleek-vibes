import type { NextPage } from 'next';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>SleekVibes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* main section */}
      <main>
        {/* Sidebar */}
        <Sidebar />

        {/* Center */}
      </main>

      <div>{/* Player */}</div>
    </div>
  );
};

export default Home;
