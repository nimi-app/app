import { getAddress, isAddress } from '@ethersproject/address';
import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import { JsonRpcSigner, Web3Provider, JsonRpcProvider } from '@ethersproject/providers';
import styled from 'styled-components';
import { NetworkDetails } from '../constants';
import { ReactComponent as ConnectedSvg } from '../assets/svg/connected.svg';

const ETHERSCAN_PREFIXES: Record<number, string> = {
  1: '',
  4: 'rinkeby.',
};

function getExplorerPrefix(chainId: number) {
  return `https://${ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]}etherscan.io`;
}
export function getExplorerLink(
  chainId: number,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block'
): string {
  const prefix = getExplorerPrefix(chainId);

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'block': {
      return `${prefix}/block/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, charsBefore = 4, charsAfter = 4): string {
  const parsed = getAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, charsBefore + 2)}...${parsed.substring(42 - charsAfter)}`;
}

// account is not optional
export function getSigner(library: Web3Provider | JsonRpcProvider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider | JsonRpcProvider,
  account?: string
): Web3Provider | JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}

export const switchOrAddNetwork = (networkDetails?: NetworkDetails, account?: string) => {
  if (!window.ethereum || !window.ethereum.request || !window.ethereum.isMetaMask || !networkDetails || !account)
    return;
  window.ethereum
    .request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: networkDetails.chainId }],
    })
    .catch((error) => {
      if (error.code !== 4902) {
        console.error('error switching to chain id', networkDetails.chainId, error);
      }
      if (!window.ethereum || !window.ethereum.request) return;
      window.ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: [{ ...networkDetails }, account],
        })
        .catch((error) => {
          console.error('error adding chain with id', networkDetails.chainId, error);
        });
    });
};

export const StyledConnectedIcon = styled(ConnectedSvg)<{
  width?: string;
  padding?: string;
  margin?: string;
}>`
  min-width: ${(props) => (props.width ? props.width : '22px')};
  padding: ${(props) => (props.padding ? props.padding : '0')};
  margin: ${(props) => (props.margin ? props.margin : '0')};
`;
