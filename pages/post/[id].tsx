import React from 'react';
import { GetServerSideProps } from 'next';
import PageContainer from '../../containers/common/PageContainer';
import { initializeApollo } from '../../libs/apollo/client';
import { READ_POST } from '../../libs/graphql/posts';
import { PostType } from '../../libs/types';
import ReadPostContainer from '../../containers/post/ReadPostContainer';

function ReadPost() {
  return (
    <PageContainer>
      <ReadPostContainer />
    </PageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: { id?: string } = context.params;
  const apolloClient = initializeApollo();

  const response = await apolloClient.query<{
    ReadPost: { post: PostType | null; prev: PostType | null; next: PostType | null };
  }>({
    query: READ_POST,
    variables: { id },
  });

  return {
    props: {
      post: response.data?.ReadPost.post,
      prev: response.data?.ReadPost.prev,
      next: response.data?.ReadPost.next,
    },
  };
};

export default ReadPost;
