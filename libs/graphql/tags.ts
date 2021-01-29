import { gql } from '@apollo/client';

// Top Tags List
export const TOP_TAGS_LIST = gql`
  query TopTagsList {
    TopTagsList {
      ok
      error
      tags {
        id
        name
        count
      }
      all_count
    }
  }
`;
