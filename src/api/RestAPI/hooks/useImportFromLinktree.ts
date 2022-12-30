import { NimiLinkBaseDetails } from '@nimi.io/card';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { formatLinktreeData, nimiClient } from '../utils';

interface ImportFromLinktree {
  linktreeUrl: string;
  enabled?: boolean;
  onSuccess: (data?: NimiLinkBaseDetails[]) => void;
}

export type LinktreeData = {
  type: string;
  title: string;
  content: string;
};

/**
 * Returns query for fetching linktree data
 */
export function useImportFromLinktree({ linktreeUrl, enabled = false, onSuccess }: ImportFromLinktree) {
  const getLinktreeData = async () => {
    const params = {
      url: linktreeUrl,
    };
    const { data } = await nimiClient.get<{ data: LinktreeData[] }>('/nimi/import', {
      params,
    });
    return data;
  };

  return useQuery(['fetchLinktreeUsername', linktreeUrl], getLinktreeData, {
    select: ({ data }) => formatLinktreeData(data),
    enabled,
    onError: (err: AxiosError) => err,
    onSuccess: (data: NimiLinkBaseDetails[]) => onSuccess(data),
  });
}
