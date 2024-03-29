import { Nimi, NimiThemeType } from '@nimi.io/card/types';
import { useMemo } from 'react';
import { useEnsAddress } from 'wagmi';

import { useDeployedPageData } from '../api/RestAPI/hooks/useDeployedPageData';
import { useEnsGeneratedData } from '../api/RestAPI/hooks/useEnsGeneratedData';

interface UseInitialNimiData {
  data?: Nimi;
  ipns?: string;
  loading: boolean;
  isGenerated: boolean;
}

interface InitialNimiDataProps {
  ensName: string;
  account?: string;
  injectedTheme?: NimiThemeType;
}
/**
 * Returns default data to be displayed on CreateNimipage
 */
export function useInitialtNimiData({
  ensName,
  account,
  injectedTheme = undefined,
}: InitialNimiDataProps): UseInitialNimiData {
  const defaultTheme = { type: injectedTheme ? injectedTheme : NimiThemeType.NIMI };

  const {
    data: deployedNimi,
    isSuccess: isDeployedSuccess,
    isLoading: isDepoyedLoading,
  } = useDeployedPageData(ensName);

  const shouldRunSecondQuery = deployedNimi === undefined && isDeployedSuccess;
  const {
    data: generatedNimi,
    isSuccess: isGeneratedSuccess,
    isFetching: isGeneratedFetching,
  } = useEnsGeneratedData(ensName, shouldRunSecondQuery);

  const data = useEnsAddress({
    name: ensName,
  });

  const nimiObject = useMemo(() => {
    let nimi: Nimi = {
      ensName,
      displayName: ensName,
      addresses: [],
      ensAddress: data.data as '0x${string}',
      links: [],
      widgets: [],
    };

    if (isDeployedSuccess && deployedNimi?.nimi && !isDepoyedLoading) {
      nimi = deployedNimi.nimi;
    } else if (isGeneratedSuccess && generatedNimi && !isGeneratedFetching) {
      if (injectedTheme) generatedNimi.theme = defaultTheme;
      nimi = generatedNimi;
    }

    if (!(isDepoyedLoading || isGeneratedFetching)) {
      if (!nimi.theme) nimi.theme = defaultTheme;
      return nimi;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    deployedNimi,
    generatedNimi,
    isGeneratedSuccess,
    isDepoyedLoading,
    isGeneratedFetching,
    isDeployedSuccess,
    account,
    data,
    ensName,
  ]);

  return {
    loading: isDepoyedLoading || isGeneratedFetching,
    data: nimiObject,
    isGenerated: shouldRunSecondQuery,
  };
}
