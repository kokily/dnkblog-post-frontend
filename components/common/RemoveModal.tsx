import React from 'react';
import Modal from './Modal';

interface RemoveModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function RemoveModal({ visible, onConfirm, onCancel }: RemoveModalProps) {
  return (
    <Modal
      visible={visible}
      title="삭제하기"
      content="진짜 삭제하시나요??"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

export default RemoveModal;
