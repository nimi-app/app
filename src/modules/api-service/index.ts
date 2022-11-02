import { Nimi } from '@nimi.io/card';
import axios from 'axios';

export type NimiApiVersion = 'v1.4' | 'v1';

/**
 * Returns the base URL for the Nimi API.
 * @param {NimiApiVersion} version - The version of the Nimi API to use. Defaults to the latest version.
 * @returns {string} The base URL for the Nimi API.
 */
export function getAPIBaseURL(version: NimiApiVersion = 'v1.4') {
  if (version === 'v1.4') {
    return process.env.REACT_APP_NIMI_API_BASE_URL_V1_4;
  }

  return process.env.REACT_APP_NIMI_API_BASE_URL as string;
}

export interface RepopulateData {
  id: string;
  name: string;
  labelName: string;
  data?: Nimi;
}

interface INimiByENSName {
  publisher: string;
  cid: string | null;
  cidV1: string | null;
  nimi: Nimi;
  createdAt: string;
  updatedAt: string;
  cidV0: string | null;
  id: string;
}

/**
 * Fetches the Nimi data, if available, for a given ENS name.
 * @param name - The ENS name to fetch the Nimi data for.
 * @returns
 */
export function fetchNimiDataByENSName(name: string) {
  return axios
    .get<{
      data: INimiByENSName[];
    }>(`${process.env.REACT_APP_NIMI_API_BASE_URL}/nimi/by?ens=${name}`)
    .then(({ data }) => data.data[0]);
}
