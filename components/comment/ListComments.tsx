import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { BiBody } from 'react-icons/bi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { CommentType, MeType } from '../../libs/types';
import formatDate from '../../libs/formatDate';
import ReplyContainer from '../../containers/reply/ReplyContainer';
import RemoveModal from '../common/RemoveModal';

interface RemoveProps {
  deleted?: boolean;
}

interface ListCommentsProps {
  comments: CommentType[] | null;
  user: MeType | null;
  onRemoveComment: (id: string) => void;
  refetch: any;
}

function ListComments({ comments, user, onRemoveComment, refetch }: ListCommentsProps) {
  const [modal, setModal] = useState(false);

  const onRemoveClick = () => {
    setModal(true);
  };

  const onCancel = () => {
    setModal(false);
  };

  const onRemove = (id: string) => {
    setModal(false);
    onRemoveComment(id);
  };

  return (
    <>
      {comments && comments.length !== 0 ? (
        <CommentsBox>
          <h4>{comments.length} 개의 댓글</h4>

          {comments.map((comment, i) => (
            <CommentBox key={i}>
              <div className="content">
                <div className="header">
                  {comment.profile ? <img src={comment.profile} alt="" /> : <BiBody />}
                  <span>
                    {comment.username}님 {formatDate(comment.created_at)} 작성
                  </span>
                  {user && user.id === comment.userId && (
                    <span className="right">
                      <RiDeleteBin5Fill color={'red'} size={22} onClick={onRemoveClick} />
                    </span>
                  )}
                </div>
                <TextPane deleted={comment.deleted ? true : false}>
                  {comment.body}
                </TextPane>
              </div>
              <div className="add">
                <ReplyContainer
                  postId={comment.postId}
                  commentId={comment.id}
                  replies={comment.replies}
                  user={user}
                  refetch={refetch}
                />
              </div>
              <RemoveModal
                visible={modal}
                onCancel={onCancel}
                onConfirm={() => onRemove(comment.id)}
              />

              {i + i !== comments.length && <hr />}
            </CommentBox>
          ))}
        </CommentsBox>
      ) : (
        <CommentsBox>
          <h4>아직 댓글이 없습니다.</h4>
        </CommentsBox>
      )}
    </>
  );
}

export default ListComments;

// Styles
const CommentsBox = styled.div`
  margin-bottom: 4rem;
  hr {
    margin-bottom: 1.5rem;
  }
`;

const CommentBox = styled.div<RemoveProps>`
  .content {
    background: ${oc.gray[8]};
    padding: 0.5rem;
    border-radius: 14px;
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
  .add {
    padding: 1rem;
    padding-right: 0;
    svg {
      margin-left: 0.4rem;
      margin-right: 0.4rem;
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
      border-radius: 14px;
    `}
`;
