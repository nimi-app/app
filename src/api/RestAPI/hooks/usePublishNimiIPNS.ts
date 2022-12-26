import { Nimi } from '@nimi.io/card';
import { useMutation } from '@tanstack/react-query';

import { nimiClient } from '../utils';

interface PublishNimiViaIPNSParams {
  /**
   * Chain Id
   */
  chainId: number;
  /**
   * Nimi
   */
  nimi: Nimi;
  /**
   * EIP-712 signature
   */
  signature: string;
  /**
   * Abort controller
   */
  controller?: AbortController;
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
