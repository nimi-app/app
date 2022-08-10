import { Link } from 'react-router-dom';

import { ReactComponent as NimiLogo } from '../../assets/svg/nimi-logo-text.svg';
import { HeaderWrapper } from './styleds';
import { PhantomWalletStatus } from '../PhantomWalletStatus';
import { Web3Status } from '../Web3Status';

export function Header() {
  const isPhantom = true;

  return (
    <HeaderWrapper>
      <Link to="/">
        <NimiLogo width="100px" height="40px" />
      </Link>
      {isPhantom ? <PhantomWalletStatus /> : <Web3Status />}
    </HeaderWrapper>
  );
}
