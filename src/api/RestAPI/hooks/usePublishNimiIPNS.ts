import { Nimi } from '@nimi.io/card/types';
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

const postUserData = async (params: PublishNimiViaIPNSParams) => {
  const { data } = await nimiClient.post<{
    data: PublishNimiIPNSResponse;
  }>('/nimi/publish/ipns', params);
  return data.data;
};

/**
 * Returns mutation for getting IPNS hash
 */
export function usePublishNimiIPNS() {
  return useMutation(['publishNimiIPNS'], postUserData);
}
