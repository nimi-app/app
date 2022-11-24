import { useWeb3React } from '@web3-react/core';

import { Container } from '../../../../components/Container';
import { Button } from '../../../../components/Button';
import { useWalletSwitcherPopoverToggle } from '../../../../state/application/hooks';
import { NimiConnectContainer } from '../../containers/NimiConnectContainer';
import { ENV_SUPPORTED_CHAIN_IDS } from '../../../../constants';

/**
 * An experimental page for NimiConnect
 */
export function NimiConnect() {
  const { isActive, account, chainId } = useWeb3React();
  const openWalletSwitcherPopover = useWalletSwitcherPopoverToggle();
  const onCTAClick = () => openWalletSwitcherPopover();
  const isWrongNetwork = !chainId || !ENV_SUPPORTED_CHAIN_IDS.includes(chainId);

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
