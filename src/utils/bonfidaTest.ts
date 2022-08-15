import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import {
  Record,
  updateNameRegistryData,
  getDomainKey,
  createNameRegistry,
  NameRegistryState,
} from '@bonfida/spl-name-service';
import { readFileSync } from 'fs';
import { signAndSendInstructions } from '@bonfida/utils';

// 7766553311.sol
const domain = '7766553311';

// Cf https://bonfida.github.io/solana-name-service-guide/domain-name/records.html#difference-between-records-and-subdomains
const record = Buffer.from([1]).toString() + Record.IPFS;

const connection = new Connection(clusterApiUrl('mainnet-beta'), 'processed');

const wallet = Keypair.fromSecretKey(
  new Uint8Array(
    JSON.parse(
      readFileSync('47mVfw4YJT79nGxdxvn2ayqnyBAGTQBbeYwK86VDp23rXuPpsu9eGDaBE6te7Eyhu11GRZHeawRTsTxxYyruaqh').toString()
    )
  )
);

export const update = async () => {
  const { pubkey: domainKey } = await getDomainKey(domain);
  const { pubkey: recordKey } = await getDomainKey(record + '.' + domain, true);

  const recordAccInfo = await connection.getAccountInfo(recordKey);

  if (!recordAccInfo?.data) {
    // The record does not exist so create it first
    const space = 2_000; // i.e 2KB
    const lamports = await connection.getMinimumBalanceForRentExemption(space + NameRegistryState.HEADER_LEN);
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
    const tx = await signAndSendInstructions(connection, [], wallet, [ix]);
    console.log(`Created record ${tx}`);
  }

  const ix = await updateNameRegistryData(connection, record, 0, Buffer.from('Some IPFS CID'), undefined, domainKey);

  const tx = await signAndSendInstructions(connection, [], wallet, [ix]);
  console.log(`Updated record ${tx}`);
};

update();
