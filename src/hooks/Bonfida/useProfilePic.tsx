import { useEffect, useRef, useState } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';

import { getPicRecord } from '@bonfida/spl-name-service';

export const useProfilePic = (domain) => {
  const { connection } = useConnection();

  const [result, setResult] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const mounted = useRef(true);

  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true);
        if (!domain) {
          setLoading(false);
          return setResult(undefined);
        }

        const registry = await getPicRecord(connection, domain);

        if (!registry.data) {
          return setResult(undefined);
        }

        if (mounted.current) {
          setResult(registry.data.toString('utf-8'));
        }
        setLoading(false);
        return () => (mounted.current = false);
      } catch (e) {
        setLoading(false);
        console.error(e);
      }
    };

    fn().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain, domain]);

  return { result, loading };
};
