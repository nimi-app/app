import axios from 'axios';
import { Nimi } from 'nimi-card';

interface PublishNimiResponse {
  cidV1: string;
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
export function publishNimi(payload: Nimi, controller?: AbortController) {
  return axios
    .post<{
      data: PublishNimiResponse;
    }>(`${process.env.REACT_APP_NIMI_SERVICES_ENDPOINT}/nimi/publish`, payload, {
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
      data: UploadAssets;
    }>(`${process.env.REACT_APP_NIMI_SERVICES_ENDPOINT}/nimi/assets`, formData, config)
    .then(({ data }) => data.data);
}
