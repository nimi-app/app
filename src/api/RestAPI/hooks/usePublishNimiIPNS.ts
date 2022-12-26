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
 * Returns query for fetching poaps user owns
 */
export function usePublishNimiIPNS(params: PublishNimiViaIPNSParams) {
  const postUserData = async () => {
    const { data } = await nimiClient.post<PublishNimiIPNSResponse>('/nimi/publish/ipns', params);
    return data;
  };

  return useMutation(['publishNimiIPNS'], postUserData);
}
