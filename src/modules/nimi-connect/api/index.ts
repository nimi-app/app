import axios from 'axios';

import { getAPIBaseURL } from '../../api-service';

export interface GetNimiConnectAppJWTParams {
  signature: string;
  ensName: string;
}

export interface CreateNimiConnectSessionResponse {
  token: string;
  expiresAt: string;
  type: 'Bearer';
}

export function getNimiConnectAppJWT({ signature, ensName }: GetNimiConnectAppJWTParams) {
  const url = new URL('/connect/token', getAPIBaseURL());

  return axios
    .post<{
      data: CreateNimiConnectSessionResponse;
    }>(url.toString(), {
      signature,
      ensName,
    })
    .then(({ data }) => data.data);
}
