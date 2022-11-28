import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useMemo } from 'react';

import { shortenAddress } from '../../utils';

import { useWalletSwitcherPopoverToggle } from '../../state/application/hooks';
import { useENSAvatar } from '../../hooks/useENSAvatar';
import { ENV_SUPPORTED_CHAIN_IDS } from '../../constants';
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
  const { isActive, isActivating, account, ENSName, chainId } = useWeb3React();
  const { avatar } = useENSAvatar();
  const openWalletSwitcherPopover = useWalletSwitcherPopoverToggle();
  const isWrongNetwork = !chainId || !ENV_SUPPORTED_CHAIN_IDS.includes(chainId);

  const statusContent = useMemo(() => {
    if (isWrongNetwork) {
      return t('error.unsupportedNetwork');
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
  }, [isActivating, isActive, account, ENSName, isWrongNetwork, t]);

  return (
    <StyledWrapper isError={isWrongNetwork} onClick={openWalletSwitcherPopover}>
      <Web3Avatar url={avatar} alt={ENSName || account} />
      <StyledInnerWrapper>
        <StyledTextContent>{statusContent}</StyledTextContent>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
}
