import React from 'react';
import { useRouter } from 'next/router';
import useCategoryPosts from '../../libs/hooks/useCategoryPosts';
import CategoryPosts from '../../components/posts/CategoryPosts';

function CategoryPostsContainer() {
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const { data, loading, error } = useCategoryPosts(id);

  const onTagLink = (tag: string) => {
    router.push(`/tag/${tag}`);
  };

  if (loading) return null;
  if (error) return null;

  return (
    <CategoryPosts posts={data?.CategoryPosts.posts || null} onTagLink={onTagLink} />
  );
}

export default CategoryPostsContainer;
