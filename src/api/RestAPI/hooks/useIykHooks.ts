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
  poapEvents: [
    {
      id: number;
      otp: string;
    }
  ];
}

/**
 * Returns query for fetching twitter data
 */
export function useIykRefCheck({ code }: IykProps) {
  const getIykData = async () => {
    const { data } = await getCustomClient(`https://api.iyk.app/`).get<{ data: IYKRefStruct }>(`/refs/${code}`);
    return data;
  };

  return useQuery(['fetchIykData', code], getIykData, {
    enabled: !!code,
    select: ({ data }) => {
      if (data) return data;
      else return undefined;
    },
  });
}

interface MintIykPoapTokenProps {
  otpCode: string | null;
  recipient: string | null;
  poapEventId: number | null;
  deviceId: string | null;
}

export function useMintIykPoapToken({ otpCode, recipient, deviceId, poapEventId }: MintIykPoapTokenProps) {
  const getIykData = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'x-iyk-code': otpCode,
    };
    const params = {
      poapEventId,
      recipient,
      deviceId,
    };
    const { data } = await getCustomClient(`https://api.iyk.app/`, headers).post<{ data: IYKRefStruct }>(
      `poap-events/mint`,
      params
    );
    return data;
  };

  return useQuery(['fetchIykData', otpCode, recipient, deviceId], getIykData, {
    enabled: !!otpCode && !!recipient && !!deviceId,
    select: ({ data }) => {
      if (data) return data;
      else return undefined;
    },
  });
}
