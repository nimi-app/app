import { PUBLIC_RESOLVER_ADDRESSES, SUPPORT_CHAINS_RAINBOW_KIT } from '../constants';
import { EnsPublicResolver__factory, EnsPublicResolver } from '../generated/contracts';
import { getProviderOrSigner } from '../utils';
import { useRainbow } from './useRainbow';
import { useNetwork, useProvider, useSigner } from 'wagmi';
import { Signer } from '@wagmi/core';

/**
 * Returns a ENS Public Resolver contract instance
 * @param withSignerIfPossible Whether to use a signer if one is available
 * @returns The ENS Public Resolver contract instance
 */
export function useENSPublicResolverContract(withSignerIfPossible = true): EnsPublicResolver | null {
  const rainbow = useRainbow();
  // const provider = useProvider();
  const { chain } = useNetwork();
  const { data: signer, isError, isLoading } = useSigner();

  if (chain?.id && PUBLIC_RESOLVER_ADDRESSES[chain?.id] !== undefined) {
    return EnsPublicResolver__factory.connect(PUBLIC_RESOLVER_ADDRESSES[chain?.id], signer as Signer);
  }

  return null;
}
