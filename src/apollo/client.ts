import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const ensEndpoints = {
  1: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
  3: 'https://api.thegraph.com/subgraphs/name/ensdomains/ensropsten',
  5: 'https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli',
};

const lensEndpoints = {
  1: 'https://api.lens.dev',
  3: 'https://api-mumbai.lens.dev',
  4: 'https://api-mumbai.lens.dev',
  5: 'https://api-mumbai.lens.dev',
};

export const defaultEnsClient = new ApolloClient({
  uri: ensEndpoints[1],
  cache: new InMemoryCache(),
});

export const ensClients: Record<number, ApolloClient<NormalizedCacheObject>> = {
  1: defaultEnsClient,
  4: new ApolloClient({
    uri: ensEndpoints[4],
    cache: new InMemoryCache(),
  }),
  5: new ApolloClient({
    uri: ensEndpoints[5],
    cache: new InMemoryCache(),
  }),
};

export const defaultLensClient = new ApolloClient({
  uri: lensEndpoints[1],
  cache: new InMemoryCache(),
});

export const lensClients: Record<number, ApolloClient<NormalizedCacheObject>> = {
  1: defaultLensClient,
  4: new ApolloClient({
    uri: lensEndpoints[4],
    cache: new InMemoryCache(),
  }),
  5: new ApolloClient({
    uri: lensEndpoints[5],
    cache: new InMemoryCache(),
  }),
};
