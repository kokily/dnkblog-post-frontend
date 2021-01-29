import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AllPosts from '../../components/posts/AllPosts';
import useAllPosts from '../../libs/hooks/useAllPosts';

function AllPostsContainer() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const { data, loading, error } = useAllPosts(title);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSearch = (e: React.MouseEvent) => {
    e.preventDefault();

    if (search === '') {
      return;
    } else {
      setTitle(search);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // @ts-ignore
      onSearch(e);
    }
  };

  const onClose = () => {
    setTitle('');
    setSearch('');
  };

  const onTagLink = (tag: string) => {
    router.push(`/tag/${tag}`);
  };

  if (loading) return null;
  if (error) return null;

  return (
    <AllPosts
      posts={data?.AllPosts.posts}
      title={title}
      search={search}
      onChange={onChange}
      onSearch={onSearch}
      onKeyPress={onKeyPress}
      onClose={onClose}
      onTagLink={onTagLink}
    />
  );
}

export default AllPostsContainer;
