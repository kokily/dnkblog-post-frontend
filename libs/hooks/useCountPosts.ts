import { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import { COUNT_POSTS } from '../graphql/posts';
import { PostType } from '../types';
import useScroll from './useScroll';

function useCountPosts() {
  const { data, loading, error, fetchMore } = useQuery<{
    CountPosts: { posts: PostType[] };
  }>(COUNT_POSTS);
  const [isFinished, setIsFinished] = useState(false);

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (!fetchMoreResult.CountPosts.posts) return prev;
          if (fetchMoreResult.CountPosts.posts.length === 0) {
            setIsFinished(true);
          }

          return {
            CountPosts: {
              ...prev.CountPosts,
              posts: [...prev.CountPosts.posts, ...fetchMoreResult.CountPosts.posts],
            },
          };
        },
      });
    },
    [fetchMore]
  );

  const cursor = data?.CountPosts.posts[data?.CountPosts.posts.length - 1]?.id;

  useScroll({
    cursor,
    onLoadMore,
  });

  return { data, loading, error, isFinished };
}

export default useCountPosts;
