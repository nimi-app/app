import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { lensClients } from '../apollo/client';
import { useRainbow } from './useRainbow';

export function useLensSubgraphClient(): ApolloClient<NormalizedCacheObject> {
  const rainbow = useRainbow();
  const chainId = rainbow.data?.chain?.id;
  return lensClients[chainId || 1];
}
