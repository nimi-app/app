import { Nimi } from '@nimi.io/card/types';
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
  ensName: string
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
    }>(`/ens/has-nimi-ipns?name=${ensName}`);

    return data.data;
  } catch (error) {
    const requestURL = join(error.config.baseURL, error.config.url);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message + '. Request URL: ' + requestURL);
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
export async function generateNimiFromENS(client: ReturnType<typeof getNimiAPIClient>, ensName: string): Promise<Nimi> {
  try {
    const nimi = await client
      .get<{
        data: {
          nimi: Nimi;
        };
      }>(`/nimi/generate?name=${ensName}`)
      .then(({ data }) => data.data.nimi);

    return nimi;
  } catch (error) {
    const requestURL = join(error.config.baseURL, error.config.url);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message + '. Request URL: ' + requestURL);
    }
    throw error;
  }
}
