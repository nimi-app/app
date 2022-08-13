import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import { ActiveNetworkState, useActiveNetwork } from './ActiveNetwork';

export const SolanaContext = createContext<null | SolanaData>(null);

interface SolanaData {
  wallet?: any;
  publicKey?: PublicKey;
  hasPhantom: boolean;
  connect: any;
  disconnect: any;
}

export function SolanaProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState(undefined);
  const [publicKey, setPublicKey] = useState<PublicKey | undefined>(undefined);
  const { activeNetwork, setActiveNetwork } = useActiveNetwork();

  const [hasPhanton, setHasPhanton] = useState(false);

  async function connect(onlyIfTrusted = true) {
    try {
      if ('solana' in window) {
        const win: typeof global = window;
        const solana = win.solana;
        console.log('inside', solana);
        if (solana?.isPhantom) {
          const response = onlyIfTrusted ? await solana.connect({ onlyIfTrusted: true }) : await solana.connect();
          setPublicKey(response.publicKey);
          setWallet(response);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function disconnect(onlyIfTrusted = true) {
    try {
      if ('solana' in window) {
        const win: typeof global = window;
        const solana = win.solana;
        console.log('inside', solana);
        if (solana?.isPhantom) {
          if (onlyIfTrusted) {
            await solana.disconnect({ onlyIfTrusted: true });
          } else {
            await solana.disconnect();
          }
          setActiveNetwork(ActiveNetworkState.DEFAULT);
          setPublicKey(undefined);
          setWallet(undefined);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (window.solana && window.solana.hasPhantom) setHasPhanton(true);
    console.log('publickey', window.solana);
    const initSolana = async () => {
      if (activeNetwork === ActiveNetworkState.SOLANA) {
        connect();
      }
      console.log('check if user has already connected once I figure it out');
    };
    initSolana();
  }, [activeNetwork]);

  return (
    <SolanaContext.Provider value={{ publicKey, wallet, hasPhantom: hasPhanton, connect, disconnect }}>
      <ConnectionProvider
        endpoint={
          'https://yolo-smart-friday.solana-mainnet.discover.quiknode.pro/b410a9fd44d9d96c368523a6dc08374e8287b51a/'
        }
      >
        {children}
      </ConnectionProvider>
    </SolanaContext.Provider>
  );
}

export const useSolana = () => {
  const conect = useContext(SolanaContext);
  if (!conect) {
    throw new Error('No Solana for you!');
  }

  return conect;
};
