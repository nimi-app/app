import { Chain, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import { Spinner } from '../components/Spinner';
import { useRainbow } from '../hooks/useRainbow';
import { ReactQueryProvider, WagmiProvider } from '../providers';
import { FixedGlobalStyle, ThemedGlobalStyle, ThemeProvider } from '../theme';
import { loadFathom } from '../utils';
import '../i18n/config'; // This is not ideal, but next-i18next doesn't support ESM yet

if (typeof window !== 'undefined' && 'ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false;
}

const AppRoot: FC<PropsWithChildren> = ({ children }) => {
  const { chains } = useRainbow();

  return (
    <RainbowKitProvider
      modalSize="compact"
      chains={chains as Chain[]}
      appInfo={{
        appName: 'Nimi',
      }}
    >
      {children}
    </RainbowKitProvider>
  );
};
function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  if (loading) {
    return <Spinner />;
  }

  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Load Fathom if it's set in .env
    if (process.env.FATHOM_SITE_ID) {
      loadFathom(process.env.FATHOM_SITE_ID);
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <link rel="alternate icon" type="image/png" href="/favicon.png" />
        <link rel="icon" sizes="any" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/nimi-logo-192.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,700;0,900;1,900&display=swap"
        />
        <meta property="og:url" content="https://nimi.io/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nimi" />
        <meta property="og:description" content="Nimi - your web3 profile page." />
        <meta property="og:image" content="/nimi-logo-512.png" />
      </Head>
      <FixedGlobalStyle />
      <ReactQueryProvider>
        <WagmiProvider>
          <AppRoot>
            <ThemeProvider>
              <ThemedGlobalStyle />
              <>
                <Loading />
                <Component {...pageProps} />
              </>
            </ThemeProvider>
          </AppRoot>
        </WagmiProvider>
      </ReactQueryProvider>
    </>
  );
}
