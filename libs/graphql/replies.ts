import { gql } from '@apollo/react-hooks';

// Add Reply (Params: text, commentId)
export const ADD_REPLY = gql`
  mutation AddReply($body: String!, $commentId: ID!, $postId: ID!) {
    AddReply(body: $body, commentId: $commentId, postId: $postId) {
      ok
      error
    }
  }
`;

// Remove Reply (Params: id)
export const REMOVE_REPLY = gql`
  mutation RemoveReply($id: ID!) {
    RemoveReply(id: $id) {
      ok
      error
    }
  }
`;
