import React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { BiBody } from 'react-icons/bi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { ReplyType, MeType } from '../../libs/types';
import formatDate from '../../libs/formatDate';
import MarkdownRenderContainer from '../../containers/common/MarkdownRenderContainer';
import RemoveModal from '../common/RemoveModal';
import Preview from '../common/Preview';

interface RemoveProps {
  deleted?: boolean;
}

interface ButtonProps {
  submit?: boolean;
}

interface ReplyCardProps {
  reply: ReplyType;
  user: MeType | null;
  onRemoveClick: () => void;
  modal: boolean;
  onCancel: () => void;
  onRemove: (id: string) => void;
  body: string;
  toggle: boolean;
  onToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onUpdateReply: (e: React.MouseEvent) => void;
}

function ReplyCard({
  reply,
  user,
  onRemoveClick,
  modal,
  onCancel,
  onRemove,
  body,
  toggle,
  onToggle,
  onChange,
  onUpdateReply,
}: ReplyCardProps) {
  return (
    <ReplyBox>
      <div className="content">
        <div className="header">
          {reply.profile ? <img src={reply.profile} alt="" /> : <BiBody />}

          <span>
            {reply.username}님{' '}
            <span className="date">{formatDate(reply.created_at)} 작성</span>
          </span>
          {user && user.id === reply.userId && (
            <span className="right">
              <RiDeleteBin5Fill color={'red'} size={22} onClick={onRemoveClick} />
              <FaRegEdit color={'skyblue'} size={22} onClick={onToggle} />
            </span>
          )}
        </div>
        <TextPane deleted={reply.deleted ? true : false}>
          {toggle ? (
            <>
              <Preview body={body} />
              <textarea value={body} onChange={onChange} />
            </>
          ) : (
            <MarkdownRenderContainer markdown={reply.body} />
          )}
        </TextPane>
        {toggle && (
          <ButtonBox>
            <Button onClick={onToggle}>취소하기</Button>
            <Button submit onClick={onUpdateReply}>
              저장하기
            </Button>
          </ButtonBox>
        )}
      </div>

      <RemoveModal
        visible={modal}
        onCancel={onCancel}
        onConfirm={() => onRemove(reply.id)}
      />
    </ReplyBox>
  );
}

export default ReplyCard;

// Styles
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

      svg {
        margin-left: 0.3rem;
        cursor: pointer;
        opacity: 0.6;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
`;

const TextPane = styled.div<RemoveProps>`
  position: relative;
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
