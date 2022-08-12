import { Link } from 'react-router-dom';

import { ReactComponent as NimiLogo } from '../../assets/svg/nimi-logo-text.svg';
import { HeaderWrapper } from './styleds';
import { PhantomWalletStatus } from '../PhantomWalletStatus';
import { Web3Status } from '../Web3Status';
import { ActiveNetworkState, useActiveNetwork } from '../../context/ActiveNetwork';

export function Header() {
  const { activeNetwork } = useActiveNetwork();
  return (
    <HeaderWrapper>
      <Link to="/">
        <NimiLogo width="100px" height="40px" />
      </Link>
      {activeNetwork === ActiveNetworkState.SOLANA ? <PhantomWalletStatus /> : <Web3Status />}
    </HeaderWrapper>
  );
}
