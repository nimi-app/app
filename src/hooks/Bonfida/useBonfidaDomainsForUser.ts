import { getAllDomains, NameRegistryState, performReverseLookupBatch } from '@bonfida/spl-name-service';

import { useEffect, useRef, useState } from 'react';
import { useSolana } from '../../context/SolanaProvider';

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
  const { connection } = useSolana();

  useEffect(() => {
    const fn = async () => {
      try {
        const wallet = window.solana.publicKey;
        console.log('solana', window.solana);
        console.log('wallet', wallet);
        console.log('connection', connection);
        if (window.solana && wallet) {
          const domains = await getAllDomains(connection, wallet);
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
          console.log('result', result);
          if (mounted.current) {
            setResult(_result);
          }

          return () => (mounted.current = false);
        }
      } catch (e) {
        console.log('error');
      }
    };

    fn().catch(console.error);
  }, [user]);

  return result;
};
