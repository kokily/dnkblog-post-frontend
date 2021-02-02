import React, { useState } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { BiArrowToTop, BiArrowFromTop } from 'react-icons/bi';
import { MeType, ReplyType } from '../../libs/types';
import ReplyCardContainer from '../../containers/reply/ReplyCardConatiner';

interface ListRepliesProps {
  replies: ReplyType[] | null;
  user: MeType | null;
  replyToggle: boolean;
  onReplyToggle: () => void;
  onRemoveReply: (id: string) => void;
  refetch: any;
}

function ListReplies({
  replies,
  user,
  replyToggle,
  onReplyToggle,
  onRemoveReply,
  refetch,
}: ListRepliesProps) {
  const [modal, setModal] = useState(false);

  const onRemoveClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onRemove = (id: string) => {
    setModal(false);
    onRemoveReply(id);
  };

  return (
    <>
      {replies && replies.length !== 0 ? (
        <>
          {replyToggle ? (
            <>
              <ToggleBox>
                <span className="reply">
                  <span onClick={onReplyToggle}>
                    <BiArrowToTop size={22} color={'red'} /> 대댓글 닫기
                  </span>
                </span>
              </ToggleBox>
              <RepliesBox>
                {replies.map((reply, i) => (
                  <ReplyCardContainer
                    key={i}
                    reply={reply}
                    user={user}
                    onRemoveClick={onRemoveClick}
                    modal={modal}
                    onCancel={onCancel}
                    onRemove={onRemove}
                    refetch={refetch}
                  />
                ))}
              </RepliesBox>
            </>
          ) : (
            <ToggleBox>
              <span className="reply">
                <span onClick={onReplyToggle}>
                  <BiArrowFromTop size={22} color={'cyan'} />
                  대댓글 열기
                  <span className="all">(총 {replies.length}개)</span>
                </span>
              </span>
            </ToggleBox>
          )}
        </>
      ) : null}
    </>
  );
}

export default ListReplies;

// Styles
const RepliesBox = styled.div`
  display: block;
  margin-top: 1.4rem;
`;

const ToggleBox = styled.div`
  display: flex;
  flex-direction: column;
  .reply {
    display: flex;
    align-items: center;
    span {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .all {
      margin-left: 0.3rem;
      font-size: 0.92rem;
      color: ${oc.gray[4]};
    }
  }
`;
