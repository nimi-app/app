
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

declare module 'multihashes' {
  declare function decode(buff: Uint8Array): { code: number; name: string; length: number; digest: Uint8Array };
  declare function toB58String(hash: Uint8Array): string;
}

declare module 'toformat';

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: 'development' | 'production';
  }
}

declare module '*.svg?url' {
  /**
   * SVG images with `?url` suffix imported via next-image-loader
   */
  const content: {
    src: string;
    height: number;
    width: number;
  }

  export default content
}