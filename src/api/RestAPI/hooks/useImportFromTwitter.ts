import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getNimiAPIClient } from '../utils';

interface ImportFromTwitter {
  twitterUsername: string;
  enabled?: boolean;
  onSuccess?: (data: TwitterData) => void;
}

export interface TwitterData {
  _id: string;
  username: string;
  createdAt: string;
  deleted: boolean;
  description: string;
  followersCount: number;
  followingCount: number;
  location: string;
  name: string;
  profileImageUrl: string;
  protected: boolean;
  twitterId: string;
  updatedAt: string;
  url: string;
  verified: boolean;
  id: string;
}

/**
 * Returns query for fetching twitter data
 */
export function useImportFromTwitter({ twitterUsername, enabled = false, onSuccess }: ImportFromTwitter) {
  const getTwitterData = async () => {
    const params = {
      username: twitterUsername,
    };
    const { data } = await getNimiAPIClient().get<{ data: TwitterData }>('/twitter/info', {
      params,
    });
    return data;
  };

  return useQuery(['fetchLinktreeUsername', twitterUsername], getTwitterData, {
    select: ({ data }) => data,
    enabled,
    onError: (err: AxiosError) => err,
    onSuccess,
  });
}
