import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { BiAddToQueue, BiHide } from 'react-icons/bi';
import Preview from '../common/Preview';

interface AddReplyProps {
  body: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddReply: (e: React.MouseEvent) => void;
  toggle: boolean;
  onToggle: () => void;
}

function AddReply({ body, onChange, onAddReply, toggle, onToggle }: AddReplyProps) {
  return (
    <AddReplyBox>
      <>
        {toggle ? (
          <AddPane>
            <span className="right" onClick={onToggle}>
              <BiHide size={22} color={'red'} /> 닫기
            </span>
            <div className="editor">
              {body !== '' && <Preview body={body} />}
              <textarea
                className="main"
                value={body}
                onChange={onChange}
                placeholder="대댓글을 입력해주세요"
              />
              <ButtonBox>
                <button onClick={onAddReply}>저장하기</button>
              </ButtonBox>
            </div>
          </AddPane>
        ) : (
          <AddPane>
            <span className="right" onClick={onToggle}>
              <BiAddToQueue size={22} color={'orange'} onClick={onToggle} /> 댓댓글 달기
            </span>
          </AddPane>
        )}
      </>
    </AddReplyBox>
  );
}

export default AddReply;

// Styles
const AddReplyBox = styled.div`
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  padding: 1rem;

  .editor {
    position: relative;
  }
`;

const AddPane = styled.div`
  display: flex;
  flex-direction: column;
  .right {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: 0.2s all;
    &:hover {
      color: ${oc.blue[4]};
    }
  }
  .main {
    width: 100%;
    height: 4rem;
    border-radius: 7px;
    outline: none;
    margin-top: 0.5rem;
    padding: 0.5rem;
    font-size: 1.2rem;
    resize: none;
    background: ${oc.gray[1]};
    transition: 0.2s all;
    &:focus {
      background: white;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 5rem;
    height: 2rem;
    font-size: 1rem;
    background: ${oc.grape[5]};
    color: white;
    border: none;
    outline: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s all;
    &:hover {
      background: ${oc.grape[4]};
    }
  }
`;
