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

export const MULTICALL2_ADDRESS: Record<number, string> = {
  100: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  4: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
};
