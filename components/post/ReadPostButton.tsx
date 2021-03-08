import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { MeType } from '../../libs/types';
import shadow from '../../style/shadow';
import RemoveModal from '../common/RemoveModal';
import { media } from '../../style/media';

interface ButtonProps {
  back?: boolean;
  edit?: boolean;
  remove?: boolean;
}

interface ReadPostButtonProps {
  me: MeType | null;
  onBack: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
}

function ReadPostButton({ me, onBack, onEdit, onRemove }: ReadPostButtonProps) {
  const [modal, toggleModal] = useState(false);

  const onRemoveClick = () => {
    toggleModal(true);
  };

  const onCancel = () => {
    toggleModal(false);
  };

  const onConfirm = () => {
    toggleModal(false);

    if (onRemove) {
      onRemove();
    }
  };

  return (
    <>
      <ButtonBox>
        {me && me.admin && (
          <>
            <Button back onClick={onBack}>
              뒤로가기
            </Button>
            <Button edit onClick={onEdit}>
              수정하기
            </Button>
            <Button remove onClick={onRemoveClick}>
              삭제하기
            </Button>
          </>
        )}
      </ButtonBox>

      <RemoveModal visible={modal} onConfirm={onConfirm} onCancel={onCancel} />
    </>
  );
}

export default ReadPostButton;

// Styles
const ButtonBox = styled.div`
  margin-top: 4rem;
  margin-bottom: 4.5rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  ${media.medium} {
    margin-top: 0;
    margin-bottom: 2rem;
  }
`;

const Button = styled.button<ButtonProps>`
  font-size: 1rem;
  font-weight: bold;
  width: 90px;
  border-radius: 6px;
  padding: 0.2rem;
  padding-bottom: 0.2rem;
  cursor: pointer;
  transition: 0.2s all;
  &:active {
    transform: translateY(2px);
  }
  & + & {
    margin-left: 0.3rem;
  }
  ${(props) =>
    props.back &&
    css`
      border: 1px solid ${oc.teal[6]};
      background: white;
      color: ${oc.teal[6]};
      &:hover {
        background: ${oc.teal[6]};
        color: white;
        ${shadow(1)};
      }
    `}
  ${(props) =>
    props.edit &&
    css`
      border: 1px solid ${oc.grape[6]};
      background: white;
      color: ${oc.grape[6]};
      &:hover {
        background: ${oc.grape[6]};
        color: white;
        ${shadow(1)};
      }
    `}
    ${(props) =>
    props.remove &&
    css`
      border: 1px solid ${oc.red[6]};
      background: white;
      color: ${oc.red[6]};
      &:hover {
        background: ${oc.red[6]};
        color: white;
        ${shadow(1)};
      }
    `}
`;
