import styled from 'styled-components';

import { StyledButtonBaseFrame } from '../Button/styled';
import { shortenString } from '../../utils';
import { useSolana } from '../../context/SolanaProvider';
import { useWalletSwitcherPopoverToggle } from '../../state/application/hooks';

const PhanotmWalletButton = styled(StyledButtonBaseFrame)`
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 20px;
`;

export function PhantomWalletStatus() {
  const { publicKey } = useSolana();
  const openWalletSwitcherPopover = useWalletSwitcherPopoverToggle();

  return (
    <PhanotmWalletButton onClick={openWalletSwitcherPopover}>
      {publicKey ? shortenString(publicKey.toString()) : 'Connect PHANTOM'}
    </PhanotmWalletButton>
  );
}
