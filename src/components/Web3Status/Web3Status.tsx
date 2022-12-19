import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { StyledButtonBaseFrame } from '../Button/styled';
import { Web3Avatar } from './Web3Avatar';

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

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openAccountModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain;
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
                      <StyledTextContent>{t('connect')}</StyledTextContent>
                    </StyledInnerWrapper>
                  </StyledWrapper>
                );
              }

              if (chain.unsupported) {
                return (
                  <StyledWrapper isError={chain.unsupported} onClick={openChainModal}>
                    <Web3Avatar url={account.ensAvatar} alt={account.displayName} />

                    <StyledInnerWrapper>
                      <StyledTextContent>{t('error.wrongNetwork')}</StyledTextContent>
                    </StyledInnerWrapper>
                  </StyledWrapper>
                );
              }
              return (
                <StyledWrapper isError={false} onClick={openAccountModal}>
                  <Web3Avatar url={account.ensAvatar} alt={account.displayName} />
                  <StyledInnerWrapper>
                    <StyledTextContent>{account.displayName}</StyledTextContent>
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
