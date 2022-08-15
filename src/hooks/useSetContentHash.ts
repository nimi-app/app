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
} from '@bonfida/spl-name-service';
import { signAndSendInstructions } from '@bonfida/utils';
import { BonfidaUserData } from './Bonfida/useBonfidaDomainsForUser';
import { Connection, Keypair, Transaction, SystemProgram } from '@solana/web3.js';
import { readFileSync } from 'fs';

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
export async function setBonfidaContentHash(
  cid: string,
  solanaData: BonfidaUserData,
  connection: Connection,
  bonfidaDomain: string,
  wallet
) {
  const record = Buffer.from([1]).toString() + Record.IPFS;

  const { pubkey: recordKey } = await getDomainKey(record + '.' + bonfidaDomain, true);
  const { pubkey: domainKey } = await getDomainKey(bonfidaDomain);
  console.log('solanaData', solanaData);
  console.log('bonfidaDomain', bonfidaDomain);
  console.log('wallet', wallet);
  const recordAccInfo = await connection.getAccountInfo(recordKey);
  console.log(recordAccInfo, 'reccordAccInfo');

  const win: typeof global = window;
  const provider = win?.phantom?.solana;
  console.log('PROVIDER', provider);

  if (!recordAccInfo?.data) {
    const space = 2_000; // i.e 2KB
    const lamports = await connection.getMinimumBalanceForRentExemption(space + NameRegistryState.HEADER_LEN);
    console.log('lamport', lamports);
    const ix = await createNameRegistry(
      connection,
      record,
      space,
      wallet.publicKey,
      wallet.publicKey,
      lamports,
      undefined,
      domainKey
    );
    console.log('create registru', ix);
    console.log('OUR SYSTEM PROGRAM ID', SystemProgram.programId);

    const transaction = new Transaction();
    transaction.add(ix);
    transaction.feePayer = wallet.publicKey;
    const { blockhash } = await connection.getLatestBlockhash('finalized');
    transaction.recentBlockhash = blockhash;

    console.log('TRANSACTION', transaction);

    const { signature } = await provider.signAndSendTransaction(transaction);
    console.log('SIGNATURE', signature);
    // const tx = await signAndSendInstructions(connection, [], wallet, [ix]);
    // console.log(Created record ${tx});
  }
  console.log('accountInfo', recordAccInfo);

  const ix = await updateNameRegistryData(connection, record, 0, Buffer.from(cid), undefined, domainKey);
  const transaction = new Transaction();
  transaction.add(ix);
  transaction.feePayer = wallet.publicKey;
  const { blockhash } = await connection.getLatestBlockhash('finalized');
  transaction.recentBlockhash = blockhash;

  const { signature } = await provider.signAndSendTransaction(transaction);
  console.log('SECOND SIGNATURE', signature);

  return signature;

  // const tx = await signAndSendInstructions(connection, [], wallet, [ix]);
  // console.log(tx, 'here');
  // return tx;
}
