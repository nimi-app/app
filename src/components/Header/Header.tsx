import { Link } from 'react-router-dom';

import { ReactComponent as NimiLogo } from '../../assets/svg/nimi-logo-text.svg';
import { HeaderWrapper } from './styleds';
import { PhantomWalletStatus } from '../PhantomWalletStatus';
import { Web3Status } from '../Web3Status';
import { useSelector } from 'react-redux';
import { AppState } from '../../state';

export function Header() {
  const isPhantom = useSelector((state: AppState) => state.application.phantomWallet);
  console.log('header', isPhantom);
  return (
    <HeaderWrapper>
      <Link to="/">
        <NimiLogo width="100px" height="40px" />
      </Link>
      {isPhantom ? <PhantomWalletStatus /> : <Web3Status />}
    </HeaderWrapper>
  );
}
