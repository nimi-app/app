import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { AppState } from '../../state';
import { useWallet } from '@solana/wallet-adapter-react/lib/cjs';
import { StyledButtonBaseFrame } from '../Button/styled';
import { shortenString } from '../../utils';

const PhanotmWalletButton = styled(StyledButtonBaseFrame)`
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 20px;
`;

export function PhantomWalletStatus() {
  const phantomWallet = useSelector((state: AppState) => state.application.phantomWallet);

  const { wallet, wallets } = useWallet();
  console.log('PW STATUS', phantomWallet);

  return (
    <PhanotmWalletButton onClick={() => wallets[0].adapter.connect()}>
      {wallet ? shortenString(wallet.publicKey.toString()) : 'Connect PW'}
    </PhanotmWalletButton>
  );
}
