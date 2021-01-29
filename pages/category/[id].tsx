import React from 'react';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../libs/apollo/client';
import { CATEGORY_POSTS } from '../../libs/graphql/posts';
import { PostType } from '../../libs/types';
import PageContainer from '../../containers/common/PageContainer';
import CategoryPostsContainer from '../../containers/posts/CategoryPostsContainer';

function CategoryPostsPage() {
  return (
    <PageContainer>
      <CategoryPostsContainer />
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: { id?: string } = context.params;
  const apolloClient = initializeApollo();

  const response = await apolloClient.query<{
    CategoryPosts: { posts: PostType[] | null };
  }>({
    query: CATEGORY_POSTS,
    variables: { category: id },
  });

  return {
    props: {
      posts: response.data?.CategoryPosts.posts,
    },
  };
};

export default CategoryPostsPage;
