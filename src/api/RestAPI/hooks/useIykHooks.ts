import { useMutation, useQuery } from '@tanstack/react-query';

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
  poapEvents: [
    {
      id: number;
      otp: string;
      poapEventId: string;
    }
  ];
}

/**
 * Returns query for fetching twitter data
 */
export function useIykRefCheck({ code }: IykProps) {
  const getIykData = async () => {
    if (!code) return undefined;
    const { data } = await getCustomClient(`https://api.iyk.app/`, {}).get<IYKRefStruct>(`/refs/${code}`);
    return data;
  };

  return useQuery(['fetchIykData', code], getIykData, {
    retry: false,
  });
}

interface MintIykPoapTokenProps {
  otpCode?: string | null;
  recipient?: string | null;
  poapEventId?: string | null;
  deviceId?: string | null;
}

export function useMintIykPoapToken() {
  const getIykData = async ({ otpCode, recipient, deviceId, poapEventId }: MintIykPoapTokenProps) => {
    if (!otpCode || !recipient || !poapEventId) return undefined;
    const headers = {
      'Content-Type': 'application/json',
      'x-iyk-code': otpCode,
    };
    const params = {
      poapEventId,
      recipient,
      deviceId,
    };
    const { data } = await getCustomClient(`https://api.iyk.app/`, headers).post<any>(`poap-events/mint`, params);
    return data;
  };

  return useMutation(['fetchIykData'], getIykData);
}
