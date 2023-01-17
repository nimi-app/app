import { Nimi } from '@nimi.io/card/types';
import { useMutation } from '@tanstack/react-query';

import { nimiClient } from '../utils';

export interface PublishNimiViaIPNSParams {
  chainId: number;
  nimi: Nimi;
}

type UpdateNimiViaIPNSParams = PublishNimiViaIPNSParams & {
  signature: string;
};

interface PublishNimiIPNSResponse {
  cid: string;
  ipns: string;
}

const postUserData = async (params: PublishNimiViaIPNSParams) => {
  const { data } = await nimiClient.post<{
    data: PublishNimiIPNSResponse;
  }>('/nimi/publish/ipns', params);
  return data.data;
};

const updateNimiIPNS = async (params: UpdateNimiViaIPNSParams) => {
  const { data } = await nimiClient.put<{
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

/**
 * Returns mutation for getting IPNS hash
 */
export function useUpdateNimiIPNS() {
  return useMutation(['updateNimiIPNS'], updateNimiIPNS);
}
