import { PUBLIC_RESOLVER_ADDRESSES, SUPPORT_CHAINS_RAINBOW_KIT } from '../constants';
import { EnsPublicResolver__factory, EnsPublicResolver } from '../generated/contracts';
import { getProviderOrSigner } from '../utils';
import { useChainId, useRainbow } from './useRainbow';
import { useNetwork, useProvider, useSigner } from 'wagmi';
import { Signer } from '@wagmi/core';

/**
 * Returns a ENS Public Resolver contract instance
 * @param withSignerIfPossible Whether to use a signer if one is available
 * @returns The ENS Public Resolver contract instance
 */
export function useENSPublicResolverContract(withSignerIfPossible = true): EnsPublicResolver | null {
  const chainId = useChainId();
  const { data: signer, isError, isLoading } = useSigner();

  if (chainId && PUBLIC_RESOLVER_ADDRESSES[chainId] !== undefined) {
    return EnsPublicResolver__factory.connect(PUBLIC_RESOLVER_ADDRESSES[chainId], signer as Signer);
  }

  return null;
}
