import { ReactNode, useMemo } from 'react';
import { PhantomWalletAdapter, GlowWalletAdapter } from '@solana/wallet-adapter-wallets/lib/cjs';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui/lib/cjs';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react/lib/cjs';

export function SolanaProvider({ children }: { children: ReactNode }) {
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new GlowWalletAdapter()], []);
  console.log('wallets', wallets);

  return (
    <ConnectionProvider endpoint={'https://api.mainnet-beta.solana.com '}>
      <WalletProvider onError={(e) => console.log('error', e)} wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
