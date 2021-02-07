import { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import { CATEGORY_POSTS } from '../graphql/posts';
import { PostType } from '../types';
import useScroll from './useScroll';

function useCategoryPosts(category: string) {
  const { data, loading, error, fetchMore } = useQuery<{
    CategoryPosts: { posts: PostType[] | null };
  }>(CATEGORY_POSTS, {
    variables: { category },
  });
  const [isFinished, setIsFinished] = useState(false);

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          category,
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (!fetchMoreResult.CategoryPosts.posts) return prev;
          if (fetchMoreResult.CategoryPosts.posts.length === 0) {
            setIsFinished(true);
          }

          return {
            CategoryPosts: {
              ...prev.CategoryPosts,
              posts: [
                ...prev.CategoryPosts.posts,
                ...fetchMoreResult.CategoryPosts.posts,
              ],
            },
          };
        },
      });
    },
    [fetchMore, category]
  );

  const cursor = data?.CategoryPosts.posts[data?.CategoryPosts.posts.length - 1]?.id;

  useScroll({
    cursor,
    onLoadMore,
  });

  return {
    data,
    loading,
    error,
    isFinished,
  };
}

export default useCategoryPosts;
