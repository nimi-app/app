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
  styleOverride?: Object;
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

export const FieldsMapping = [
  { name: 'Description', dataType: 'text', styleOverride: { flexBasis: '100%' }, placeholder: 'Some cdescription' },
  { name: 'Twitter', dataType: 'text', placeholder: 'Username' },
  { name: 'Telegram', dataType: 'text', placeholder: 'Username' },
  { name: 'Instagram', dataType: 'text', placeholder: 'Username' },
  { name: 'LinkedIn', dataType: 'text', placeholder: 'Username' },
  { name: 'Email', dataType: 'text', placeholder: 'email' },
  { name: 'Website', dataType: 'URL', placeholder: 'url' },
];

export const MULTICALL2_ADDRESS: Record<number, string> = {
  100: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  4: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
};
