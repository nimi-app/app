import { useMemo } from 'react';

import { useRainbow } from './useRainbow';
import { getGraphQLClient, GRAPH_ENDPOINT } from '../api/GraphQl/graphClient';
import {
  GetAccountNamesQuery,
  GetDomainsOwnedOrControlledByQuery,
  useGetAccountNamesQuery,
} from '../api/GraphQl/schemas/generated/ens';
import { ENSDomain } from '../models';

interface UserENSDomains {
  data: ENSDomain[];
  isLoading: boolean;
  hasNextPage?: boolean;
}

const ITEMS_PER_PAGE = 8;

/**
 * Fetches all **valid** ENS domains owned or controlled by the given address.
 *
 * Names that include `[` or `]` are considered invalid unless they resolve to a valid ENS name.
 *
 * For example, `[b009fb4ac7328256e8cebb99127b1eb7e7ae60933e24f36f5567ef75724d690d].sismo.eth` should resolve to `abc.sismo.eth` to be considered valid.
 *
 * @param address
 * @returns {UserENSDomains} data and loading state
 */
export function useGetENSDomainsByAddress({
  address,
  page = 1,
  searchQuery,
}: {
  address: string;
  page?: number;
  searchQuery?: string;
}): UserENSDomains {
  if (page < 1) throw new Error('useGetENSDomainsByAddress: page must be greater than 0');

  const { chainId } = useRainbow();

  const {
    data: useGetAccountNamesQueryData,
    isLoading: isLoadingUseGetAccountNamesQuery,
    isFetching: isFetchingUseGetAccountNamesQuery,
  } = useGetAccountNamesQuery(getGraphQLClient(GRAPH_ENDPOINT.ENS, chainId), {
    id: address?.toLowerCase(),
    chainId,
  });

  // Combine fetching and revalidating states
  const isLoading = isLoadingUseGetAccountNamesQuery || isFetchingUseGetAccountNamesQuery;

  // This is a list of all the domains that the user owns or controls
  const parsedDomainsList = useMemo(() => {
    if (isLoading || !useGetAccountNamesQueryData) {
      return [];
    }

    return parseAccountDomains(useGetAccountNamesQueryData);
  }, [useGetAccountNamesQueryData, isLoading]);

  // Data is the actual list of domains that we want to display depending on the search string and the page
  const data = useMemo(() => {
    // First we filter the array depending on the search string
    const filteredDomainsList = parsedDomainsList.filter((domain) => {
      if (!searchQuery || searchQuery?.trim() === '') return true;

      const domainName = domain?.name?.toLowerCase();
      const searchStringLowerCase = searchQuery?.toLowerCase();

      return domainName?.includes(searchStringLowerCase);
    });

    // slice the array depending on the page
    const slicedDomainsList = filteredDomainsList.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    console.log({ filteredDomainsList, slicedDomainsList });

    return slicedDomainsList;
  }, [parsedDomainsList, searchQuery, page]);

  return {
    data: data as ENSDomain[],
    isLoading,
    hasNextPage: data?.length > 0 && data?.length % ITEMS_PER_PAGE === 0,
  };
}

function parseAccountDomains(data: GetAccountNamesQuery) {
  if (!data || !data?.account) return [];

  const domainsRegisterations = data?.account?.registrations ?? [];
  const domainsControlled = data?.account.domainsControlled ?? [];
  const wrappedDomainsOwned = data?.account?.wrappedDomainsControlled ?? [];

  // Flatten the domain objects
  const domainsOwned = domainsRegisterations.map(({ domain }) => domain);

  // Flatten the array of arrays
  const allWrappedDomains = wrappedDomainsOwned.map(({ domain, owner }) => ({
    ...domain,
    owner,
  }));

  // We need to merge the two arrays and remove duplicates
  const allUserDomains = [...domainsOwned, ...domainsControlled, ...allWrappedDomains];

  const uniqueDomains = allUserDomains.reduce((acc, domain) => {
    // If the domain is already in the array, we don't want to add it again
    const isDomainDuplicate = acc.find((d: any) => d?.id === domain?.id);
    if (isDomainDuplicate) return acc;

    const isNameEncrypted = domain?.name?.includes('[');

    if (isNameEncrypted) {
      // If the name is encrypted, we need to decrypt it
      // The following helps finding subdomains that are encrypted at <name>.sismo.eth
      const foundDomainFromAllUserDomains = allUserDomains.find(
        ({ labelhash }) => labelhash?.toLowerCase() == domain.labelhash?.toLowerCase()
      );

      // Luckily, we can find the domain in the array, so we can use it to get the labelName
      if (
        foundDomainFromAllUserDomains &&
        foundDomainFromAllUserDomains.labelName !== null &&
        foundDomainFromAllUserDomains.labelName !== undefined
      ) {
        // Breakdown the domain into: subdomain, domain, tld (eth/xyz/etc)
        const domainNameParts = domain?.name?.split('.') as string[];
        // Repllce the subdomain with the decrypted name
        domainNameParts[0] = foundDomainFromAllUserDomains.labelName;

        domain = {
          ...domain,
          name: domainNameParts.join('.'),
        };
      }
    }

    if (!domain.name?.includes('[')) {
      acc.push(domain as any);
    }

    return acc;
  }, [] as GetDomainsOwnedOrControlledByQuery['domainsControlled']);

  return uniqueDomains;
}
