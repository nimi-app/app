import axios, { AxiosInstance } from 'axios';

// import { getAPIBaseURL } from '../../modules/api-service';

const nimiApi = axios.create({
  baseURL: 'https://api.nimi.io/v1.4/',
});

export default class ApiRequest {
  /**
   * @property Base Url for making requests
   */
  public readonly baseGetClient: AxiosInstance;
  //   /**
  //    * @property Options for requests
  //    */
  //   public readonly getOptions: {};

  constructor() {
    // this.getOptions = getConfig;
    this.baseGetClient = nimiApi;
  }
  getDeployedPageData = async (ensName: string) => {
    const { data } = await this.baseGetClient.get(`/nimi/by?ens=${ensName}`);
    return data;
  };
  getEnsGeneratedData = async (ensName: string) => {
    const { data } = await this.baseGetClient.get(`/nimi/generate?ensName=${ensName}`);
    return data;
  };
}
