import React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';

interface ButtonProps {
  cyan?: boolean;
}

interface ModalProps {
  visible: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function Modal({ visible, title, content, onConfirm, onCancel }: ModalProps) {
  if (!visible) return null;

  return (
    <ModalBox>
      <Content>
        <h2>{title}</h2>
        <p>{content}</p>

        <div className="button-group">
          <Button onClick={onCancel}>취소</Button>
          <Button cyan onClick={onConfirm}>
            확인
          </Button>
        </div>
      </Content>
    </ModalBox>
  );
}

export default Modal;

// Styles
const ModalBox = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 320px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 3rem;
  }
  .button-group {
    display: flex;
    justify-content: flex-end;
  }
  animation: 0.3s ease-out 0s 1 slideUpFromBottom;
  @keyframes slideUpFromBottom {
    0% {
      transform: translateY(70%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Button = styled.button<ButtonProps>`
  width: 5rem;
  height: 2rem;
  border: none;
  background: ${oc.gray[6]};
  color: white;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 4px;
  cursor: pointer;
  ${(props) =>
    props.cyan &&
    css`
      background: ${oc.cyan[6]};
      &:hover {
        color: ${oc.cyan[6]};
      }
    `}
  &:hover {
    background: ${oc.gray[3]};
    color: ${oc.gray[8]};
  }
  & + & {
    margin-left: 0.75rem;
  }
`;
