import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { UPDATE_COMMENT } from '../../libs/graphql/comments';
import { CommentType, MeType } from '../../libs/types';
import CommentCard from '../../components/comment/CommentCard';

interface CommentCardContainerProps {
  comment: CommentType;
  user: MeType | null;
  onRemoveClick: () => void;
  onCancel: () => void;
  onRemove: (id: string) => void;
  modal: boolean;
  refetch: any;
}

function CommentCardContainer({
  comment,
  user,
  onRemoveClick,
  onCancel,
  onRemove,
  modal,
  refetch,
}: CommentCardContainerProps) {
  const [UpdateComment, { client }] = useMutation(UPDATE_COMMENT);
  const [body, setBody] = useState(comment.body);
  const [toggle, setToggle] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const onToggle = () => {
    setToggle(!toggle);
  };

  const onUpdateComment = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await UpdateComment({
        variables: {
          id: comment.id,
          body,
        },
      });

      if (!response || !response.data) return;

      await client.clearStore();
      setToggle(false);
      await refetch();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <CommentCard
      comment={comment}
      user={user}
      onRemoveClick={onRemoveClick}
      onCancel={onCancel}
      onRemove={onRemove}
      modal={modal}
      refetch={refetch}
      toggle={toggle}
      onToggle={onToggle}
      body={body}
      onChange={onChange}
      onUpdateComment={onUpdateComment}
    />
  );
}

export default CommentCardContainer;
