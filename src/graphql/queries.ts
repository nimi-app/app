import { gql } from '@apollo/client';

export const GET_SUBDOMAINS_SUBGRAPH = gql`
  query getSubdomains($domainId: ID!) {
    domain(id: $domainId) {
      id
      labelName
      subdomains {
        id
        labelName
        labelhash
        isMigrated
        name
        owner {
          id
        }
      }
    }
  }
`;

export const GET_DOMAINS_SUBGRAPH = gql`
  query getDomains($address: ID!, $first: Int, $skip: Int, $orderBy: Domain_orderBy) {
    account(id: $address) {
      domains(first: $first, skip: $skip, orderBy: $orderBy) {
        id
        labelName
        labelhash
        name
        isMigrated
        parent {
          name
        }
      }
    }
  }
`;
