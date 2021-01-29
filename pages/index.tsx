import { GetServerSideProps } from 'next';
import React from 'react';
import PageContainer from '../containers/common/PageContainer';
import AllPostsContainer from '../containers/posts/AllPostsContainer';
import { initializeApollo } from '../libs/apollo/client';
import { ALL_POSTS } from '../libs/graphql/posts';

function IndexPage() {
  return (
    <PageContainer>
      <AllPostsContainer />
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  const posts = await apolloClient.query({
    query: ALL_POSTS,
  });

  return {
    props: {
      posts,
    },
  };
};

export default IndexPage;
