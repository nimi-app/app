import { useWeb3React } from '@web3-react/core';
import { ChainIdNotAllowedError } from '@web3-react/store';

import { Button } from '../../../../components/Button';
import { Container } from '../../../../components/Container';
import { useWalletSwitcherPopoverToggle } from '../../../../state/application/hooks';
import { NimiConnectContainer } from '../../containers/NimiConnectContainer';

/**
 * An experimental page for NimiConnect
 */
export function NimiConnect() {
  const { isActive, account, error } = useWeb3React();
  const isWrongNetwork = error instanceof ChainIdNotAllowedError;
  const openWalletSwitcherPopover = useWalletSwitcherPopoverToggle();

  const onCTAClick = () => openWalletSwitcherPopover();

  if (!account || !isActive) {
    return (
      <Container>
        <Button onClick={onCTAClick}>
          {isWrongNetwork ? <span>Switch Network</span> : <span>Connect Wallet</span>}
        </Button>
      </Container>
    );
  }

  return <NimiConnectContainer address={account} />;
}
