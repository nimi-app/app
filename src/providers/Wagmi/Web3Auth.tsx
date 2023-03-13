import { CHAIN_NAMESPACES } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { TorusWalletConnectorPlugin } from '@web3auth/torus-wallet-connector-plugin';
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';

const name = 'Web3 Auth';
const iconUrl = 'https://images.toruswallet.io/web3auth-logo-white.svg';

export const rainbowWeb3AuthConnector = ({ chains }) => {
  // Create Web3Auth Instance
  const web3AuthInstance = new Web3Auth({
    clientId: 'YOUR_CLIENT_ID',
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: '0x' + chains[0].id.toString(16),
      rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
      displayName: chains[0].name,
      tickerName: chains[0].nativeCurrency?.name,
      ticker: chains[0].nativeCurrency?.symbol,
      blockExplorer: chains[0]?.blockExplorers.default?.url,
    },
    uiConfig: {
      theme: 'dark',
      loginMethodsOrder: ['facebook', 'google'],
      defaultLanguage: 'en',
      appLogo: 'https://web3auth.io/images/w3a-L-Favicon-1.svg', // Your App Logo Here
      modalZIndex: '2147483647',
    },
  });

  // Add openlogin adapter for customisations
  const openloginAdapterInstance = new OpenloginAdapter({
    adapterSettings: {
      network: 'cyan',
      uxMode: 'popup',
      whiteLabel: {
        name: 'Web3 Auth',
        logoLight: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
        logoDark: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
        defaultLanguage: 'en',
        dark: true, // whether to enable dark mode. defaultValue: false
      },
    },
  });
  web3AuthInstance.configureAdapter(openloginAdapterInstance);

  // Add Torus Wallet Plugin
  const torusPlugin = new TorusWalletConnectorPlugin({
    torusWalletOpts: {
      buttonPosition: 'bottom-left',
    },
    walletInitOptions: {
      whiteLabel: {
        theme: { isDark: false, colors: { primary: '#00a8ff' } },
        logoDark: iconUrl,
        logoLight: iconUrl,
      },
      useWalletConnect: true,
      enableLogging: true,
    },
  });
  web3AuthInstance.addPlugin(torusPlugin);
  return {
    id: 'web3auth',
    name,
    iconUrl,
    iconBackground: '#0364ff',
    createConnector: () => {
      const connector = new Web3AuthConnector({
        chains: chains,
        options: {
          web3AuthInstance,
        },
      });
      return {
        connector,
      };
    },
  };
};
