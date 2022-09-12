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
    const fetchData = async () => {
      if (data?.account?.domains) {
        try {
          setMainLoader(true);
          const allUserDomains = data.account?.domains;
          const arrayOfNames = allUserDomains.map((item) => {
            return axios.get(`https://api.nimi.io/v1.4/nimi/by?ens=${item.name}`);
          });
          const fetchedDomains: any[] = await Promise.allSettled(arrayOfNames);

          const domainArray: DomainDataType[] = [];
          const emptyDomainArray: DomainDataType[] = [];

          fetchedDomains.forEach((item, index) => {
            const domain = item.value.data.data;
            const baseObject = {
              id: allUserDomains[index].id,
              name: allUserDomains[index].name,
              labelName: allUserDomains[index].labelName,
              data: {},
            } as DomainDataType;

            console.log('object', baseObject);
            if (item.status === 'rejected' || domain.length === 0) emptyDomainArray.push(baseObject);
            else {
              baseObject.data = domain[domain.length - 1].nimi;
              domainArray.push(baseObject);
            }
          });

          setDomainArray(domainArray);
          setEmptyDomainArray(emptyDomainArray);
        } catch (e) {
          console.log('error', e);
        } finally {
          setMainLoader(false);
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  return { domainArray, emptyDomainArray, loading: loading || mainLoader };
}
