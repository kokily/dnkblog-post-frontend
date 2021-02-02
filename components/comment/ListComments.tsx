import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { BiBody } from 'react-icons/bi';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { CommentType, MeType } from '../../libs/types';
import formatDate from '../../libs/formatDate';
import ReplyContainer from '../../containers/reply/ReplyContainer';
import RemoveModal from '../common/RemoveModal';
import MarkdownRenderContainer from '../../containers/common/MarkdownRenderContainer';
import Comment from './Comment';
import CommentCardContainer from '../../containers/comment/CommentCardContainer';

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
            <span key={i}>
              <CommentCardContainer
                comment={comment}
                user={user}
                onRemoveClick={onRemoveClick}
                onCancel={onCancel}
                onRemove={onRemove}
                modal={modal}
                refetch={refetch}
              />
              {i + i !== comments.length && <hr />}
            </span>
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
