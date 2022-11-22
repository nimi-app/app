import { gql } from 'graphql-request';

export const LENS_DEFAULT_PROFILE_QUERY = gql`
  query getDefaultLensProfile($account: EthereumAddress!) {
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
