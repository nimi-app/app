import { Link } from 'react-router-dom';

import { ReactComponent as NimiLogo } from '../../assets/svg/nimi-logo.svg';
import { AccountAndLinks, HeaderWrapper, NavOption } from './styleds';
import { Web3Status } from '../Web3Status';

export function Header() {
  return (
    <HeaderWrapper>
      <Link to="/">
        <NimiLogo height="40px" />
      </Link>
      <AccountAndLinks>
        <Link to="/">
          <NavOption>Landing Page</NavOption>
        </Link>
        <Link to="/domains">
          <NavOption>Dashboard</NavOption>
        </Link>
      </AccountAndLinks>
      <Web3Status />
    </HeaderWrapper>
  );
}
