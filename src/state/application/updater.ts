import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setConnectorInfo } from './actions';
import { useRainbow } from '../../hooks/useRainbow';

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
