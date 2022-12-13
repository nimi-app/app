import { Link } from 'react-router-dom';

import { ReactComponent as NimiLogo } from '../../assets/svg/nimi-logo-text.svg';
import { Web3Status } from '../Web3Status';
import { HeaderWrapper } from './styleds';

export function Header() {
  return (
    <HeaderWrapper>
      <Link to="/">
        <NimiLogo width="100px" height="40px" />
      </Link>
      <Web3Status />
    </HeaderWrapper>
  );
}
