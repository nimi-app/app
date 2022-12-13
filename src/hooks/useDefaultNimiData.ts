import { Nimi, NimiThemeType } from '@nimi.io/card';
import { useQuery } from '@tanstack/react-query';
import createDebugger from 'debug';
import { useMemo } from 'react';

import RestApiRequest from '../api/RestAPI/restApiClient';

const debug = createDebugger('hooks:useDefaultNimiData');

interface UseDefaultNimiData {
  data?: Nimi;
  loading: boolean;
}
/**
 * Returns default data to be displayed on CreateNimipage
 */
export function useDefaultNimiData({ ensName }): UseDefaultNimiData {
  const restClient = new RestApiRequest();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['fetchDeployedNimiData', ensName],
    queryFn: async () => await restClient.getDeployedPageData(ensName),
    select: ({ data }) => (data[0] ? (data[0].Nimi as Nimi) : undefined),
  });

  const {
    data: generatedData,
    isLoading: isLoadingGenerated,
    isSuccess: isGeneratedSuccess,
  } = useQuery({
    queryKey: ['fetchGenratedData'],
    queryFn: async () => await restClient.getEnsGeneratedData(ensName),
    onError: (errorData) => console.log('generatedError', errorData),
    select: ({ data }) => {
      const defaultTheme = { type: NimiThemeType.NIMI };
      data.nimi.theme = defaultTheme;
      return data.nimi as Nimi;
    },
    enabled: data === undefined && isSuccess,
  });

  const NimiObject = useMemo(() => {
    console.log('first data', data);
    console.log('generatedData', generatedData);

    if (isSuccess && data !== undefined && !isLoading) return data;
    else if (isGeneratedSuccess && generatedData && !isLoadingGenerated) return generatedData;
    else return undefined;
  }, [data, generatedData, isGeneratedSuccess, isLoading, isLoadingGenerated, isSuccess]);

  return {
    loading: isLoading && isLoadingGenerated,
    data: NimiObject,
  };
}
