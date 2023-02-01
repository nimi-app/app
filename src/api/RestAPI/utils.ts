import { NimiLinkBaseDetails } from '@nimi.io/card/types';
import axios from 'axios';
import { CID } from 'multiformats/cid';

import { ENSMetadata } from './hooks/useEnsMetadataImage';
import { LinktreeData } from './hooks/useImportFromLinktree';
import { generateID, guessLinkTypeBasedOnUrl } from '../../utils';
/**
 * Returns the base URL for the Nimi API.
 * @returns {string} The base URL for the Nimi API.
 */
export function getAPIBaseURL() {
  // If the NIMI_API_BASE_URL is not set, throw an error.
  if (!process.env.NIMI_API_BASE_URL) {
    throw new Error('NIMI_API_BASE_URL is not set.');
  }

  if (
    process.env.NIMI_API_DEV_BASE_URL &&
    (process.env.NODE_ENV === 'development' || process.env.APP_ENV === 'development')
  ) {
    return process.env.NIMI_API_DEV_BASE_URL;
  }

  return process.env.NIMI_API_BASE_URL as string;
}

export const nimiClient = axios.create({
  baseURL: getAPIBaseURL(),
});

/**
 * Returns the POAP API client.
 * @returns
 */
export function getPOAPAPIClient() {
  if (!process.env.POAP_API_KEY) {
    throw new Error('POAP_API_KEY is not set.');
  }

  return axios.create({
    baseURL: 'https://api.poap.tech',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.POAP_API_KEY,
    },
  });
}

const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';

function isCID(hash: string) {
  try {
    if (typeof hash === 'string') {
      return Boolean(CID.parse(hash));
    }
    return Boolean(CID.asCID(hash));
  } catch (e) {
    return false;
  }
}

export function formatEnsMetadataImage(ensData: ENSMetadata) {
  console.log('ensMeta', ensData);
  if ('image' in ensData && ensData.image) {
    let imageUrl: string | undefined;
    if (ensData.image.startsWith('ipfs://ipfs/')) {
      imageUrl = ensData.image.replace('ipfs://ipfs/', IPFS_GATEWAY);
    } else if (ensData.image.startsWith('ipfs://')) {
      imageUrl = ensData.image.replace('ipfs://', IPFS_GATEWAY);
    } else if (ensData.image.startsWith('ipfs/')) {
      imageUrl = ensData.image.replace('ipfs/', IPFS_GATEWAY);
    } else if (isCID(ensData.image)) {
      imageUrl = `${IPFS_GATEWAY}${ensData.image}`;
    } else {
      imageUrl = ensData.image;
    }
    return imageUrl;
  } else return undefined;
}

export function formatLinktreeData(data: LinktreeData[]) {
  return data.map(({ content, title }) => {
    const guessLinkType = guessLinkTypeBasedOnUrl(content);
    return { type: guessLinkType, title, content, id: generateID() } as NimiLinkBaseDetails;
  });
}
