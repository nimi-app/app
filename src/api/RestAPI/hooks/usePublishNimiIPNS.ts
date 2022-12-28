import { Nimi } from '@nimi.io/card';
import { useMutation } from '@tanstack/react-query';

import { nimiClient } from '../utils';

interface PublishNimiViaIPNSParams {
  chainId: number;
  nimi: Nimi;
  signature: string;
}

interface PublishNimiIPNSResponse {
  cidV1: string;
  ipns: string;
}

/**
 * Returns mutation for getting IPNS hash
 */
export function usePublishNimiIPNS() {
  const postUserData = async (params: PublishNimiViaIPNSParams) => {
    const { data } = await nimiClient.post<{
      data: PublishNimiIPNSResponse;
    }>('/nimi/publish/ipns', params);
    return data.data;
  };

  return useMutation(['publishNimiIPNS'], postUserData);
}
