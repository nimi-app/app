import { useEffect, useState } from 'react';

import { useActiveWeb3React } from './useWeb3';
import { GraphQlClientDynamic, GRAPH_ENDPOINT } from '../api/GraphQl/graphClient';
import {
  GetDomainsOwnedOrControlledByQuery,
  useGetDomainsOwnedOrControlledByQuery,
} from '../api/GraphQl/schemas/generated/ens';

export interface UserENSDomains {
  data: GetDomainsOwnedOrControlledByQuery['domainsControlled'] | undefined;
  loading: boolean;
  hasNextPage: boolean;
}

const numberOfItemsPerPage = 8;

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
export function useGetENSDomainsByAddress(address: string, page = 0, searchString?: string): UserENSDomains {
  const { chainId } = useActiveWeb3React();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [domainList, setDomainList] = useState<GetDomainsOwnedOrControlledByQuery['domainsControlled'] | undefined>(
    undefined
  );

  const { isLoading, data, isError, isSuccess, isFetching } = useGetDomainsOwnedOrControlledByQuery<
    GetDomainsOwnedOrControlledByQuery,
    Error
  >(
    GraphQlClientDynamic(chainId, GRAPH_ENDPOINT.ENS),
    {
      addressID: address.toLowerCase(),
      searchString: searchString,
      addressString: address.toLowerCase(),
      skip: page * numberOfItemsPerPage,
      first: numberOfItemsPerPage * 2,
    },
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (!data || isError) {
      return;
    }

    const domainsOwned = data?.account?.domainsOwned ?? [];
    const domainsControlled = data?.domainsControlled ?? [];

    // We need to merge the two arrays and remove duplicates
    const allUserDomains = [...domainsOwned, ...domainsControlled];

    const uniqueDomains = allUserDomains.reduce((acc, domain) => {
      // If the domain is already in the array, we don't want to add it again
      const isDomainDuplicate = acc.find((d) => d?.id === domain?.id);
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

    setHasNextPage(uniqueDomains.length > numberOfItemsPerPage);

    setDomainList(uniqueDomains.slice(0, numberOfItemsPerPage));
  }, [isLoading, data, isSuccess, isFetching, isError]);

  console.log('HASNEXT', hasNextPage);
  console.log('ifFetching', isFetching);
  console.log('isLoading', isLoading);
  console.log('passed');

  return {
    data: domainList,
    loading: isLoading || isFetching,
    hasNextPage: hasNextPage || isFetching,
  };
}
