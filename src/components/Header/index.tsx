import { Link } from 'react-router-dom';

import { ReactComponent as NimiLogo } from '../../assets/svg/nimi-logo.svg';

import { AccountAndLinks, HeaderWrapper, NavOption } from './styleds';

export function Header() {
  return (
    <HeaderWrapper>
      <Link to="/">
        <NimiLogo />
      </Link>
      <AccountAndLinks>
        <Link to="/">
          <NavOption>Landing Page</NavOption>
        </Link>
        <NavOption>Dashboard</NavOption>
      </AccountAndLinks>
    </HeaderWrapper>
  );
}
