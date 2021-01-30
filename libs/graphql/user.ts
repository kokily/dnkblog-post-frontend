import { gql } from '@apollo/react-hooks';

// User Comments
export const USER_COMMENTS = gql`
  query UserComments {
    UserComments {
      ok
      error
      user {
        comments {
          id
          body
          deleted
          postId
          created_at
          updated_at
        }
        replies {
          id
          body
          deleted
          postId
          created_at
          updated_at
        }
      }
    }
  }
`;
