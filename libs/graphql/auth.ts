import { gql } from '@apollo/react-hooks';

// Register Email
export const REGISTER_EMAIL = gql`
  mutation RegisterEmail($email: String!, $username: String!, $password: String!) {
    RegisterEmail(email: $email, username: $username, password: $password) {
      ok
      error
    }
  }
`;

// Login Email
export const LOGIN_EMAIL = gql`
  mutation LoginEmail($email: String!, $password: String!) {
    LoginEmail(email: $email, password: $password) {
      ok
      error
    }
  }
`;

// Logout
export const LOGOUT = gql`
  mutation Logout {
    Logout {
      ok
      error
    }
  }
`;

// Check Me
export const CHECK_ME = gql`
  query CheckMe {
    CheckMe {
      ok
      error
      user {
        id
        username
        profile
        admin
        githubId
        googleId
        email
      }
    }
  }
`;
