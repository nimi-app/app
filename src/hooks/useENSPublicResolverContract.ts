import { PUBLIC_RESOLVER_ADDRESSES } from '../constants';
import { EnsPublicResolver__factory, EnsPublicResolver } from '../generated/contracts';
import { useRainbow } from './useRainbow';
import { useSigner } from 'wagmi';
import { Signer } from '@wagmi/core';

/**
 * Returns a ENS Public Resolver contract instance
 * @param withSignerIfPossible Whether to use a signer if one is available
 * @returns The ENS Public Resolver contract instance
 */
export function useENSPublicResolverContract(withSignerIfPossible = true): EnsPublicResolver | null {
  const { chainId, provider } = useRainbow();
  const { data: signer } = useSigner();

  if (chainId && PUBLIC_RESOLVER_ADDRESSES[chainId] !== undefined) {
    return EnsPublicResolver__factory.connect(
      PUBLIC_RESOLVER_ADDRESSES[chainId],
      withSignerIfPossible === true ? (signer as Signer) : provider
    );
  }

  return null;
}
