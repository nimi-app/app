import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { TwitterData, useImportFromTwitter } from '../../../../api/RestAPI/hooks/useImportFromTwitter';
import TwitterLogoBig from '../../../../assets/svg/twitter-big.svg';
import { Button } from '../../../Button';
import { Loader, LoaderWrapper } from '../../../Loader';
import { Modal, Content as ModalContentBase, Header as ModalHeaderBase, Title as ModalTitle } from '../../../Modal';
import { ContentInput } from '../../../ReorderInput';
import { ErrorMessage } from '../../styled';

export interface ImportTwitterDataModalProps {
  onClose: () => void;
  onDataImport: (data: TwitterData) => void;
}

export function ImportFromTwitterModal({ onClose, onDataImport }: ImportTwitterDataModalProps) {
  const { t } = useTranslation('nimi');
  const [username, setUsername] = useState('');

  const formatTwitterUsername = (user: string) => (user.charAt(0) === '@' ? user.substring(1) : user);

  const { refetch, isFetching, isError, error } = useImportFromTwitter({
    twitterUsername: formatTwitterUsername(username),
    onSuccess: onDataImport,
  });

  return (
    <Modal maxWidth="462px" handleCloseModal={onClose}>
      <ModalHeader>
        <TwitterLogoBig />
        <ModalTitle>{t('importFromTwitterModal.title')}</ModalTitle>
      </ModalHeader>
      <ModalContent>
        {isFetching ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          <>
            <ContentInput
              inputInvalid={false}
              border={'2px solid #E6E8EC'}
              paddingLeft={'20px'}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('importFromTwitterModal.inputPlaceholder') as string}
            />
            {isError && <ErrorMessage>{error.message}</ErrorMessage>}
            <Button onClick={() => refetch()}>{t('importFromTwitterModal.buttonLabel')}</Button>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

const ModalHeader = styled(ModalHeaderBase)`
  padding-bottom: 0;
  gap: 32px;
  justify-content: center;
  text-align: center;
`;

const ModalContent = styled(ModalContentBase)`
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 33px;
`;
