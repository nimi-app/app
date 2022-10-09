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
      setLoading(true);

      const data = await axios.get(`${process.env.REACT_APP_NIMI_API_BASE_URL}/nimi/generated?ens=${ensName}`);
      console.log('data', data);

      setLoading(false);
    }
    if (ensName) fetchEnsData();
  }, [ensName]);

  return {
    loading,
    generatedData,
  };
}
