import { getAllDomains, NameRegistryState, performReverseLookupBatch } from '@bonfida/spl-name-service';

import { useEffect, useRef, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react/lib/cjs';

interface Result {
  pubkey: any;
  registry: NameRegistryState;
  reverse: string;
}

/**
 * This hook can be used to retrieve all the domains of a user
 * @returns
 */
export const useDomainsForUser = () => {
  const [result, setResult] = useState<Result[] | undefined>(undefined);
  const mounted = useRef(true);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    const fn = async () => {
      try {
        if (publicKey) {
          console.log('eere');
          const domains = await getAllDomains(connection, publicKey);
          console.log('eere');
          const registries = await NameRegistryState.retrieveBatch(connection, [...domains]);
          console.log('eere');
          const reverses = await performReverseLookupBatch(connection, [...domains]);
          console.log('eere');

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
  }, [publicKey]);

  return result;
};
