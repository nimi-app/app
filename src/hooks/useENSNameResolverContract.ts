import { Signer } from '@wagmi/core';
import { useEffect, useMemo, useState } from 'react';
import { useSigner } from 'wagmi';

import { useRainbow } from './useRainbow';
import { PUBLIC_RESOLVER_ADDRESSES } from '../constants';
import { EnsPublicResolver, EnsPublicResolver__factory } from '../generated/contracts';

/**
 * Returns the ENS Resolver contract instance for a given ENS name
 * @param ensName The ENS name
 * @param withSignerIfPossible Whether to use a signer if one is available
 * @returns The ENS Resolver contract instance
 */
export function useENSNameResolverContract(ensName?: string, withSignerIfPossible = true) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<EnsPublicResolver | null>(null);
  const { data: signer } = useSigner();
  const { provider } = useRainbow();
  const signerOrProvider = useMemo(() => {
    return withSignerIfPossible === true ? (signer as Signer) : provider;
  }, [provider, signer, withSignerIfPossible]);

  useEffect(() => {
    if (!provider || !ensName) {
      setIsLoading(false);
      setData(null);
      return;
    }

    provider
      .getResolver(ensName)
      .then((nextResolver) => {
        setData(
          nextResolver !== null ? EnsPublicResolver__factory.connect(nextResolver.address, signerOrProvider) : null
        );
      })
      .catch((error) => {
        console.error(error);
        setData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [ensName, provider, signerOrProvider]);

  return {
    isLoading,
    data,
  };
}

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
