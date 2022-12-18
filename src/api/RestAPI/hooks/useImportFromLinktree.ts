import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { baseClient, formatLinktreeData } from '../utils';

interface ImportFromLinktree {
  linktreeUrl: string;
  enabled?: boolean;
  onSuccess?: (data: void) => void;
}

export type LinktreeData = {
  type: string;
  title: string;
  content: string;
};

/**
 * Returns query for fetching data generated from ens name
 */
export function useImportFromLinktree({ linktreeUrl, enabled = false, onSuccess }: ImportFromLinktree) {
  const getLinktreeData = async (linktreeUrl: string) => {
    const params = {
      url: linktreeUrl,
    };
    const { data } = await baseClient.get<{ data: LinktreeData[] }>('/nimi/import', {
      params,
    });
    return data;
  };

  return useQuery(['fetchLinktreeUsername', linktreeUrl], async () => await getLinktreeData(linktreeUrl), {
    select: ({ data }) => formatLinktreeData(data),
    enabled,
    onError: (err: AxiosError) => err,
    onSuccess,
  });
}
