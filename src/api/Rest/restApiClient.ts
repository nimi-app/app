import axios, { AxiosInstance } from 'axios';

import { getAPIBaseURL } from './utils';

//will change this once production starts working
const nimiApi = axios.create({
  baseURL: getAPIBaseURL(),
});

export default class ApiRequest {
  /**
   * @property Base Url for making requests
   */
  public readonly baseGetClient: AxiosInstance;
  /**
   * @property ChainId
   */
  public readonly chainId?: number;

  constructor(chainId = 1) {
    this.chainId = chainId;
    this.baseGetClient = nimiApi;
  }
  getDeployedPageData = async (ensName: string) => {
    const params = {
      ens: ensName,
    };
    const { data } = await this.baseGetClient.get(`/nimi/by`, { params });
    return data;
  };
  getEnsGeneratedData = async (ensName: string) => {
    const params = {
      ensName,
      chainId: this.chainId,
    };
    const { data } = await this.baseGetClient.get(`/nimi/generate`, { params });
    return data;
  };
}
