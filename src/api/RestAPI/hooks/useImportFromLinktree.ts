import { Nimi } from '@nimi.io/card/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { formatLinktreeData, getNimiAPIClient } from '../utils';

interface ImportFromLinktree {
  linktreeUrl: string;
  enabled?: boolean;
  onSuccess: (data?: Nimi) => void;
}

export type LinktreeData = {
  type: string;
  title: string;
  content: string;
};

export async function fetcher(linktreeURL: string) {
  return getNimiAPIClient()
    .get<{ data: Nimi }>('/nimi/import', {
      params: {
        url: linktreeURL,
      },
    })
    .then((res) => res.data.data);
}

/**
 * Returns query for fetching linktree data
 */
export function useImportFromLinktree({ linktreeUrl, enabled = false, onSuccess }: ImportFromLinktree) {
  return useQuery(['fetchLinktreePage', linktreeUrl], () => fetcher(linktreeUrl), {
    select: (nimi) => ({
      ...nimi,
      links: formatLinktreeData(nimi.links as LinktreeData[]),
    }),
    enabled,
    onError: (err: AxiosError) => err,
    onSuccess,
  });
}
