import type { AddEthereumChainParameter } from '@web3-react/types';
export const NetworkContextName = 'NETWORK';

import { NimiLinkType } from '@nimi.io/card';
import { CSSProperties } from 'styled-components';

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
  LENSTER = 'Lenster',
  TWITTER = 'Twitter',
  TELEGRAM = 'Telegram',
  INSTAGRAM = 'Instagram',
  LINKEDIN = 'LinkedIn',
  EMAIL = 'Email',
  WEBSITE = 'Website',
}

export interface FieldType {
  name: string;
  dataType: string;
  styleOverride?: CSSProperties;
  placeholder: string;
  logo?: string;
}
export const defaultFields: FieldType[] = [
  {
    name: 'Username',
    dataType: 'text',
    styleOverride: { flexBasis: '100%' },
    placeholder: 'Username',
  },
  {
    name: 'Description',
    dataType: 'text',
    styleOverride: { flexBasis: '100%' },
    placeholder:
      'This is a test description. This field is filled in to show what happens. Two rows should be enough to show this state.',
  },
];

/**
 * Map NimiLinkType to the correct placeholder text
 */
export const nimiLinkTypePlaceholder: Record<NimiLinkType, string> = {
  [NimiLinkType.URL]: 'https://nimi.eth.limo',
  [NimiLinkType.EMAIL]: 'email@email.com',
  [NimiLinkType.TWITTER]: '0xNimi',
  [NimiLinkType.INSTAGRAM]: '0xNimi',
  [NimiLinkType.TELEGRAM]: 'NimiEth',
  [NimiLinkType.GITHUB]: 'nimi-app',
  [NimiLinkType.MEDIUM]: '0xNimi',
  [NimiLinkType.REDDIT]: '0xNimi',
  [NimiLinkType.LENSTER]: 'nimi.lens',
  [NimiLinkType.DISCORD]: 'nimi#0001',
  [NimiLinkType.YOUTUBE_CHANNEL]: 'Username',
  [NimiLinkType.LINKEDIN]: 'Username',
  [NimiLinkType.TWITCH]: 'Twitch Username',
  [NimiLinkType.WHATSAPP]: 'Whatsapp Username',
  [NimiLinkType.MESSENGER]: 'Messanger username',
  [NimiLinkType.KEYBASE]: 'Keybase Username',
  [NimiLinkType.WECHAT]: 'Wechat Username',
  [NimiLinkType.SNAPCHAT]: 'Snapchat Username',
  [NimiLinkType.FACEBOOK]: 'Facebook Username',
  [NimiLinkType.DRIBBBLE]: 'Dribble Username',
  [NimiLinkType.FIGMA]: 'Figma Username',
};

export const MULTICALL2_ADDRESS: Record<number, string> = {
  100: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  4: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
};

export enum ChainId {
  MAINNET = 1,
  GOERLI = 5,
}

export const PUBLIC_RESOLVER_ADDRESSES = {
  [ChainId.MAINNET]: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
  [ChainId.GOERLI]: '0x4b1488b7a6b320d2d721406204abc3eeaa9ad329',
};

export function getChainLabel(chainId: ChainId): string {
  return (
    {
      [ChainId.MAINNET]: 'Ethereum',
      [ChainId.GOERLI]: 'Görli',
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
  [ChainId.GOERLI]: {
    urls: [process.env.infuraKey ? `https://goerli.infura.io/v3/${process.env.infuraKey}` : undefined].filter(
      (url) => url !== undefined
    ) as string[],
    nativeCurrency: ETH,
    name: 'Görli',
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
 * List of chain IDs.
 */
export const SUPPORTED_CHAIN_IDS = Object.keys(CHAINS).map((key) => Number(key));

/**
 * List of chain IDs that are supported in the current environment: production or development.
 */
export const ENV_SUPPORTED_CHAIN_IDS =
  process.env.REACT_APP_ENV === 'production' ? [ChainId.MAINNET] : SUPPORTED_CHAIN_IDS;

export const supportedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/gif'];
