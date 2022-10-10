import { useEffect, useState } from 'react';
import { Nimi } from '@nimi.io/card';
import axios from 'axios';

export interface UseEnsGeneratedData {
  generatedData?: Nimi;
  loading: boolean;
}

/**
 * Return Nimi object with ens data
 */
export function useEnsGeneratedData({ ensName }): UseEnsGeneratedData {
  const [generatedData, setGeneratedData] = useState<Nimi>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchEnsData() {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://api-dev.nimi.io/v1.4/nimi/generate?ensName=${ensName}`);
        console.log('data', data);
        setGeneratedData(data.data.nimi);
      } catch (e) {
        console.log('generated api error', e);
      } finally {
        setLoading(false);
      }
    }
    if (ensName) fetchEnsData();
  }, [ensName]);

  return {
    loading,
    generatedData,
  };
}
