import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { AppState } from '../../state';
import { usePhantomWallet } from '../../hooks/usePhantomWallet';

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

  const { connectPhantomWallet } = usePhantomWallet();
  console.log('PW STATUS', phantomWallet);

  return (
    <PhanotmWalletButton onClick={() => connectPhantomWallet(false)}>
      {phantomWallet ? shortenString(phantomWallet.publicKey.toString()) : 'Connect PW'}
    </PhanotmWalletButton>
  );
}
