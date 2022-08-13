/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getAllDomains, NameRegistryState, performReverseLookupBatch } from '@bonfida/spl-name-service';

import { useEffect, useRef, useState } from 'react';
import { useSolana } from '../../context/SolanaProvider';
import { useConnection } from '@solana/wallet-adapter-react';

export interface BonfidaUserData {
  pubkey: any;
  registry: NameRegistryState;
  reverse: string;
}

/**
 * This hook can be used to retrieve all the domains of a user
 * @param user The user to search domains for
 * @returns
 */
export const useDomainsForUser = () => {
  const [result, setResult] = useState<BonfidaUserData[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);
  const { publicKey } = useSolana();
  const { connection } = useConnection();
  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true);
        if (window.solana && publicKey) {
          const domains = await getAllDomains(connection, publicKey);
          const registries = await NameRegistryState.retrieveBatch(connection, [...domains]);
          const reverses = await performReverseLookupBatch(connection, [...domains]);
          const _result: BonfidaUserData[] = [];
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
          setLoading(false);
          return () => (mounted.current = false);
        }
      } catch (e) {
        setLoading(false);
        console.log('error');
      }
    };

    fn().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  return { result, loading };
};
