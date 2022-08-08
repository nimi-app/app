import { ReactNode, useMemo } from 'react';
import { PhantomWalletAdapter, GlowWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

export function SolanaProvider({ children }: { children: ReactNode }) {
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new GlowWalletAdapter()], []);
  console.log('wallets', wallets);

  return (
    <ConnectionProvider endpoint={'https://api.mainnet-beta.solana.com '}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
