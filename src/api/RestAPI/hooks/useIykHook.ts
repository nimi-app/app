import { useQuery } from '@tanstack/react-query';

import { getCustomClient } from '../utils';

interface IykProps {
  code: string | null;
}

interface LinkedToken {
  contractAddress: string;
  chainId: number;
  tokenId: string;
}
interface IYKRefStruct {
  uid: string;
  isValidRef: boolean;
  linkedToken: LinkedToken | undefined;
}

/**
 * Returns query for fetching twitter data
 */
export function useIykHook({ code }: IykProps) {
  const getIykData = async () => {
    const { data } = await getCustomClient(`https://api.iyk.app/`).get<{ data: IYKRefStruct }>(`api/refs/${code}`);
    return data;
  };

  return useQuery(['fetchIykData', code], getIykData);
}
