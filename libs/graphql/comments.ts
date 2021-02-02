import { gql } from '@apollo/react-hooks';

// List Comments (Params: postId)
export const LIST_COMMENTS = gql`
  query ListComments($postId: ID!) {
    ListComments(postId: $postId) {
      ok
      error
      comments {
        id
        body
        deleted
        userId
        username
        profile
        postId
        replies {
          id
          body
          deleted
          userId
          username
          profile
          commentId
          created_at
          updated_at
        }
        created_at
        updated_at
      }
    }
  }
`;

// Count Comments
export const COUNT_COMMENTS = gql`
  query CountComments {
    CountComments {
      ok
      error
      count {
        comments_num
        replies_num
      }
    }
  }
`;

// Add Comment (Params: text, postId)
export const ADD_COMMENT = gql`
  mutation AddComment($body: String!, $postId: ID!) {
    AddComment(body: $body, postId: $postId) {
      ok
      error
    }
  }
`;

// Remove Comment (Params: id)
export const REMOVE_COMMENT = gql`
  mutation RemoveComment($id: ID!) {
    RemoveComment(id: $id) {
      ok
      error
    }
  }
`;

// Update Comment (Params: id, body)
export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: ID!, $body: String!) {
    UpdateComment(id: $id, body: $body) {
      ok
      error
    }
  }
`;
