import React, { useState } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { ADD_COMMENT, LIST_COMMENTS, REMOVE_COMMENT } from '../../libs/graphql/comments';
import { CommentType, MeType } from '../../libs/types';
import AddComment from '../../components/comment/AddComment';
import ListComments from '../../components/comment/ListComments';

interface CommentContainerProps {
  postId: string;
  user: MeType | null;
}

function CommentContainer({ postId, user }: CommentContainerProps) {
  const client = useApolloClient();
  const [body, setBody] = useState('');
  const { data, loading, error, refetch } = useQuery<{
    ListComments: { comments: CommentType[] | null };
  }>(LIST_COMMENTS, {
    variables: { postId },
  });
  const [AddCommentResolver] = useMutation(ADD_COMMENT);
  const [RemoveCommentResolver] = useMutation(REMOVE_COMMENT);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const onAddComment = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (body === '') {
      toast.error('댓글 내용을 입력하세요');
      return;
    }

    try {
      const response = await AddCommentResolver({
        variables: {
          body,
          postId,
          userId: user.id,
          username: user.username,
          profile: user.profile,
        },
      });

      if (!response || !response.data) return;

      toast.success('댓글 저장~ (づ￣ ³￣)づ');

      await client.clearStore();
      setBody('');
      await refetch();
    } catch (err) {
      toast.error(err);
    }
  };

  const onRemoveComment = async (id: string) => {
    try {
      const response = await RemoveCommentResolver({
        variables: { id },
      });

      if (!response || !response.data) return;

      await client.clearStore();
      toast.success('삭제 완료');

      await refetch();
    } catch (err) {
      toast.error(err);
    }
  };

  if (loading) return null;
  if (error) return null;

  return (
    <>
      {user && (
        <AddComment
          body={body}
          onChange={onChange}
          onAddComment={onAddComment}
          user={user}
        />
      )}
      <ListComments
        comments={data?.ListComments.comments || null}
        user={user}
        refetch={refetch}
        onRemoveComment={onRemoveComment}
      />
    </>
  );
}

export default CommentContainer;
