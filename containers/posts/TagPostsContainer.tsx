import React from 'react';
import { useRouter } from 'next/router';
import useTagPosts from '../../libs/hooks/useTagPosts';
import TagPosts from '../../components/posts/TagPosts';

function TagPostsContainer() {
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const { data, loading, error } = useTagPosts(id);

  const onClose = () => {
    router.push('/');
  };

  const onTagLink = (tag: string) => {
    router.push(`/tag/${tag}`);
  };

  if (loading) return null;
  if (error) return null;

  return (
    <TagPosts
      posts={data?.TagPosts.posts}
      tag={id}
      onClose={onClose}
      onTagLink={onTagLink}
    />
  );
}

export default TagPostsContainer;
