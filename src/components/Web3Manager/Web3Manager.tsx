import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

/**
 * A null component handles the case where no connector is available.
 */
export function Web3Manager() {
  const { connector } = useWeb3React();

  useEffect(() => {
    connector?.connectEagerly?.();
  }, [connector]);

  return null;
}
