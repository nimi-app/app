import { useMutation } from '@tanstack/react-query';

import { nimiClient } from '../utils';

interface PublishNimiApiResponse {
  cidV1: string;
}

/**
 * Returns mutation for uploading images to ipfs
 */
export function useUploadImageToIPFS() {
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'content-type': file.type,
      },
    };

    const { data } = await nimiClient.post<{
      data: PublishNimiApiResponse;
    }>('/nimi/publish/ipns', formData, config);
    return data.data;
  };

  return useMutation(['uploadImageToIpfs'], uploadImage);
}
