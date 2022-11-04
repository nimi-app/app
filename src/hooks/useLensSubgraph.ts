import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { lensClients } from '../apollo/client';
import { useActiveWeb3React } from './useWeb3';

export function useLensSubgraphClient(): ApolloClient<NormalizedCacheObject> {
  const { chainId } = useActiveWeb3React();

  return lensClients[chainId || 1];
}
