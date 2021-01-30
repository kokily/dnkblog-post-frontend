import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import oc from 'open-color';
import { UserCommentType } from '../../libs/types';
import formatDate from '../../libs/formatDate';
import shadow from '../../style/shadow';

interface CommentsProps {
  user: UserCommentType;
}

function Comments({ user }: CommentsProps) {
  return (
    <>
      <CommentsBox>
        {user?.comments?.length !== 0 ? (
          <>
            <h2>
              작성한 댓글 <small>({user.comments.length}개)</small>
            </h2>

            {user.comments.map((comment) => (
              <Link href={`/post/${comment.postId}`} key={comment.id}>
                <CommentBox>
                  <div className="header">
                    <span className="date">{formatDate(comment.created_at)} 작성</span>
                  </div>
                  <div>{comment.body}</div>
                </CommentBox>
              </Link>
            ))}
          </>
        ) : (
          <h2>작성한 댓글이 없습니다.</h2>
        )}
      </CommentsBox>

      <hr />

      <CommentsBox>
        {user?.replies?.length !== 0 ? (
          <>
            <h2>
              작성한 대댓글 <small>({user.replies.length}개)</small>
            </h2>

            {user.replies.map((reply) => (
              <Link href={`/post/${reply.postId}`} key={reply.id}>
                <CommentBox>
                  <div className="header">
                    <span className="date">{formatDate(reply.created_at)} 작성</span>
                  </div>
                  <div>{reply.body}</div>
                </CommentBox>
              </Link>
            ))}
          </>
        ) : (
          <h2>작성한 대댓글이 없습니다.</h2>
        )}
      </CommentsBox>
    </>
  );
}

export default Comments;

// Styles
const CommentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h2 {
    color: ${oc.cyan[7]};
    text-align: center;
  }
`;

const CommentBox = styled.div`
  margin-bottom: 1rem;
  background: ${oc.gray[8]};
  border-radius: 4px;
  padding: 0.7rem;
  cursor: pointer;
  transition: 0.16s all;
  .header {
    display: flex;
    align-items: center;
    .date {
      font-size: 1rem;
      margin-left: 0.4rem;
      color: ${oc.gray[5]};
      margin-bottom: 0.5rem;
    }
  }
  &:hover {
    background: ${oc.gray[7]};
    color: ${oc.teal[5]};
    ${shadow(1)};
  }
`;
