import React from 'react';
import { useQuery } from '@apollo/client';
import { USER_COMMENTS } from '../../libs/graphql/user';
import { UserCommentType } from '../../libs/types';
import Comments from '../../components/profile/Comment';

function CommentContainer() {
  const { data, loading, error } = useQuery<{ UserComments: { user: UserCommentType } }>(
    USER_COMMENTS
  );

  if (loading) return null;
  if (error) return null;

  return <Comments user={data?.UserComments.user} />;
}

export default CommentContainer;
