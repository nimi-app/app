import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const ensEndpoints = {
  1: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
  3: 'https://api.thegraph.com/subgraphs/name/ensdomains/ensropsten',
  4: 'https://api.thegraph.com/subgraphs/name/ensdomains/ensrinkeby',
  5: 'https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli',
};

export const defaultClient = new ApolloClient({
  uri: ensEndpoints[1],
  cache: new InMemoryCache(),
});

export const clients: Record<number, ApolloClient<NormalizedCacheObject>> = {
  1: defaultClient,
  4: new ApolloClient({
    uri: ensEndpoints[4],
    cache: new InMemoryCache(),
  }),
  5: new ApolloClient({
    uri: ensEndpoints[5],
    cache: new InMemoryCache(),
  }),
};
