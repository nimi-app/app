import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getAPIBaseURL } from '../modules/api-service';

export function useNimiData(name: string, isInView: boolean) {
  const getNimiData = async () => {
    const { data } = await axios.get(`${getAPIBaseURL()}/nimi/by?ens=${name}`);

    return data?.data?.[0];
  };

  return useQuery(['nimi-data', name], getNimiData, {
    enabled: !!name && isInView,
  });
}
