import { gql } from '@apollo/client';

export const LENS_DEFAULT_PROFILE_QUERY = gql`
  query getDefaultProfile($account: EthereumAddress!) {
    defaultProfile(request: { ethereumAddress: $account }) {
      name
      bio
      picture {
        ... on NftImage {
          uri
        }
        ... on MediaSet {
          original {
            url
          }
        }
      }
    }
  }
`;
