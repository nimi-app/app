import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useRainbow } from '../../hooks/useRainbow';
import { setConnectorInfo } from './actions';

export function Updater(): null {
  const { chainId, account } = useRainbow();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chainId && account) {
      dispatch(setConnectorInfo({ chainId, account }));
    }
  }, [account, chainId, dispatch]);

  return null;
}
