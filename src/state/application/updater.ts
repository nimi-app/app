import { useDispatch } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { updateBlockNumber } from './actions';

import { useActiveWeb3React } from '../../hooks/useWeb3';
import { useIsWindowVisible } from '../../hooks/useIsWindowVisible';
import { useDebounce } from '../../hooks/useDebounce';

export function ApplicationStateUpdater(): null {
  const { provider, chainId } = useActiveWeb3React();
  const dispatch = useDispatch();

  const windowVisible = useIsWindowVisible();

  const [state, setState] = useState<{
    chainId: number | undefined;
    blockNumber: number | null;
  }>({
    chainId,
    blockNumber: null,
  });

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((state: any) => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== 'number') return { chainId, blockNumber };
          return { chainId, blockNumber: Math.max(blockNumber, state.blockNumber) };
        }
        return state;
      });
    },
    [chainId]
  );

  // attach/detach listeners
  useEffect(() => {
    if (!provider || !chainId || !windowVisible) return undefined;

    setState({ chainId, blockNumber: null });

    provider
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error: Error) => console.error(`Failed to get block number for chainId: ${chainId}`, error));

    provider.on('block', blockNumberCallback);

    return () => {
      provider.removeListener('block', blockNumberCallback);
    };
  }, [dispatch, chainId, provider, blockNumberCallback, windowVisible]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (!windowVisible || !debouncedState.chainId || !debouncedState.blockNumber) return;
    dispatch(updateBlockNumber({ chainId: debouncedState.chainId, blockNumber: debouncedState.blockNumber }));
  }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId]);

  return null;
}
