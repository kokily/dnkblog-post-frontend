import React, { useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { ADD_REPLY, REMOVE_REPLY } from '../../libs/graphql/replies';
import { MeType, ReplyType } from '../../libs/types';
import AddReply from '../../components/reply/AddReply';
import ListReplies from '../../components/reply/ListReplies';

interface ReplyContainerProps {
  postId: string;
  commentId: string;
  replies: ReplyType[] | null;
  user: MeType | null;
  refetch: any;
}

function ReplyContainer({
  postId,
  commentId,
  replies,
  user,
  refetch,
}: ReplyContainerProps) {
  const client = useApolloClient();
  const [body, setBody] = useState('');
  const [toggle, setToggle] = useState(false);
  const [replyToggle, setReplyToggle] = useState(false);
  const [AddReplyResolver] = useMutation(ADD_REPLY);
  const [RemoveReply] = useMutation(REMOVE_REPLY);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const onAddReply = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (body === '') {
      toast.error('댓글을 입력하세요');
      return;
    }

    try {
      const response = await AddReplyResolver({
        variables: {
          body,
          postId,
          commentId,
          userId: user.id,
          username: user.username,
          profile: user.profile,
        },
      });

      if (!response || !response.data) return;

      toast.success('대댓글 저장');

      await client.clearStore();
      setBody('');
      await refetch();
      setReplyToggle(true);
      setToggle(false);
    } catch (err) {
      toast.error(err);
    }
  };

  const onToggle = () => {
    setToggle(!toggle);
  };

  const onReplyToggle = () => {
    setReplyToggle(!replyToggle);
  };

  const onRemoveReply = async (id: string) => {
    try {
      const response = await RemoveReply({
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

  return (
    <>
      <ListReplies
        replies={replies}
        user={user}
        replyToggle={replyToggle}
        onReplyToggle={onReplyToggle}
        onRemoveReply={onRemoveReply}
      />
      {user && (
        <AddReply
          body={body}
          onChange={onChange}
          onAddReply={onAddReply}
          toggle={toggle}
          onToggle={onToggle}
        />
      )}
    </>
  );
}

export default ReplyContainer;
