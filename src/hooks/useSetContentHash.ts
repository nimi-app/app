import { useMemo } from 'react';
import { useENSPublicResolverContract } from './useENSPublicResolverContract';
import nameHash from '@ensdomains/eth-ens-namehash';
import { ContractTransaction } from 'ethers';
import { EnsPublicResolver } from '../generated/contracts';
import { encodeContenthash } from '@ensdomains/ui';
import {
  createNameRegistry,
  getDomainKey,
  Record,
  updateNameRegistryData,
  NameRegistryState,
  updateInstruction,
  NAME_PROGRAM_ID,
  Numberu32,
  // deleteNameRegistry,
} from '@bonfida/spl-name-service';

import { Connection, PublicKey, Transaction } from '@solana/web3.js';

export interface UseSetContentHash {
  setContentHash: null | (() => Promise<ContractTransaction>);
}

export interface SetENSNameContentParams {
  contract: EnsPublicResolver;
  name: string;
  contentHash: string;
}

export function setENSNameContentHash(params: SetENSNameContentParams) {
  const ensNode = nameHash.hash(params.name);
  const { encoded, error } = encodeContenthash(params.contentHash);

  if (error) {
    throw new Error(error);
  }

  return params.contract.setContenthash(ensNode, encoded as any);
}

export function useSetContentHash(ipfsHash?: string, ensName?: string): UseSetContentHash {
  const publicResolverContract = useENSPublicResolverContract();

  return useMemo(() => {
    if (!publicResolverContract || !ipfsHash || !ensName) {
      return {
        setContentHash: null,
      };
    }

    return {
      setContentHash: () =>
        setENSNameContentHash({ contract: publicResolverContract, name: ensName, contentHash: ipfsHash }),
    };
  }, [ensName, ipfsHash, publicResolverContract]);
}

/**
 * Direct call to the ENS public resolver contract to set the content hash of a name
 */
export async function dontDoAnything(cid: string, connection: Connection, bonfidaDomain: string, publicKey) {
  const record = Buffer.from([1]).toString() + Record.IPFS;

  const { pubkey: domainKey } = await getDomainKey(bonfidaDomain);

  const win: typeof global = window;
  const provider = win?.phantom?.solana;

  const ix = await updateNameRegistryData(connection, record, 0, Buffer.from(`ipfs://${cid}`), undefined, domainKey);
  const transaction = new Transaction();
  transaction.add(ix);
  transaction.feePayer = publicKey;
  const { blockhash } = await connection.getLatestBlockhash('finalized');
  transaction.recentBlockhash = blockhash;
  console.log('attempting second transaction', transaction);
  const { signature } = await provider.signAndSendTransaction(transaction);
  console.log('SECOND SIGNATURE', signature);

  return signature;

  // const tx = await signAndSendInstructions(connection, [], wallet, [ix]);
  // console.log(tx, 'here');
  // return tx;
}

export async function setBonfidaContentHash(
  connection: Connection,
  bonfidaDomain: string,
  publicKey: PublicKey,
  cid: string
) {
  const record = Buffer.from([1]).toString() + Record.IPFS;

  console.log('bonfida domain', bonfidaDomain);
  console.log('pib', publicKey);
  console.log('');
  const { pubkey: recordKey } = await getDomainKey(Record.IPFS + '.' + bonfidaDomain, true);
  const { pubkey: domainKey } = await getDomainKey(bonfidaDomain);
  console.log('recordKey', recordKey);
  const win: typeof global = window;
  const provider = win?.phantom?.solana;

  const recordAccInfo = await connection.getAccountInfo(recordKey);
  const transaction = new Transaction();
  const { blockhash } = await connection.getLatestBlockhash('finalized');

  if (!recordAccInfo?.data) {
    console.log('WIWIWJIWJWIWJWIJWIWJWIJWIWJWIWJIWJWIWJWIJWIWJWIJWIWJ');
    const space = 2_000; // i.e 2KB
    const lamports = await connection.getMinimumBalanceForRentExemption(space + NameRegistryState.HEADER_LEN);
    console.log('lamport', lamports);
    console.log('record', record);
    const ix1 = await createNameRegistry(
      connection,
      record,
      space,
      publicKey,
      publicKey,
      lamports,
      undefined,
      domainKey
    );
    transaction.add(ix1);
    const ix = updateInstruction(NAME_PROGRAM_ID, recordKey, new Numberu32(0), Buffer.from(`ipfs://${cid}`), publicKey);
    console.log('create registru', ix);

    transaction.add(ix);
    transaction.feePayer = publicKey;

    console.log('blockhash', blockhash);
    transaction.recentBlockhash = blockhash;

    const { signature } = await provider.signAndSendTransaction(transaction);
    const recepit = await connection.confirmTransaction(signature);
    console.log('SIGNATURE!', recepit);

    return recepit;
  } else {
    const ix = await updateNameRegistryData(connection, record, 0, Buffer.from(`ipfs://${cid}`), undefined, domainKey);
    const transaction = new Transaction();
    transaction.add(ix);
    transaction.feePayer = publicKey;
    const { blockhash } = await connection.getLatestBlockhash('finalized');
    transaction.recentBlockhash = blockhash;
    console.log('attempting second transaction', transaction);
    const { signature } = await provider.signAndSendTransaction(transaction);
    console.log('SECOND SIGNATURE', signature);
  }

  // const tx = await signAndSendInstructions(connection, [], wallet, [ix]);
  // console.log(Created record ${tx});

  // const tx = await signAndSendInstructions(connection, [], wallet, [ix]);
  // console.log(tx, 'here');
  // return tx;
}
