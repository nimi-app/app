import { ChainId, PUBLIC_RESOLVER_ADDRESSES } from '../constants';
import { EnsPublicResolver__factory, EnsPublicResolver } from '../generated/contracts';
import { useContract } from './useContract';
import { useActiveWeb3React } from './useWeb3';

/**
 * Returns a ENS Public Resolver contract instance
 * @param withSignerIfPossible Whether to use a signer if one is available
 * @returns The ENS Public Resolver contract instance
 */
export function useENSPublicResolverContract(withSignerIfPossible = true): EnsPublicResolver | null {
  const { chainId } = useActiveWeb3React();

  return useContract<EnsPublicResolver>(
    EnsPublicResolver__factory,
    PUBLIC_RESOLVER_ADDRESSES[chainId || ChainId.MAINNET],
    withSignerIfPossible
  );
}
