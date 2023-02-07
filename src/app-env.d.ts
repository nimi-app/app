/// <reference types="react-scripts" />

interface EthereumProviderRequestArguments {
  method: string;
  params?: unknown[] | Record<string, unknown>;
}

interface Ethereum {
  isMetaMask?: true;
  on?: (...args: any[]) => void;
  removeListener?: (...args: any[]) => void;
  request?: (args: EthereumProviderRequestArguments) => Promise<unknown>;
  isCoinbaseWallet?: boolean;
}

interface Window {
  ethereum?: Ethereum;
  web3?: Ethereum;
}

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: 'development' | 'production';
  }
}
