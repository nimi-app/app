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
