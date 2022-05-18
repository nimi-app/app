import { ChainIdNotAllowedError } from '@web3-react/store';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useMemo } from 'react';

import { shortenAddress } from '../../utils';

import { useWalletSwitcherPopoverToggle } from '../../state/application/hooks';
import { useENSAvatar } from '../../hooks/useENSAvatar';
import { SUPPORTED_CHAIN_IDS } from '../../constants';
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
  padding: 0 16px;
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
  const { isActive, isActivating, account, error, chainId, ENSName } = useWeb3React();
  const { avatar } = useENSAvatar();
  const openWalletSwitcherPopover = useWalletSwitcherPopoverToggle();

  const isWrongNetwork = error instanceof ChainIdNotAllowedError || SUPPORTED_CHAIN_IDS.includes(chainId as number);

  const statusContent = useMemo(() => {
    if (error && isWrongNetwork) {
      return t('error.wrongNetwork');
    }

    if (isActivating) {
      return t('connecting');
    }

    if (isActive && account) {
      if (ENSName) {
        return ENSName;
      }

      return shortenAddress(account, 2, 4);
    }

    return t('connect');
  }, [isActivating, isActive, account, error, isWrongNetwork, ENSName, t]);

  return (
    <StyledWrapper isError={error !== undefined} onClick={openWalletSwitcherPopover}>
      <Web3Avatar url={avatar} alt={ENSName || account} />
      <StyledInnerWrapper>
        <StyledTextContent>{statusContent}</StyledTextContent>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
}
