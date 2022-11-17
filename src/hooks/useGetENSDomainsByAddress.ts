import { useEffect, useState } from 'react';
import { GetDomainsOwnedOrControlledByQuery } from '../generated/graphql/ens';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface UserENSDomains {
  data: GetDomainsOwnedOrControlledByQuery['domainsControlled'] | undefined;
  loading: boolean;
  hasNextPage: boolean;
}
const ensQuery = `query getDomainsOwnedOrControlledBy(
  $addressID: ID!
  $addressString: String!
  $searchString: String
  $first: Int
  $skip: Int
  $orderBy: Domain_orderBy
) {
  account(id: $addressID) {
    domainsOwned: domains(
      first: $first
      skip: $skip
      orderBy: $orderBy
      where: { name_contains_nocase: $searchString }
    ) {
      id
      labelName
      labelhash
      name
      parent {
        name
      }
    }
  }
  domainsControlled: domains(
    first: $first
    skip: $skip
    orderBy: $orderBy
    where: { name_contains_nocase: $searchString, owner: $addressString }
  ) {
    id
    labelName
    labelhash
    name
    owner {
      id
    }
  }
}`;

const ensEndpoints = {
  1: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
  3: 'https://api.thegraph.com/subgraphs/name/ensdomains/ensropsten',
  5: 'https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli',
};

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
  const [domainList, setDomainList] = useState<GetDomainsOwnedOrControlledByQuery['domainsControlled'] | undefined>(
    undefined
  );

  const fetchDomains = (searchString?: string) =>
    axios.post(ensEndpoints[1], {
      query: ensQuery,
      variables: {
        // GrahpQL cannot cast ID to String, hence why we need addressID and addressString
        addressID: address.toLowerCase(),
        searchString: searchString,
        addressString: address.toLowerCase(),
        skip: page * numberOfItemsPerPage,
        first: numberOfItemsPerPage,
      },
    });
  const { isLoading, data, isSuccess, isFetching, isError, isPreviousData } = useQuery({
    queryKey: ['domains', searchString, page],
    queryFn: () => fetchDomains(searchString),
    keepPreviousData: true,
  });
  console.log('isLoading', isLoading);
  console.log('datar', data);
  console.log('isPrev', isPreviousData);

  useEffect(() => {
    if (!data || isError) {
      return;
    }

    const queryData = data.data.data;
    console.log('queryData', queryData);
    const domainsOwned = queryData?.account?.domainsOwned ?? [];
    const domainsControlled = queryData?.domainsControlled ?? [];
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

    setDomainList(uniqueDomains);
  }, [isLoading, data, isSuccess, isFetching]);

  return {
    data: domainList,
    loading: isLoading,
    hasNextPage: isPreviousData,
  };
}
