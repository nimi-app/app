import { Nimi, NimiThemeType } from '@nimi.io/card';
import { useQuery } from '@tanstack/react-query';
import createDebugger from 'debug';
import { useMemo } from 'react';

import { getDeployedPageData, getEnsGeneratedData } from '../api/RestAPI/apiService';
import { useRainbow } from './useRainbow';

const debug = createDebugger('hooks:useDefaultNimiData');

interface UseInitialNimiData {
  data?: Nimi;
  loading: boolean;
}
/**
 * Returns default data to be displayed on CreateNimipage
 */
export function useInitialtNimiData({ ensName, account }): UseInitialNimiData {
  const { chainId } = useRainbow();
  const defaultTheme = { type: NimiThemeType.NIMI };

  const {
    data: deployedNimi,
    isSuccess: isDeployedSuccess,
    isLoading: isDepoyedLoading,
  } = useQuery({
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
    data: generatedNimi,
    isSuccess: isGeneratedSuccess,
    isLoading: isGeneratedLoading,
  } = useQuery({
    queryKey: ['fetchGeneratedData'],
    queryFn: async () => await getEnsGeneratedData(ensName, chainId),
    select: ({ data }) => {
      if (!data.nimi) return undefined;

      data.nimi.theme = defaultTheme;
      return data.nimi as Nimi;
    },
    enabled: deployedNimi === undefined && isDeployedSuccess,
  });

  const nimiObject = useMemo(() => {
    if (isDeployedSuccess && deployedNimi && !isDepoyedLoading) return deployedNimi;
    else if (isGeneratedSuccess && generatedNimi && !isGeneratedLoading) return generatedNimi;
    else if (!isDepoyedLoading && !isGeneratedLoading)
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
  }, [
    deployedNimi,
    generatedNimi,
    isGeneratedSuccess,
    isDepoyedLoading,
    isGeneratedLoading,
    isDeployedSuccess,
    account,
    ensName,
  ]);

  debug({ NimiObject: nimiObject });

  return {
    loading: isDepoyedLoading || isGeneratedLoading,
    data: nimiObject,
  };
}
