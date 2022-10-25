import { Nimi } from '@nimi.io/card';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { generateID } from '../utils';
import { useGetENSDomainsByAddress } from './useGetENSDomainsByAddress';

export interface RepopulateData {
  id: string;
  name: string;
  labelName: string;
  data?: Nimi;
}

interface INimiByENSName {
  publisher: string;
  cid: string | null;
  cidV1: string | null;
  nimi: Nimi;
  createdAt: string;
  updatedAt: string;
  cidV0: string | null;
  id: string;
}

export function fetchNimiDataByENSName(name: string) {
  return axios
    .get<{
      data: INimiByENSName[];
    }>(`${process.env.REACT_APP_NIMI_API_BASE_URL}/nimi/by?ens=${name}`)
    .then(({ data }) => data.data[0]);
}

export function useDomainsData(address: string) {
  const [mainLoader, setMainLoader] = useState(false);
  const [domainArray, setDomainArray] = useState<RepopulateData[]>([]);
  const [emptyDomainArray, setEmptyDomainArray] = useState<RepopulateData[]>([]);

  const { data: domains, loading } = useGetENSDomainsByAddress(address);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!domains) {
          return;
        }

        setMainLoader(true);

        /**
         * @todo This is a temporary solution to get the data from the Nimi API. It's inefficient and should be replaced with a GraphQL query.
         */
        const ensNameNimi = await Promise.allSettled(
          domains.map(async (domain) => fetchNimiDataByENSName(domain.name as string))
        );

        console.log(ensNameNimi);

        const domainArray: RepopulateData[] = [];
        const emptyDomainArray: RepopulateData[] = [];

        ensNameNimi.forEach((item, index) => {
          const { id, name, labelName } = domains[index];

          const domain = {
            id,
            name,
            labelName,
            data: {},
          } as RepopulateData;

          if (item.status === 'fulfilled' && item.value) {
            const { nimi } = item.value;

            // Add ID to the Nimi links
            nimi.links = nimi?.links?.map((link, index) => ({
              ...link,
              label: undefined,
              id: generateID(index.toString()),
            }));

            domain.data = nimi;
            domainArray.push(domain);
          } else {
            emptyDomainArray.push(domain);
          }
        });

        setDomainArray(domainArray);
        setEmptyDomainArray(emptyDomainArray);
      } catch (e) {
        console.log('error', e);
      } finally {
        setMainLoader(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domains, loading]);

  return { domainArray, emptyDomainArray, loading: loading || mainLoader };
}
