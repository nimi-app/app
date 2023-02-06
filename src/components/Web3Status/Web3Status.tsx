import { useAccountModal, useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { useAccount, useClient, useConnect, useEnsAvatar, useEnsName, useNetwork } from 'wagmi';

import { Web3Avatar } from './Web3Avatar';
import { StyledButtonBaseFrame } from '../Button/styled';

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

export function Web3Status() {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const { chain } = useNetwork();
  const { address, connector, isConnected } = useAccount();
  const ensNameQuery = useEnsName();
  const ensAvatar = useEnsAvatar();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();
  const { connectAsync, connectors } = useConnect();
  const client = useClient();
  const [isAutoConnecting, setIsAutoConnecting] = useState(false);

  useEffect(() => {
    if (isAutoConnecting) return;
    if (isConnected) return;

    setIsAutoConnecting(true);

    const autoConnect = async () => {
      const lastUsedConnector = client.storage?.getItem('wallet');

      const sorted = lastUsedConnector
        ? [...connectors].sort((x) => (x.id === lastUsedConnector ? -1 : 1))
        : connectors;

      for (const connector of sorted) {
        if (!connector.ready || !connector.isAuthorized) continue;
        const isAuthorized = await connector.isAuthorized();
        if (!isAuthorized) continue;

        await connectAsync({ connector });
        break;
      }
    };

    autoConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoaded(true);
    }

    console.log({
      address,
      connector,
      isConnected,
    });
  }, [address, connector, isConnected]);

  if (!isLoaded) return null;

  const displayName = ensNameQuery.data || address;

  // Connected
  if (isConnected) {
    // Unsupported network
    if (chain?.unsupported) {
      return (
        <StyledWrapper isError={true} onClick={openChainModal}>
          <Web3Avatar url={ensAvatar.data as string} alt={displayName} />
          <StyledInnerWrapper>
            <StyledTextContent>{t('error.wrongNetwork')}</StyledTextContent>
          </StyledInnerWrapper>
        </StyledWrapper>
      );
    }

    return (
      <StyledWrapper isError={false} onClick={openAccountModal}>
        <Web3Avatar url={ensAvatar.data as string} alt={displayName} />
        <StyledInnerWrapper>
          <StyledTextContent>{displayName}</StyledTextContent>
        </StyledInnerWrapper>
      </StyledWrapper>
    );
  }

  // Not connected
  return (
    <StyledWrapper isError={false} onClick={openConnectModal}>
      <Web3Avatar />
      <StyledInnerWrapper>
        <StyledTextContent>{t('connect')}</StyledTextContent>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
}
