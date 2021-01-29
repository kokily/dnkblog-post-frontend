import { useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import { TAG_POSTS } from '../graphql/posts';
import { PostType } from '../types';
import useScroll from './useScroll';

function useTagPosts(id: string) {
  const { data, loading, error, fetchMore } = useQuery<{
    TagPosts: { posts: PostType[] | null };
  }>(TAG_POSTS, {
    variables: { tag: id },
  });
  const [isFinished, setIsFinished] = useState(false);

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          tag: id,
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return;
          if (fetchMoreResult.TagPosts.posts.length === 0) {
            setIsFinished(true);
          }

          return {
            TagPosts: {
              ...prev.TagPosts,
              posts: [...prev.TagPosts.posts, ...fetchMoreResult.TagPosts.posts],
            },
          };
        },
      });
    },
    [fetchMore, id]
  );

  const cursor = data?.TagPosts.posts[data?.TagPosts.posts.length - 1]?.id;

  useScroll({
    cursor,
    onLoadMore,
  });

  return { data, loading, error, isFinished };
}

export default useTagPosts;
