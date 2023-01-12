import { ContractReceipt } from '@ethersproject/contracts';

import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Modal, Content as ModalContentBase } from '../../components/Modal';

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

export interface PublishNimiModalProps {
  onClose: () => void;
  isPublished: boolean;
  ensName: string;
  ipfsHash: string | undefined;
  publishError: Error | undefined;
  setContentHashTransactionReceipt: ContractReceipt | undefined;
}

/**
 * A modal to handle Nimi publishing
 * @returns
 */
export function PublishNimiModal({
  onClose,
  ipfsHash,
  ensName,
  publishError,
  setContentHashTransactionReceipt,
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
    <Modal handleCloseModal={onClose} title={t('publishNimiModal.title', { ns: 'nimi' })!} maxWidth="560px">
      <ModalContent>{modalContent()}</ModalContent>
    </Modal>
  );
}
