import { Nimi, NimiThemeType } from '@nimi.io/card/types';
import { useMemo } from 'react';

import { useDeployedPageData } from '../api/RestAPI/hooks/useDeployedPageData';
import { useEnsGeneratedData } from '../api/RestAPI/hooks/useEnsGeneratedData';

interface UseInitialNimiData {
  data: Nimi;
  loading: boolean;
}
interface InitialNimiDataProps {
  ensName: string;
  account: string;
}
/**
 * Returns default data to be displayed on CreateNimipage
 */
export function useInitialtNimiData({ ensName, account }: InitialNimiDataProps): UseInitialNimiData {
  const defaultTheme = { type: NimiThemeType.NIMI };

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

  const nimiObject = useMemo(() => {
    let nimi: Nimi = {
      ensName,
      displayName: ensName,
      addresses: [],
      ensAddress: account,
      links: [],
      widgets: [],
    };

    if (!nimi.theme) nimi.theme = defaultTheme;

    if (isDeployedSuccess && deployedNimi && !isDepoyedLoading) nimi = deployedNimi.nimi;
    else if (isGeneratedSuccess && generatedNimi && !isGeneratedFetching) nimi = generatedNimi;

    return nimi;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    deployedNimi,
    generatedNimi,
    isGeneratedSuccess,
    isDepoyedLoading,
    isGeneratedFetching,
    isDeployedSuccess,
    account,
    ensName,
  ]);

  return {
    loading: isDepoyedLoading || isGeneratedFetching,
    data: nimiObject,
  };
}
