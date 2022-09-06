import axios from 'axios';
import { useEffect, useState } from 'react';

import { useGetDomainsQuery } from '../generated/graphql/ens';

interface DomainDataType {
  id: string;
  name?: string;
  labelName?: string;
  data?: any;
}

export function useDomainsData(address: string) {
  const [mainLoader, setMainLoader] = useState(false);
  const [domainArray, setDomainArray] = useState<DomainDataType[]>([]);
  const [emptyDomainArray, setEmptyDomainArray] = useState<DomainDataType[]>([]);

  const { data, loading } = useGetDomainsQuery({
    variables: {
      address: address.toLowerCase(),
    },
  });

  useEffect(() => {
    console.log('dataInside', data?.account?.domains);
    const fetchData = async () => {
      setMainLoader(true);
      if (data?.account?.domains) {
        try {
          const allUserDomains = data.account?.domains;
          const arrayOfNames = allUserDomains.map((item) => {
            return axios.get(`https://${item.name}.limo/data.json`);
          });
          const dataFetcg = await Promise.allSettled(arrayOfNames);
          console.log('dataFetched', dataFetcg);
          const domainsArray: DomainDataType[] = [];
          const emptyDomainArray: DomainDataType[] = [];

          dataFetcg.forEach((item, index) => {
            console.log('data', data);

            const baseObject = {
              id: allUserDomains[index].id,
              name: allUserDomains[index].name,
              labelName: allUserDomains[index].labelName,
              data: {},
            } as DomainDataType;
            console.log('item', item);
            console.log('object', baseObject);
            if (item.status === 'rejected') emptyDomainArray.push(baseObject);
            else {
              baseObject.data = item.value.data;
              domainsArray.push(baseObject);
            }
            setDomainArray(domainArray);
            setEmptyDomainArray(emptyDomainArray);
          });
        } catch (e) {
          console.log('error', e);
        }
        setMainLoader(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  return { domainArray, emptyDomainArray, loading: loading || mainLoader };
}
