import React from 'react';
import { GetServerSideProps } from 'next';
import PageContainer from '../../containers/common/PageContainer';
import TagPostsContainer from '../../containers/posts/TagPostsContainer';
import { initializeApollo } from '../../libs/apollo/client';
import { TAG_POSTS } from '../../libs/graphql/posts';
import { PostType } from '../../libs/types';

function TagPostsPage() {
  return (
    <PageContainer>
      <TagPostsContainer />
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: { id?: string } = context.params;
  const apolloClient = initializeApollo();

  await apolloClient.query<{ TagPosts: { posts: PostType[] | null } }>({
    query: TAG_POSTS,
    variables: { tag: id },
  });

  return {
    props: {},
  };
};

export default TagPostsPage;
