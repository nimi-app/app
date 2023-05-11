import { decodeContenthash, encodeContenthash, namehash } from '@ensdomains/ui';
import { useEffect, useState } from 'react';

import { useENSNameResolverContract } from './useENSNameResolverContract';

type ContentHashProtocolType = 'ipns' | 'ipfs';

interface UseContentnHashResults {
  isLoading: boolean;
  data: ContenthashStruct;
  /**
   * Refetches the content hash
   * @returns void
   */
  refetch: () => void;
}

export interface ContenthashStruct {
  /**
   * Encoded content hash (e.g. 0xe30101701220b9c015918bd73d3e800000000000000)
   */
  contenthash?: '0x' | string;
  /**
   * Decoded content hash (e.g. bafybeib7z3q2)
   */
  contenthashCID?: string;
  /**
   * Decoded content hash with protocol (e.g. ipfs://bafybeib7z3q2)
   */
  contenthashURI?: `${ContentHashProtocolType}://${string}`;
  /**
   * Content hash protocol type (e.g. ipfs)
   */
  protocolType?: ContentHashProtocolType;
}

/**
 * Returns the content hash of an ENS name
 * @param ensName The ENS name
 * @returns The content hash of the ENS name
 */
export function useContenthash(ensName: string): UseContentnHashResults {
  const [refetchCount, setRefetchCount] = useState(0);
  const { data: resolverContract } = useENSNameResolverContract(ensName, true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ContenthashStruct>({});

  useEffect(() => {
    if (!resolverContract || !ensName) {
      return;
    }

    setIsLoading(true);

    resolverContract
      .contenthash(namehash(ensName))
      .then((encodeContenthash) => {
        const { protocolType, decoded } = decodeContenthash(encodeContenthash);

        const contenthashURI =
          protocolType && decoded ? (`${protocolType}://${decoded}` as ContenthashStruct['contenthashURI']) : undefined;

        setData({
          contenthash: encodeContenthash,
          contenthashCID: decoded,
          contenthashURI,
          protocolType: protocolType as ContentHashProtocolType,
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refetchCount, ensName, resolverContract]);

  const refetch = () => {
    setRefetchCount((prev) => prev + 1);
  };

  return {
    isLoading,
    data,
    refetch,
  };
}

/**
 * Transforms a CID into a content hash struct
 * @param cid The CID
 * @param protocolType The protocol type (e.g. ipfs)
 * @returns The content hash struct
 */
export function getContentHashStruct(cid: string, protocolType: ContentHashProtocolType): ContenthashStruct {
  const nextContenthashData: ContenthashStruct = {
    contenthashURI: `${protocolType}://${cid}`,
    contenthash: encodeContenthash(`${protocolType}://${cid}`).encoded as unknown as string,
    contenthashCID: cid,
    protocolType,
  };

  return nextContenthashData;
}
