import { GraphQLClient } from 'graphql-request';

import { ChainId } from '../../constants';

type EndpointType = {
  [chainId: number]: string;
};

export const ENSendpoint: EndpointType = {
  [ChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
  [ChainId.GOERLI]: 'https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli',
};

export const LENSendpoint: EndpointType = {
  [ChainId.MAINNET]: 'https://api.lens.dev',
  [ChainId.GOERLI]: 'https://api-mumbai.lens.dev',
};

export enum GRAPH_ENDPOINT {
  ENS = 'ENSendpoint',
  LENS = 'LENSendpoint',
}

export function getGraphQLClient(endpoint: GRAPH_ENDPOINT, chainId = 1): GraphQLClient {
  let caluclatedEndpoint: string;
  switch (endpoint) {
    case GRAPH_ENDPOINT.ENS:
      caluclatedEndpoint = ENSendpoint[chainId];
      break;

    case GRAPH_ENDPOINT.LENS:
      caluclatedEndpoint = LENSendpoint[chainId];
      break;
  }

  return new GraphQLClient(caluclatedEndpoint);
}
