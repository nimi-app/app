import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts';

import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getEtherscanExplorerLink } from '../../../../utils/explorer';
import { Button } from '../../../Button';
import { Loader } from '../../../Loader';
import { Modal, Content as ModalContentBase, Footer as ModalFooterBase } from '../../../Modal';

const LoaderWrapper = styled.div`
  margin-bottom: 32px;
`;

const ModalContent = styled(ModalContentBase)`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: 0;
  padding-bottom: 0;
  flex-grow: 1;
  > p {
    margin-bottom: 10px;
  }
`;

const ModalFooter = styled(ModalFooterBase)`
  padding-top: 0;
`;

export interface PublishNimiModalProps {
  cancel: () => void;
  isPublishing: boolean;
  isPublished: boolean;
  ensName: string;
  ipfsHash: string | undefined;
  publishError: Error | undefined;
  setContentHashTransaction: ContractTransaction | undefined;
  setContentHashTransactionReceipt: ContractReceipt | undefined;
  setContentHashTransactionChainId: number;
}

/**
 * A modal to handle Nimi publishing
 * @returns
 */
export function PublishNimiModal({
  cancel,
  ipfsHash,
  isPublishing,
  ensName,
  publishError,
  setContentHashTransaction,
  setContentHashTransactionReceipt,
  setContentHashTransactionChainId,
  isPublished,
}: PublishNimiModalProps) {
  const { t } = useTranslation(['common', 'nimi']);

  const modalContent = () => {
    if (setContentHashTransactionReceipt || isPublished) {
      return (
        <>
          <p>
            <Trans key="publishNimiModal.successParagraph1" ns="nimi">
              Your Nimi has been published at{' '}
              <a target="_blank" rel="noreferrer" href={`https://${ensName}.limo`}>
                {ensName}
              </a>
              !
            </Trans>
          </p>
          {process.env.APP_ENV !== 'production' && ipfsHash && (
            <p>
              You can also view it on the via the{' '}
              <a target="_blank" rel="noreferrer" href={`https://ipfs.io/ipfs/${ipfsHash}`}>
                IPFS gateway
              </a>
            </p>
          )}
          <p>{t('publishNimiModal.successParagraph2', { ns: 'nimi' })}</p>
          <p>{t('publishNimiModal.successParagraph3', { ns: 'nimi' })}</p>
        </>
      );
    }

    if (isPublishing) {
      return (
        <>
          <LoaderWrapper>
            <Loader size={72} />
          </LoaderWrapper>
          {setContentHashTransaction && (
            <p>
              <a
                target="_blank"
                rel="noreferrer"
                href={getEtherscanExplorerLink(
                  setContentHashTransactionChainId,
                  setContentHashTransaction.hash,
                  'transaction'
                )}
              >
                {t('viewTransactionOnBlockExplorer')}
              </a>
            </p>
          )}
        </>
      );
    }

    if (publishError) {
      const errorMessage = publishError?.message?.includes('user rejected transaction') ? (
        <>User rejected transaction</>
      ) : (
        <p>Unknown error</p>
      );

      return <p>{errorMessage}</p>;
    }
  };

  return (
    <Modal handleCloseModal={cancel} title={t('publishNimiModal.title', { ns: 'nimi' })!} maxWidth="560px">
      <ModalContent>{modalContent()}</ModalContent>
      <ModalFooter>
        {(setContentHashTransactionReceipt || publishError || isPublished) && (
          <Button onClick={cancel}>{t('close')}</Button>
        )}
      </ModalFooter>
    </Modal>
  );
}
