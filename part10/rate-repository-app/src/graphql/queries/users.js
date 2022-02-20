import { gql } from '@apollo/client';

export const IS_AUTHORIZED = gql`
  query isAuthorized($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            repository {
              id
            }
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          startCursor
          hasNextPage
        }
      }
    }
  }
`;