import { PUBLIC_RESOLVER_ADDRESSES } from '../constants';
import { EnsPublicResolver__factory, EnsPublicResolver } from '../generated/contracts';
import { getProviderOrSigner } from '../utils';
import { useActiveWeb3React } from './useWeb3';

/**
 * Returns a ENS Public Resolver contract instance
 * @param withSignerIfPossible Whether to use a signer if one is available
 * @returns The ENS Public Resolver contract instance
 */
export function useENSPublicResolverContract(withSignerIfPossible = true): EnsPublicResolver | null {
  const { chainId, provider, account } = useActiveWeb3React();

  if (provider && chainId && PUBLIC_RESOLVER_ADDRESSES[chainId] !== undefined) {
    return EnsPublicResolver__factory.connect(
      PUBLIC_RESOLVER_ADDRESSES[chainId],
      withSignerIfPossible ? getProviderOrSigner(provider, account) : provider
    );
  }

  return null;
}
