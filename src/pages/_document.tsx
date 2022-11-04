// pages/_document.js
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.png" />
        <link rel="alternate icon" type="image/png" href="%PUBLIC_URL%/favicon.png" />
        <link rel="icon" sizes="any" type="image/svg+xml" href="%PUBLIC_URL%/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,700;0,900;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/nimi-logo-192.png" />
        <meta name="theme-color" content="#C3EEFF" />
        <meta property="og:url" content="https://nimi.io/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nimi" />
        <meta property="og:description" content="Nimi - your web3 profile page." />
        <meta property="og:image" content="%PUBLIC_URL%/nimi-logo-512.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
