import React from 'react';
import { useRouter } from 'next/router';
import Counter from '../../components/counter/Counter';
import useCountPosts from '../../libs/hooks/useCountPosts';

function CounterContainer() {
  const router = useRouter();
  const { data, loading, error } = useCountPosts();

  const onReadPost = (id: string) => {
    router.push(`/post/${id}`);
  };

  if (loading) return null;
  if (error) return null;

  return <Counter posts={data?.CountPosts.posts} onReadPost={onReadPost} />;
}

export default CounterContainer;
