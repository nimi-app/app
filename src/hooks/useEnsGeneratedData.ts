import { Nimi } from '@nimi.io/card';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { getAPIBaseURL } from '../modules/api-service';
import { generateID } from '../utils';

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
        const { data } = await axios.get(`${getAPIBaseURL()}/nimi/generate?ensName=${ensName}`);
        const ensDataWithId = data.data.nimi as Nimi;
        if (ensDataWithId.links)
          ensDataWithId.links = ensDataWithId.links.map((item, index) => {
            const generatedId = generateID(index.toString());
            return { ...item, id: generatedId };
          });

        setGeneratedData(ensDataWithId);
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
