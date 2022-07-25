import axios from 'axios';
import { Nimi } from 'nimi-card';

interface PublishNimiResponse {
  cidV1: string;
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
