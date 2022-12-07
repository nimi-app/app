import { Container } from '../../../../components/Container';
import { Button } from '../../../../components/Button';
import { useWalletSwitcherPopoverToggle } from '../../../../state/application/hooks';
import { NimiConnectContainer } from '../../containers/NimiConnectContainer';
import { ENV_SUPPORTED_CHAIN_IDS } from '../../../../constants';
import { useRainbow } from '../../../../hooks/useRainbow';

/**
 * An experimental page for NimiConnect
 */
export function NimiConnect() {
  const { isConnected, account, chainId } = useRainbow();
  const openWalletSwitcherPopover = useWalletSwitcherPopoverToggle();
  const onCTAClick = () => openWalletSwitcherPopover();
  const isWrongNetwork = !chainId || !ENV_SUPPORTED_CHAIN_IDS.includes(chainId);

  if (!account || !isConnected) {
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
