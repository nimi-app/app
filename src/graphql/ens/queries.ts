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
  query getDomainsOwnedOrControlledBy(
    $addressID: ID!
    $addressString: String!
    $searchString: String
    $first: Int
    $skip: Int
    $orderBy: Domain_orderBy
  ) {
    account(id: $addressID) {
      domainsOwned: domains(
        first: $first
        skip: $skip
        orderBy: $orderBy
        where: { name_contains_nocase: $searchString }
      ) {
        id
        labelName
        labelhash
        name
        parent {
          name
        }
      }
    }
    domainsControlled: domains(
      first: $first
      skip: $skip
      orderBy: $orderBy
      where: { name_contains_nocase: $searchString, owner: $addressString }
    ) {
      id
      labelName
      labelhash
      name
      owner {
        id
      }
    }
  }
`;

export const GET_DOMAIN_FROM_SUBGRAPH = gql`
  query getDomainFromSubgraph($domainId: ID!) {
    domain(id: $domainId) {
      id
      name
      labelName
      labelhash
      owner {
        id
      }
    }
  }
`;
