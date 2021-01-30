import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { MeType } from '../../libs/types';
import { MdImageAspectRatio } from 'react-icons/md';

interface AddCommentProps {
  body: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddComment: (e: React.MouseEvent) => void;
  user: MeType | null;
}

function AddComment({ body, onChange, onAddComment, user }: AddCommentProps) {
  return (
    <CommentBox>
      {user && (
        <MiniProfile>
          {user.profile ? <img src={user.profile} alt="" /> : <MdImageAspectRatio />}
          <span>{user.username}</span>
        </MiniProfile>
      )}
      <textarea
        className="main"
        value={body}
        onChange={onChange}
        placeholder="댓글을 입력해주세요"
      />
      <ButtonBox>
        <button onClick={onAddComment}>저장하기</button>
      </ButtonBox>
    </CommentBox>
  );
}

export default AddComment;

// Styles
const CommentBox = styled.div`
  margin-bottom: 4rem;
  .main {
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
`;

const MiniProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
  img,
  svg {
    width: 2.5rem;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
  span {
    display: inline-block;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 5rem;
    height: 2rem;
    font-size: 1rem;
    background: ${oc.indigo[5]};
    color: white;
    border: none;
    outline: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s all;
    &:hover {
      background: ${oc.indigo[4]};
    }
  }
`;
