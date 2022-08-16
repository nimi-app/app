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
    }>(`https://api.nimi.io/v1.5/nimi/publish`, payload, {
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
