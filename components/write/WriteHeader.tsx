import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import shadow from '../../style/shadow';

interface WriteHeaderProps {
  onBack: () => void;
  onThumbnail: () => void;
  onUpload: () => void;
  onSubmit: (e: React.MouseEvent) => void;
}

function WriteHeader({ onBack, onThumbnail, onUpload, onSubmit }: WriteHeaderProps) {
  return (
    <HeaderBox>
      <div className="left">
        <Button onClick={onBack}>뒤 로</Button>
      </div>

      <div className="right">
        <Button onClick={onThumbnail}>썸네일 업로드</Button>
        <Button onClick={onUpload}>이미지 업로드</Button>
        <Button onClick={onSubmit}>저장하기</Button>
      </div>
    </HeaderBox>
  );
}

export default WriteHeader;

// Styles
const HeaderBox = styled.div`
  background: ${oc.gray[8]};
  height: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  .right {
    margin-left: auto;
  }
`;

const Button = styled.button`
  font-weight: 700;
  height: 2rem;
  color: white;
  background: black;
  border: 1px solid white;
  border-radius: 10px;
  outline: none;
  padding: 0.4rem;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    background: white;
    color: black;
    ${shadow(1)};
  }
  &:active {
    transform: translateY(3px);
  }
  & + & {
    margin-left: 0.5rem;
  }
`;
