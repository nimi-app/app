import { Nimi } from '@nimi.io/card';
import axios from 'axios';

import { getAPIBaseURL } from '../../../modules/api-service';

interface PublishNimiApiResponseDeprecated {
  IpfsHash: string;
  PinSize: string;
  Timestamp: string;
}

interface PublishNimiApiResponse {
  cidV1: string;
}

interface PublishNimiResponse {
  cidVersion: number;
  cid: string;
}

interface PublishNimiParams {
  nimi: Nimi;
  chainId: number;
  controller?: AbortController;
}
/**
 *
 * @param payload the payload from the form
 * @param controller Abort controller
 * @returns A promise with IPFS hash
 */
export function publishNimi({ controller, ...data }: PublishNimiParams): Promise<PublishNimiResponse> {
  const url = new URL('/nimi/publish', getAPIBaseURL());

  return axios
    .post<{
      data: PublishNimiApiResponse | PublishNimiApiResponseDeprecated;
    }>(url.toString(), data, {
      signal: controller ? controller.signal : undefined,
    })
    .then(({ data }) => {
      if ((data.data as PublishNimiApiResponse).cidV1) {
        return {
          cidVersion: 1,
          cid: (data.data as PublishNimiApiResponse).cidV1,
        } as any;
      }

      return {
        cidVersion: 0,
        cid: (data.data as PublishNimiApiResponseDeprecated).IpfsHash,
      };
    });
}

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

interface PublishNimiViaIPNSResponse {
  cidV1: string;
  ipns: string;
}

/**
 *
 * @param payload the payload from the form
 * @param controller Abort controller
 * @returns A promise with IPFS hash
 */
export function publishNimiViaIPNS({
  controller,

  ...data
}: PublishNimiViaIPNSParams): Promise<PublishNimiViaIPNSResponse> {
  return axios
    .post<{
      data: PublishNimiViaIPNSResponse;
    }>(`${getAPIBaseURL()}/nimi/publish/ipns`, data, {
      signal: controller ? controller.signal : undefined,
    })
    .then(({ data }) => data.data);
}

/**
 *
 * @param file file that is uploaded by user
 * @returns A promise with IPFS hash
 */
export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    headers: {
      'content-type': file.type,
    },
  };
  return axios
    .post<{
      data: PublishNimiApiResponse;
    }>(`${getAPIBaseURL()}/nimi/assets`, formData, config)
    .then(({ data }) => data.data);
}
