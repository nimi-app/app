import { Nimi } from '@nimi.io/card';
import axios from 'axios';

export type NimiApiVersion = 'v1.4' | 'v1';

/**
 * Returns the base URL for the Nimi API.
 * @returns {string} The base URL for the Nimi API.
 */
export function getAPIBaseURL() {
  if (!process.env.REACT_APP_NIMI_API_BASE_URL || process.env.REACT_APP_ENV === 'production') {
    throw new Error('REACT_APP_NIMI_API_BASE_URL is not set.');
  } else if (
    !process.env.NODE_ENV ||
    process.env.NODE_ENV === 'development' ||
    process.env.REACT_APP_ENV === 'development'
  ) {
    return process.env.REACT_APP_NIMI_API_DEV_BASE_URL;
  } else {
    return process.env.REACT_APP_NIMI_API_BASE_URL as string;
  }
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

/**
 *
 */
export async function fetchGeneratedNimi(ensName: string) {
  const { data } = await axios.get<{
    data: {
      nimi: Nimi;
    };
  }>(`${getAPIBaseURL()}/nimi/generate?ensName=${ensName}`);

  return data.data.nimi;
}
