import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import { ActiveNetworkState, useActiveNetwork } from './ActiveNetwork';

export const SolanaContext = createContext<null | SolanaData>(null);

interface SolanaData {
  publicKey?: PublicKey;
  hasPhantom: boolean;
  connect: any;
  disconnect: any;
  connecting: boolean;
}

export function SolanaProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<PublicKey | undefined>(undefined);
  const { activeNetwork, setActiveNetwork } = useActiveNetwork();
  const [connecting, setConnecting] = useState(false);
  const [hasPhanton, setHasPhanton] = useState(false);
  const win: typeof global = window;
  async function connect(onlyIfTrusted = true) {
    setConnecting(true);
    try {
      if (win.solana) {
        console.log('hasSolana', win);
        const solana = win.solana;

        if (solana?.isPhantom) {
          console.log('repsonse');
          const response = onlyIfTrusted ? await solana.connect({ onlyIfTrusted: true }) : await solana.connect();
          console.log('repsonse', response);
          setPublicKey(response.publicKey);
          setConnecting(false);
        }
      }
    } catch (error) {
      setConnecting(false);
      console.log('errrrooroororororor');
      console.error(error);
    }
  }
  async function disconnect(onlyIfTrusted = true) {
    try {
      if ('solana' in window) {
        const solana = win.solana;
        if (solana?.isPhantom) {
          if (onlyIfTrusted) {
            await solana.disconnect({ onlyIfTrusted: true });
          } else {
            await solana.disconnect();
          }
          setActiveNetwork(ActiveNetworkState.DEFAULT);
          setPublicKey(undefined);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log('active', activeNetwork);
    console.log('window', win.solana);
    if (win.solana && win.solana.isPhantom) setHasPhanton(true);

    const initSolana = async () => {
      console.log('activeNetwork', activeNetwork === ActiveNetworkState.SOLANA);
      if (activeNetwork === ActiveNetworkState.SOLANA) {
        await connect(true);
        console.log('succesful');
      }
    };
    initSolana();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNetwork]);

  return (
    <SolanaContext.Provider value={{ publicKey, hasPhantom: hasPhanton, connect, disconnect, connecting }}>
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
