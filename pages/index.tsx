import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/tokenStake/list');
  }, [router]);

  return <div></div>;
};

export default Home;
