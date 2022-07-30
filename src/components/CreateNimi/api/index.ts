import axios from 'axios';
import { Nimi } from 'nimi-card';

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

interface UploadAssets {
  IpfsHash: string;
}

/**
 *
 * @param payload the payload from the form
 * @param controller Abort controller
 * @returns A promise with IPFS hash
 */
export function publishNimi(payload: Nimi, controller?: AbortController): Promise<PublishNimiResponse> {
  return axios
    .post<{
      data: PublishNimiApiResponse | PublishNimiApiResponseDeprecated;
    }>(`${process.env.REACT_APP_NIMI_SERVICES_ENDPOINT}/nimi/publish`, payload, {
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
      data: UploadAssets;
    }>(`${process.env.REACT_APP_NIMI_SERVICES_ENDPOINT}/nimi/assets`, formData, config)
    .then(({ data }) => data.data);
}
