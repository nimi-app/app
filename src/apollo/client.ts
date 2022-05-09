import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

export const defaultClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/dxgraphs/swapr-rinkeby',
  cache: new InMemoryCache(),
});

export const clients: Record<number, ApolloClient<NormalizedCacheObject>> = {
  100: defaultClient,
  4: new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/dxgraphs/swapr-rinkeby',
    cache: new InMemoryCache(),
  }),
};
