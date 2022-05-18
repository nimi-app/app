import { useENSMetadata } from './useENSMetadata';

export interface UseENSAvatarResult {
  loading: boolean;
  avatar?: string;
}

/**
 * Does a lookup for an ENS name to find its avatar details, uses ENS Domains metadata API
 */
export function useENSAvatar(): UseENSAvatarResult {
  const { data, loading } = useENSMetadata();

  return {
    loading,
    avatar: data?.image,
  };
}
