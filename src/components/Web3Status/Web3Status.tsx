import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useMemo, useState } from 'react';
import { shortenAddress } from '../../utils';
import { useENSAvatar } from '../../hooks/useENSAvatar';
import { ENV_SUPPORTED_CHAIN_IDS } from '../../constants';
import { StyledButtonBaseFrame } from '../Button/styled';
import { Web3Avatar } from './Web3Avatar';
import { Chain, ConnectButton } from '@rainbow-me/rainbowkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig, useEnsName, useNetwork } from 'wagmi';
import { useRainbow } from '../../hooks/useRainbow';
import { useAccount } from 'wagmi';

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
  const rainbow = useRainbow();
  const { avatar } = useENSAvatar();
  const { address } = useAccount();
  const { chain, chains } = useNetwork();
  const account = address;
  const chainId = chain?.id;
  const isConnected = rainbow.status === 'connected';
  const isActivating = rainbow.status === 'connecting';
  const isActive = isConnected === true;
  const isWrongNetwork = !chainId || !ENV_SUPPORTED_CHAIN_IDS.includes(chainId);

  const [ensName, setEnsName] = useState('');
  const [ensNameQueryInitiated, setEnsNameQuery] = useState(false);
  if (address !== undefined && address !== null && ensName === '' && ensNameQueryInitiated === false) {
    setEnsNameQuery(true);
    rainbow
      .getProvider()
      .lookupAddress(address.toLowerCase())
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
  );
}
