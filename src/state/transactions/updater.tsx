import { useCallback, useEffect, useMemo } from 'react';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Box, Flex, Text } from 'rebass';

import { ChainId } from '../../constants';
import { useActiveWeb3React } from '../../hooks/useWeb3';
import { ExternalLink } from '../../theme';

import { getExplorerLink } from '../../utils';
import { retry, RetryableError, RetryOptions } from '../../utils/retry';
import { updateBlockNumber } from '../application/actions';
import { useBlockNumber } from '../application/hooks';
import { AppState } from '../index';
import { checkedTransaction, finalizeTransaction } from './actions';
import { TransactionState } from './reducer';

interface TxInterface {
  addedTime: number;
  receipt?: Record<string, any>;
  lastCheckedBlockNumber?: number;
}

export function shouldCheck(lastBlockNumber: number, tx: TxInterface): boolean {
  if (tx.receipt) return false;
  if (!tx.lastCheckedBlockNumber) return true;
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) return false;
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60;
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9;
  } else if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2;
  } else {
    // otherwise every block
    return true;
  }
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = { n: 1, minWait: 0, maxWait: 0 };

const RETRY_OPTIONS_BY_CHAIN_ID: { [chainId in ChainId]: RetryOptions } = {
  [ChainId.MAINNET]: DEFAULT_RETRY_OPTIONS,
  [ChainId.RINKEBY]: DEFAULT_RETRY_OPTIONS,
  [ChainId.POLYGON]: DEFAULT_RETRY_OPTIONS,
  [ChainId.GOERLI]: DEFAULT_RETRY_OPTIONS,
};

export function TransactionsStateUpdater(): null {
  const { chainId, provider } = useActiveWeb3React();

  const lastBlockNumber = useBlockNumber();

  const dispatch = useDispatch();
  const state = useSelector<AppState, TransactionState>((state) => state.transactions);

  const transactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state]);

  const getReceipt = useCallback(
    (hash: string) => {
      if (!provider || !chainId) throw new Error('No provider or chainId');
      const retryOptions = RETRY_OPTIONS_BY_CHAIN_ID[chainId];
      return retry(
        () =>
          provider.getTransactionReceipt(hash).then((receipt) => {
            if (receipt === null) {
              console.debug('Retrying for hash', hash);
              throw new RetryableError();
            }
            return receipt;
          }),
        retryOptions
      );
    },
    [chainId, provider]
  );

  useEffect(() => {
    if (!chainId || !provider || !lastBlockNumber) return;

    const cancels = Object.keys(transactions)
      .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
      .map((hash) => {
        const { promise, cancel } = getReceipt(hash);
        promise
          .then((receipt: any) => {
            if (receipt) {
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: receipt.status,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex,
                  },
                })
              );

              toast.info(
                <Flex alignItems="center">
                  <Box pr="12px">{receipt.status === 1 ? <CloseIcon /> : <CloseIcon />}</Box>
                  <Flex flexDirection="column">
                    <Text mb="4px">
                      {transactions[hash]?.summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)}
                    </Text>
                    {chainId && (
                      <ExternalLink href={getExplorerLink(chainId, hash, 'transaction')}>
                        <Text fontSize="14px">View on block explorer</Text>
                      </ExternalLink>
                    )}
                  </Flex>
                </Flex>
              );

              // the receipt was fetched before the block, fast forward to that block to trigger balance updates
              if (receipt.blockNumber > lastBlockNumber) {
                dispatch(updateBlockNumber({ chainId, blockNumber: receipt.blockNumber }));
              }
            } else {
              dispatch(checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber }));
            }
          })
          .catch((error: any) => {
            if (!error.isCancelledError) {
              console.error(`Failed to check transaction hash: ${hash}`, error);
            }
          });
        return cancel;
      });

    return () => {
      cancels.forEach((cancel) => cancel());
    };
  }, [chainId, provider, transactions, lastBlockNumber, dispatch, getReceipt]);

  return null;
}
