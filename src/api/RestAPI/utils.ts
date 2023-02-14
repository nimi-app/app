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
  const prodkey = 'REACT_APP_NIMI_API_BASE_URL';
  const prodValue = process.env[prodkey];

  if (!prodValue || prodValue === '') {
    throw new Error(`${prodkey} is not set.`);
  }

  const devKey = 'REACT_APP_NIMI_API_DEV_BASE_URL';
  if (process.env[devKey] && process.env.REACT_APP_ENV === 'development') {
    return process.env[devKey];
  }

  return prodValue;
}

export function getNimiAPIClient() {
  return axios.create({
    baseURL: getAPIBaseURL(),
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
