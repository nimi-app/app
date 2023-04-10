import { useMutation, useQuery } from '@tanstack/react-query';

import { getCustomClient } from '../utils';

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
      status: 'active' | 'expired' | 'pending-approval' | 'future' | 'rejected';
    }
  ];
}

const httpClient = getCustomClient(`https://api.iyk.app/`, {});

/**
 * Returns query for fetching twitter data
 */
export function useIYKRefQuery(ref: string | null) {
  const getIykData = async () => {
    const { data } = await httpClient.get<IYKRefStruct>(`/refs/${ref}`);
    return data;
  };

  return useQuery(['fetchIYKRefData', ref], getIykData, {
    retry: false,
    select: (data) => {
      if (data) {
        const { isValidRef, linkedToken, poapEvents } = data;
        // poapEvents[0].status = 'future';
        // console.log('poapEvents', poapEvents);
        return { isValidRef, linkedToken, poapEvents };
      } else return undefined;
    },
    enabled: !!ref,
  });
}

interface MintIykPoapTokenProps {
  otpCode?: string | null;
  recipient?: string | null;
  poapEventId?: string | null;
  deviceId?: string | null;
}

export function useMintIYKPOAPToken() {
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

    const { data } = await httpClient.post<any>(`poap-events/mint`, params, {
      headers,
    });
    return data;
  };

  return useMutation(['fetchIykData'], getIykData);
}
