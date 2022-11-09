import { useEffect, useState } from 'react';
import { GetDomainsOwnedOrControlledByQuery, useGetDomainsOwnedOrControlledByQuery } from '../generated/graphql/ens';

export interface UserENSDomains {
  data: GetDomainsOwnedOrControlledByQuery['domainsControlled'] | undefined;
  loading: boolean;
}

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
export function useGetENSDomainsByAddress(address: string, searchString?: string): UserENSDomains {
  const [domainList, setDomainList] = useState<GetDomainsOwnedOrControlledByQuery['domainsControlled'] | undefined>(
    undefined
  );
  console.log('string', searchString);

  const query = useGetDomainsOwnedOrControlledByQuery({
    variables: {
      // GrahpQL cannot cast ID to String, hence why we need addressID and addressString
      addressID: address.toLowerCase(),
      searchString: searchString,
      addressString: address.toLowerCase(),
      skip: 0,
      first: 9,
    },
  });

  useEffect(() => {
    if (!query.data) {
      return;
    }

    const domainsOwned = query.data?.account?.domainsOwned ?? [];
    const domainsControlled = query.data?.domainsControlled ?? [];
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
  }, [query.loading, query.data]);

  return {
    data: domainList,
    loading: query.loading,
  };
}
