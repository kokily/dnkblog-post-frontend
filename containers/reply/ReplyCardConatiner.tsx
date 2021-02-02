import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { UPDATE_REPLY } from '../../libs/graphql/replies';
import { MeType, ReplyType } from '../../libs/types';
import ReplyCard from '../../components/reply/ReplyCard';

interface ReplyCardContainerProps {
  reply: ReplyType;
  user: MeType | null;
  onRemoveClick: () => void;
  modal: boolean;
  onCancel: () => void;
  onRemove: (id: string) => void;
  refetch: any;
}

function ReplyCardContainer({
  reply,
  user,
  onRemoveClick,
  modal,
  onCancel,
  onRemove,
  refetch,
}: ReplyCardContainerProps) {
  const [UpdateReply, { client }] = useMutation(UPDATE_REPLY);
  const [body, setBody] = useState(reply.body);
  const [toggle, setToggle] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const onToggle = () => {
    setToggle(!toggle);
  };

  const onUpdateReply = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await UpdateReply({
        variables: {
          id: reply.id,
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
    <ReplyCard
      reply={reply}
      user={user}
      onRemoveClick={onRemoveClick}
      modal={modal}
      onCancel={onCancel}
      onRemove={onRemove}
      body={body}
      toggle={toggle}
      onToggle={onToggle}
      onChange={onChange}
      onUpdateReply={onUpdateReply}
    />
  );
}

export default ReplyCardContainer;
