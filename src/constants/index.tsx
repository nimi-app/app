import type { AddEthereumChainParameter } from '@web3-react/types';
export const NetworkContextName = 'NETWORK';

export interface NetworkDetails {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
}
export enum Fields {
  DESCRIPTION,
  TWITTER,
  TELEGRAM,
  INSTAGRAM,
  LINKEDIN,
  EMAIL,
  WEBSITE,
}
export interface FieldType {
  name: string;
  dataType: string;
  styleOverride?: React.CSSProperties;
  placeholder: string;
}
export const defaultFields: FieldType[] = [
  {
    name: 'Username',
    dataType: 'text',
    styleOverride: { flexBasis: '100%' },
    placeholder: 'Username',
  },
];

export const FieldsMapping: FieldType[] = [
  { name: 'Description', dataType: 'text', styleOverride: { flexBasis: '100%' }, placeholder: 'Some cdescription' },
  { name: 'Twitter', dataType: 'text', placeholder: 'Twitter' },
  { name: 'Telegram', dataType: 'text', placeholder: 'Telegram' },
  { name: 'Instagram', dataType: 'text', placeholder: 'Instagram' },
  { name: 'LinkedIn', dataType: 'text', placeholder: 'LinkedIn' },
  { name: 'Email', dataType: 'text', placeholder: 'email' },
  { name: 'Website', dataType: 'URL', placeholder: 'url' },
];

export const MULTICALL2_ADDRESS: Record<number, string> = {
  100: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  4: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
};

export enum ChainId {
  MAINNET = 1,
  RINKEBY = 4,
  GOERLI = 5,
  XDAI = 100,
  POLYGON = 137,
  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,
}

export function getChainLabel(chainId: ChainId): string {
  return (
    {
      [ChainId.MAINNET]: 'Ethereum',
      [ChainId.RINKEBY]: 'Rinkeby',
      [ChainId.POLYGON]: 'Polygon',
    }[chainId] || ''
  );
}

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency'];
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls'];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

/**
 * List of chains and their information.
 */
export const CHAINS: Record<number, BasicChainInformation | ExtendedChainInformation> = {
  [ChainId.MAINNET]: {
    urls: [
      process.env.infuraKey ? `https://mainnet.infura.io/v3/${process.env.infuraKey}` : undefined,
      process.env.alchemyKey ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.alchemyKey}` : undefined,
      'https://cloudflare-eth.com',
    ].filter((url) => url !== undefined) as string[],
    nativeCurrency: ETH,
    name: 'Ethereum',
  },
  [ChainId.RINKEBY]: {
    urls: [process.env.infuraKey ? `https://rinkeby.infura.io/v3/${process.env.infuraKey}` : undefined].filter(
      (url) => url !== undefined
    ) as string[],
    nativeCurrency: ETH,
    name: 'Rinkeby',
  },
  [ChainId.GOERLI]: {
    urls: [process.env.infuraKey ? `https://goerli.infura.io/v3/${process.env.infuraKey}` : undefined].filter(
      (url) => url !== undefined
    ) as string[],
    nativeCurrency: ETH,
    name: 'Göerli',
  },
};

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
  (accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls;

    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs;
    }

    return accumulator;
  },
  {}
);

/**
 * List of chain IDs
 */
export const SUPPORTED_CHAIN_IDS = Object.keys(CHAINS).map((key) => Number(key));
