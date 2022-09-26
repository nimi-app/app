import axios from 'axios';
import { useEffect, useState } from 'react';

import { useGetDomainsQuery } from '../generated/graphql/ens';
import { generateID } from '../utils';

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
            return axios.get(`${process.env.REACT_APP_NIMI_API_BASE_URL}/nimi/by?ens=${item.name}`);
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

            if (item.status === 'rejected' || domain.length === 0) emptyDomainArray.push(baseObject);
            else {
              console.log('domain', domain);
              const objectReference = domain[domain.length - 1].nimi;
              if (objectReference.links) {
                console.log('Links objec', objectReference.links);
                objectReference.links = objectReference.links.map((item, index) => {
                  const generated = generateID(index);
                  return { ...item, label: undefined, id: generated };
                });
              }

              baseObject.data = objectReference;
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
