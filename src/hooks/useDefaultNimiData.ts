import { Nimi, NimiThemeType } from '@nimi.io/card';
import createDebugger from 'debug';
import { useMemo } from 'react';

import { useDeployedPageData } from '../api/RestAPI/hooks/useDeployedPageData';
import { useEnsGeneratedData } from '../api/RestAPI/hooks/useEnsGeneratedData';

const debug = createDebugger('hooks:useDefaultNimiData');

interface UseInitialNimiData {
  data?: Nimi;
  loading: boolean;
}
interface InitialDataProps {
  ensName: string;
  account?: string;
}
/**
 * Returns default data to be displayed on CreateNimipage
 */
export function useInitialtNimiData({ ensName, account }: InitialDataProps): UseInitialNimiData {
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
    if (!account) return undefined;
    let nimi: Nimi = {
      ensName,
      displayName: ensName,
      addresses: [],
      ensAddress: account,
      links: [],
      widgets: [],
    };

    if (isDeployedSuccess && deployedNimi && !isDepoyedLoading) nimi = deployedNimi.nimi;
    else if (isGeneratedSuccess && generatedNimi && !isGeneratedFetching) nimi = generatedNimi;

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
    ensName,
  ]);

  debug({ NimiObject: nimiObject });

  return {
    loading: isDepoyedLoading || isGeneratedFetching,
    data: nimiObject,
  };
}
