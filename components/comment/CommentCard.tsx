import React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { CommentType, MeType } from '../../libs/types';
import { BiBody } from 'react-icons/bi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import formatDate from '../../libs/formatDate';
import MarkdownRenderContainer from '../../containers/common/MarkdownRenderContainer';
import ReplyContainer from '../../containers/reply/ReplyContainer';
import RemoveModal from '../common/RemoveModal';

interface RemoveProps {
  deleted?: boolean;
}

interface ButtonProps {
  submit?: boolean;
}

interface CommentProps {
  comment: CommentType;
  user: MeType | null;
  onRemoveClick: () => void;
  onCancel: () => void;
  onRemove: (id: string) => void;
  modal: boolean;
  refetch: any;
  toggle: boolean;
  onToggle: () => void;
  body: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onUpdateComment: (e: React.MouseEvent) => void;
}

function CommentCard({
  comment,
  user,
  onRemoveClick,
  onCancel,
  onRemove,
  modal,
  refetch,
  toggle,
  onToggle,
  body,
  onChange,
  onUpdateComment,
}: CommentProps) {
  return (
    <CommentBox>
      <div className="content">
        <div className="header">
          {comment.profile ? <img src={comment.profile} alt="" /> : <BiBody />}
          <span>
            {comment.username}님 {formatDate(comment.created_at)} 작성
          </span>
          {user && user.id === comment.userId && (
            <span className="right">
              <RiDeleteBin5Fill color={'red'} size={22} onClick={onRemoveClick} />
              <FaRegEdit color={'skyblue'} size={22} onClick={onToggle} />
            </span>
          )}
        </div>
        <TextPane deleted={comment.deleted ? true : false}>
          {toggle ? (
            <textarea value={body} onChange={onChange} />
          ) : (
            <MarkdownRenderContainer markdown={comment.body} />
          )}
        </TextPane>
        {toggle && (
          <ButtonBox>
            <Button onClick={onToggle}>취소하기</Button>
            <Button submit onClick={onUpdateComment}>
              저장하기
            </Button>
          </ButtonBox>
        )}
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
    </CommentBox>
  );
}

export default CommentCard;

// Styles
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

      svg {
        margin-left: 0.5rem;
        cursor: pointer;
        opacity: 0.6;

        &:hover {
          opacity: 1;
        }
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

  textarea {
    width: 100%;
    height: 5rem;
    border-radius: 7px;
    outline: none;
    padding: 0.5rem;
    margin-bottom: 0.3rem;
    font-size: 1.2rem;
    resize: none;
    background: ${oc.gray[1]};
    transition: 0.2s all;
    &:focus {
      background: white;
    }
  }
  ${(props) =>
    props.deleted &&
    css`
      color: ${oc.gray[6]};
      border-radius: 14px;
    `}
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 0.4rem;
`;

const Button = styled.button<ButtonProps>`
  width: 5rem;
  height: 2rem;
  font-size: 1rem;
  border: none;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.3rem;
  transition: 0.2s all;
  background: white;
  color: black;
  &:hover {
    background: ${oc.gray[3]};
  }

  ${(props) =>
    props.submit &&
    css`
      background: ${oc.red[5]};
      color: white;

      &:hover {
        background: ${oc.red[3]};
      }
    `}
`;
