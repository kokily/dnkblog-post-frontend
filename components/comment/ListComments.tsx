import React, { useState } from 'react';
import styled from 'styled-components';
import { CommentType, MeType } from '../../libs/types';
import CommentCardContainer from '../../containers/comment/CommentCardContainer';

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
