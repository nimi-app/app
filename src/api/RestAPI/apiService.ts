import axios from 'axios';

import { getAPIBaseURL } from './utils';

//will change this once production starts working
const baseClient = axios.create({
  baseURL: getAPIBaseURL(),
});

export const getDeployedPageData = async (ensName: string) => {
  const params = {
    ens: ensName,
  };
  const { data } = await baseClient.get(`/nimi/by`, { params });
  return data;
};
export const getEnsGeneratedData = async (ensName: string, chainId = 1) => {
  const params = {
    ensName,
    chainId,
  };
  const { data } = await baseClient.get(`/nimi/generate`, { params });
  return data;
};
