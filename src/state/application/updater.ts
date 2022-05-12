import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setConnectorInfo } from './actions';

export function Updater(): null {
  const { chainId, account } = useWeb3React();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chainId && account) {
      dispatch(setConnectorInfo({ chainId, account }));
    }
  }, [account, chainId, dispatch]);

  return null;
}
