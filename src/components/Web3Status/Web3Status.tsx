import { ChainIdNotAllowedError } from '@web3-react/store';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { shortenAddress } from '../../utils';

import { useWalletSwitcherPopoverToggle } from '../../state/application/hooks';
import { StyledBase, StyledInnerWrapper } from '../Button/styled';
import { ChainId } from '../../constants';

export interface WrapperProps {
  isError: boolean;
}

const StyledWrapper = styled(StyledBase)<WrapperProps>(
  ({ isError }) => `
  ${isError ? 'background: #EB5757;' : ''}
`
);

export function Web3Status() {
  const { t } = useTranslation();
  const { isActive, isActivating, account, error, chainId } = useWeb3React();
  const openWalletSwitcherPopover = useWalletSwitcherPopoverToggle();

  const isWrongNetwork =
    error instanceof ChainIdNotAllowedError ||
    ![ChainId.MAINNET, ChainId.RINKEBY, ChainId.GOERLI].includes(chainId as number);

  return (
    <StyledWrapper isError={error !== undefined} onClick={openWalletSwitcherPopover}>
      <StyledInnerWrapper>
        <span>
          {error && isWrongNetwork
            ? t('error.wrongNetwork')
            : isActivating
            ? t('connecting')
            : isActive && account
            ? shortenAddress(account)
            : t('connect')}
        </span>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
}
