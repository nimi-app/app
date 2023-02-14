import { useMutation } from '@tanstack/react-query';

import { getNimiAPIClient } from '../utils';

interface PublishNimiApiResponse {
  cidV1: string;
}

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const config = {
    headers: {
      'content-type': file.type,
    },
  };

  const { data } = await getNimiAPIClient().post<{
    data: PublishNimiApiResponse;
  }>('/assets', formData, config);
  return data.data;
};

/**
 * Returns mutation for uploading images to ipfs
 */
export function useUploadImageToIPFS() {
  return useMutation(['uploadImageToIpfs'], uploadImage);
}
