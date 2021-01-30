import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { BiBody, BiArrowToTop, BiArrowFromTop } from 'react-icons/bi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { MeType, ReplyType } from '../../libs/types';
import formatDate from '../../libs/formatDate';
import RemoveModal from '../common/RemoveModal';

interface RemoveProps {
  deleted?: boolean;
}

interface ListRepliesProps {
  replies: ReplyType[] | null;
  user: MeType | null;
  replyToggle: boolean;
  onReplyToggle: () => void;
  onRemoveReply: (id: string) => void;
}

function ListReplies({
  replies,
  user,
  replyToggle,
  onReplyToggle,
  onRemoveReply,
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
                  <ReplyBox key={i}>
                    <div className="content">
                      <div className="header">
                        {reply.profile ? <img src={reply.profile} alt="" /> : <BiBody />}

                        <span>
                          {reply.username}님{' '}
                          <span className="date">
                            {formatDate(reply.created_at)} 작성
                          </span>
                        </span>
                        {user && user.id === reply.userId && (
                          <span className="right">
                            <RiDeleteBin5Fill
                              color={'red'}
                              size={22}
                              onClick={onRemoveClick}
                            />
                          </span>
                        )}
                      </div>
                      <TextPane deleted={reply.deleted ? true : false}>
                        {reply.body}
                      </TextPane>
                    </div>

                    <RemoveModal
                      visible={modal}
                      onCancel={onCancel}
                      onConfirm={() => onRemove(reply.id)}
                    />
                  </ReplyBox>
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

const ReplyBox = styled.div`
  padding: 0.5rem;
  padding-right: 0;
  .content {
    border-radius: 14px;
    background: ${oc.gray[9]};
    padding: 0.5rem;
    padding-right: 0;
  }
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    img {
      width: 35px;
      height: auto;
      border-radius: 50%;
      margin-right: 1rem;
    }
    span {
      font-size: 1.1rem;
      .date {
        font-size: 0.95rem;
        color: ${oc.gray[5]};
      }
    }
    .right {
      margin-right: 0.5rem;
      margin-left: auto;
      cursor: pointer;
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
    }
  }
`;

const TextPane = styled.div<RemoveProps>`
  padding: 0.8rem;
  padding-bottom: 0.2rem;
  ${(props) =>
    props.deleted &&
    css`
      color: ${oc.gray[6]};
    `}
`;
