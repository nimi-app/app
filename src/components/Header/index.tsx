import { Link } from 'react-router-dom';

import { ReactComponent as NimiLogo } from '../../assets/svg/nimi-logo.svg';
import { ReactComponent as WalletConnect } from '../../mock_fixtures/images/connect-placeholder.svg';

import { AccountAndLinks, HeaderWrapper } from './styleds';

export function Header() {
  return (
    <HeaderWrapper>
      <Link to="/">
        <NimiLogo />
      </Link>
      <AccountAndLinks>
        <WalletConnect />
      </AccountAndLinks>
    </HeaderWrapper>
  );
}
