import React from 'react';
import PageContainer from '../containers/common/PageContainer';
import useAuth from '../libs/hooks/useAuth';
import CommentContainer from '../containers/profile/CommentContainer';

function CommentPage() {
  useAuth();

  return (
    <PageContainer>
      <CommentContainer />
    </PageContainer>
  );
}

export default CommentPage;
