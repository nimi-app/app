import { Nimi } from '@nimi.io/card/types';
import { AxiosError } from 'axios';
import { join } from 'path';

import { getNimiAPIClient } from './utils';

interface NimiSnapshot {
  publisher: string;
  cid: string | null;
  nimi: Nimi;
  createdAt: string;
  updatedAt: string;
  id: string;
}

/**
 * Fetch Nimi IPNS and a Nimi snapshot from the API, if it exists
 * @param client Nimi API client
 * @param ensName ENS name
 * @returns IPNS and Nimi snapshot
 */
export async function fetchNimiIPNS(
  client: ReturnType<typeof getNimiAPIClient>,
  ensName: string,
  chainId: number
): Promise<{
  ipns?: string;
  nimi?: NimiSnapshot;
}> {
  try {
    const { data } = await client.get<{
      data: {
        ipns?: string;
        nimi?: NimiSnapshot;
      };
    }>(`/ens/has-nimi-ipns?name=${ensName}&chainId=${chainId}`);

    return data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const requestURL = join(error?.config?.baseURL as string, error?.config?.url as string);

      if (error.code === 'ECONNREFUSED') {
        throw new Error('Nimi API is reachable. Request URL: ' + requestURL);
      }
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message + '. Request URL: ' + requestURL);
      }
    }
    throw error;
  }
}

/**
 * Generate a Nimi from an ENS name
 * @param client Nimi API client
 * @param ensName ENS name
 * @returns Nimi
 */
export async function generateNimiFromENS(
  client: ReturnType<typeof getNimiAPIClient>,
  ensName: string,
  chainId: number
): Promise<Nimi> {
  try {
    const nimi = await client
      .get<{
        data: {
          nimi: Nimi;
        };
      }>(`/nimi/generate?name=${ensName}&chainId=${chainId}`)
      .then(({ data }) => data.data.nimi);

    return nimi;
  } catch (error) {
    if (error instanceof AxiosError) {
      const requestURL = join(error?.config?.baseURL as string, error?.config?.url as string);
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Nimi API is reachable. Request URL: ' + requestURL);
      }
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message + '. Request URL: ' + requestURL);
      }
    }
    throw error;
  }
}
