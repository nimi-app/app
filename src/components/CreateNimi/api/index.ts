import axios from 'axios';
import { Nimi } from '@nimi.io/card';
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

/**
 *
 * @param payload the payload from the form
 * @param controller Abort controller
 * @returns A promise with IPFS hash
 */
export function publishNimi(payload: Nimi, controller?: AbortController): Promise<PublishNimiResponse> {
  const url = new URL('/nimi/publish', getAPIBaseURL());

  return axios
    .post<{
      data: PublishNimiApiResponse | PublishNimiApiResponseDeprecated;
    }>(url.toString(), payload, {
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
  nimi,
  signature,
  controller,
}: PublishNimiViaIPNSParams): Promise<PublishNimiViaIPNSResponse> {
  return axios
    .post<{
      data: PublishNimiViaIPNSResponse;
    }>(
      `${process.env.REACT_APP_NIMI_API_BASE_URL}/nimi/publish/ipns`,
      {
        nimi,
        signature,
      },
      {
        signal: controller ? controller.signal : undefined,
      }
    )
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
    }>(`${process.env.REACT_APP_NIMI_API_BASE_URL_V1_4}/nimi/assets`, formData, config)
    .then(({ data }) => data.data);
}
