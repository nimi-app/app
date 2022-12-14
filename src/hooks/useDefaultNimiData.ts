import { Nimi, NimiThemeType } from '@nimi.io/card';
import { useQuery } from '@tanstack/react-query';
import createDebugger from 'debug';
import { useMemo } from 'react';

import { getDeployedPageData, getEnsGeneratedData } from '../api/RestAPI/apiService';
import { useRainbow } from './useRainbow';

const debug = createDebugger('hooks:useDefaultNimiData');

interface UseDefaultNimiData {
  data?: Nimi;
  loading: boolean;
}
/**
 * Returns default data to be displayed on CreateNimipage
 */
export function useDefaultNimiData({ ensName, account }): UseDefaultNimiData {
  const { chainId } = useRainbow();
  const defaultTheme = { type: NimiThemeType.NIMI };

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['fetchDeployedNimiData', ensName],
    queryFn: async () => await getDeployedPageData(ensName),
    select: ({ data }) => {
      if (data.length) {
        const nimi = data[0].nimi as Nimi;
        if (nimi.theme === undefined) {
          nimi.theme = defaultTheme;
        }
        return nimi;
      } else {
        return undefined;
      }
    },
  });

  const {
    data: generatedData,
    isLoading: isLoadingGenerated,
    isSuccess: isGeneratedSuccess,
  } = useQuery({
    queryKey: ['fetchGeneratedData'],
    queryFn: async () => await getEnsGeneratedData(ensName, chainId),
    onError: (errorData) => console.log('generatedError', errorData),
    select: ({ data }) => {
      if (!data.nimi) return undefined;

      data.nimi.theme = defaultTheme;
      return data.nimi as Nimi;
    },
    enabled: data === undefined && isSuccess,
  });
  console.log('enabled', data !== undefined && !isSuccess);

  const NimiObject = useMemo(() => {
    if (isSuccess && data !== undefined && !isLoading && !isError) return data;
    else if (isGeneratedSuccess && generatedData && !isLoadingGenerated) return generatedData;
    else if (!isLoading && !isLoadingGenerated)
      return {
        ensName,
        displayName: ensName,
        addresses: [],
        ensAddress: account,
        links: [],
        widgets: [],
        theme: defaultTheme,
      } as Nimi;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, generatedData, isGeneratedSuccess, isLoading, isLoadingGenerated, isError, isSuccess, account, ensName]);

  return {
    loading: isLoading && isLoadingGenerated,
    data: NimiObject,
  };
}
