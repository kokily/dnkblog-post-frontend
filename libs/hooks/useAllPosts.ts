import { useQuery } from '@apollo/react-hooks';
import { useCallback, useState } from 'react';
import { ALL_POSTS } from '../graphql/posts';
import { PostType } from '../types';
import useScroll from './useScroll';

function useAllPosts(title?: string) {
  const { data, loading, error, fetchMore } = useQuery<{
    AllPosts: { posts: PostType[] | null };
  }>(ALL_POSTS, {
    variables: { title },
  });
  const [isFinished, setIsFinished] = useState(false);

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          title,
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.AllPosts.posts.length === 0) {
            setIsFinished(true);
          }

          return {
            AllPosts: {
              ...prev.AllPosts,
              posts: [...prev.AllPosts.posts, ...fetchMoreResult.AllPosts.posts],
            },
          };
        },
      });
    },
    [fetchMore, title]
  );

  const cursor = data?.AllPosts.posts[data?.AllPosts.posts.length - 1]?.id;

  useScroll({
    cursor,
    onLoadMore,
  });

  return { data, loading, error, isFinished };
}

export default useAllPosts;
