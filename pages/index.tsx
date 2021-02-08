import React from 'react';
import { GetServerSideProps } from 'next';
import { ALL_POSTS } from '../libs/graphql/posts';
import { initializeApollo } from '../libs/apollo/client';
import PageContainer from '../containers/common/PageContainer';
import AllPostsContainer from '../containers/posts/AllPostsContainer';

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
