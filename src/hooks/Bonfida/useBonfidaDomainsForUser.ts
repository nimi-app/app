import { getAllDomains, NameRegistryState, performReverseLookupBatch } from '@bonfida/spl-name-service';

import { useEffect, useRef, useState } from 'react';

interface Result {
  pubkey: any;
  registry: NameRegistryState;
  reverse: string;
}

/**
 * This hook can be used to retrieve all the domains of a user
 * @param user The user to search domains for
 * @returns
 */
export const useDomainsForUser = (user) => {
  const [result, setResult] = useState<Result[] | undefined>(undefined);
  const mounted = useRef(true);

  useEffect(() => {
    const fn = async () => {
      if (window.solana) {
        const connection = window.solana;
        const domains = await getAllDomains(connection, user);
        const registries = await NameRegistryState.retrieveBatch(connection, [...domains]);
        const reverses = await performReverseLookupBatch(connection, [...domains]);
        const _result: Result[] = [];
        for (let i = 0; i < domains.length; i++) {
          _result.push({
            pubkey: domains[i],
            registry: registries[i]!,
            reverse: reverses[i]!,
          });
        }
        if (mounted.current) {
          setResult(_result);
        }

        return () => (mounted.current = false);
      }
    };

    fn().catch(console.error);
  }, [user.toBase58()]);

  return result;
};
