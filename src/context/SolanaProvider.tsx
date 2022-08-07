import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { PublicKey, Connection, clusterApiUrl } from '@solana/web3.js';

export const SolanaContext = createContext<null | SolanaData>(null);

interface SolanaData {
  wallet?: PublicKey;
  connection: Connection;
  hasPhantom: boolean;
  connect: any;
}

export function SolanaProvider({ children }: { children: ReactNode }) {
  const [wallets, setWallets] = useState<PublicKey | undefined>(undefined);
  const [hasPhanton, setHasPhanton] = useState(false);
  const connecti = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

  useEffect(() => {
    if (window.solana && window.solana.hasPhantom) setHasPhanton(true);
    if (window.solana.publicKey) setWallets(window.solana.publicKey);
    const initSolana = async () => {
      console.log('check if user has already connected once I figure it out');
    };
    initSolana();
  }, []);

  async function connect(onlyIfTrusted = true) {
    try {
      if ('solana' in window) {
        const win: typeof global = window;
        const solana = win.solana;
        console.log('inside', solana);
        if (solana?.isPhantom) {
          const response = onlyIfTrusted ? await solana.connect({ onlyIfTrusted: true }) : await solana.connect();
          setWallets(response.publicKey);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SolanaContext.Provider value={{ connection: connecti, wallet: wallets, hasPhantom: hasPhanton, connect }}>
      {children}
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
