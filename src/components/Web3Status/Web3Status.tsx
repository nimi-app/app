import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useMemo, useState } from 'react';
import { shortenAddress } from '../../utils';
import { useENSAvatar } from '../../hooks/useENSAvatar';
import { ENV_SUPPORTED_CHAIN_IDS } from '../../constants';
import { StyledButtonBaseFrame } from '../Button/styled';
import { Web3Avatar } from './Web3Avatar';
import { ConnectButton, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit';
import { Button } from '../Button';

export interface WrapperProps {
  isError: boolean;
}

const StyledWrapper = styled(StyledButtonBaseFrame)<WrapperProps>(
  ({ isError }) => `
  display: flex;
  height: 48px;
  width: 200px;
  align-items: center;
  ${isError ? 'background: #EB5757;' : ''}
  `
);

const StyledInnerWrapper = styled.div`
  display: flex;
  padding: 0px 16px 0px 10px;
  justify-content: center;
  width: 150px;
`;

const StyledTextContent = styled.span`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Nimi',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function Web3Status() {
  const { t } = useTranslation();
  const { avatar } = useENSAvatar();
  const [ensName, setEnsName] = useState('');
  const account = wagmiClient.data?.account as string;
  const isActivating = (wagmiClient.status as string) === 'connecting';
  const isActive = (wagmiClient.status as string) === 'connected';
  const chainId = wagmiClient.data?.chain?.id as number;
  const isWrongNetwork = !chainId || !ENV_SUPPORTED_CHAIN_IDS.includes(chainId);

  if (account !== undefined && account !== null) {
    wagmiClient
      .getProvider()
      .lookupAddress(account.toLowerCase())
      .then((r) => {
        if (r !== null) {
          setEnsName(r);
        }
      });
  }

  const statusContent = useMemo(() => {
    if (isWrongNetwork) {
      return t('error.unsupportedNetwork');
    }
    if (isActivating) {
      return t('connecting');
    }
    if (isActive && account) {
      if (ensName.length > 0) {
        return ensName;
      }
      return shortenAddress(account, 2, 4);
    }
    return t('connect');
  }, [isActivating, isActive, account, ensName, isWrongNetwork, t]);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton.Custom>
          {({ account, chain, openChainModal, openAccountModal, openConnectModal, authenticationStatus, mounted }) => {
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <StyledWrapper isError={false} onClick={openConnectModal}>
                        <Web3Avatar />
                        <StyledInnerWrapper>
                          <StyledTextContent>{statusContent}</StyledTextContent>
                        </StyledInnerWrapper>
                      </StyledWrapper>
                    );
                  }
                  if (isWrongNetwork || chain.unsupported) {
                    return (
                      <StyledWrapper isError={chain.unsupported || isWrongNetwork} onClick={openChainModal}>
                        <Web3Avatar url={avatar} alt={(ensName as string) || (account as any)} />
                        <StyledInnerWrapper>
                          <StyledTextContent>{statusContent}</StyledTextContent>
                        </StyledInnerWrapper>
                      </StyledWrapper>
                    );
                  }
                  return (
                    <StyledWrapper isError={false} onClick={openAccountModal}>
                      <Web3Avatar url={avatar} alt={(ensName as string) || (account as any)} />
                      <StyledInnerWrapper>
                        <StyledTextContent>{statusContent}</StyledTextContent>
                      </StyledInnerWrapper>
                    </StyledWrapper>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
