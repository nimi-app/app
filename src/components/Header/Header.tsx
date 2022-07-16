import { Link } from 'react-router-dom';

import { ReactComponent as NimiLogo } from '../../assets/svg/nimi-logo.svg';
import { HeaderWrapper } from './styleds';
import { Web3Status } from '../Web3Status';

export function Header() {
  return (
    <HeaderWrapper>
      <Link to="/">
        <NimiLogo height="40px" />
      </Link>
      <Web3Status />
    </HeaderWrapper>
  );
}
