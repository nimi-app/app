import axios from 'axios';

export function getIYKRefData(iykRef: string): Promise<IYKRefStruct> {
  return axios.get<IYKRefStruct>(`https://api.iyk.app/api/refs/${iykRef}`).then((res) => res.data);
}

interface LinkedToken {
  contractAddress: string;
  chainId: number;
  tokenId: string;
}

interface IYKRefStruct {
  uid: string;
  isValidRef: boolean;
  linkedToken: LinkedToken | undefined;
}
