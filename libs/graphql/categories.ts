import { gql } from '@apollo/react-hooks';

export const DIVIDE_CATEGORY = gql`
  query DivideCategory {
    DivideCategory {
      ok
      error
      categories {
        name
      }
    }
  }
`;
