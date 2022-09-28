import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';

import {
  Modal,
  Header as ModalHeaderBase,
  Content as ModalContentBase,
  Title as ModalTitle,
  Footer as ModalFooterBase,
} from 'components/Modal';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import { getEtherscanExplorerLink } from 'utils/explorer';

const LoaderWrapper = styled.div`
  margin-bottom: 32px;
`;

const ModalHeader = styled(ModalHeaderBase)`
  padding-bottom: 0;
  justify-content: center;
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
  justify-content: center;
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
}

/**
 * A modal to handle Nimi publishing
 * @returns
 */
export function PublishNimiModal({
  cancel,
  isPublishing,
  ensName,
  publishError,
  setContentHashTransaction,
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
                  setContentHashTransaction.chainId,
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
      return (
        <div>
          <p>{publishError.message}</p>
        </div>
      );
    }
  };

  return (
    <Modal maxWidth="560px">
      <ModalHeader>
        <ModalTitle>{t('publishNimiModal.title', { ns: 'nimi' })}</ModalTitle>
      </ModalHeader>
      <ModalContent>{modalContent()}</ModalContent>
      <ModalFooter>
        {(setContentHashTransactionReceipt || publishError || isPublished) && (
          <Button onClick={cancel}>{t('close')}</Button>
        )}
      </ModalFooter>
    </Modal>
  );
}
