import { NimiLinkBaseDetails } from '@nimi.io/card';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { useImportFromLinktree } from '../../../../api/RestAPI/hooks/useImportFromLinktree';
import Linktree from '../../../../assets/svg/linktree.svg';
import { Button } from '../../../Button';
import { Loader, LoaderWrapper } from '../../../Loader';
import {
  Header,
  Modal,
  Content as ModalContentBase,
  HeaderBase as ModalHeaderBase,
  Title as ModalTitle,
} from '../../../Modal';
import { ContentInput } from '../../../ReorderInput';
import { ErrorMessage } from '../../styled';

export function ImportFromLinktreeModal({ onClose }: { onClose: (data?: NimiLinkBaseDetails[]) => void }) {
  const { t } = useTranslation('nimi');
  const [linktreeUsername, setLinktreeUsername] = useState('');

  const { refetch, error, isError, isFetching } = useImportFromLinktree({
    linktreeUrl: `https://linktr.ee/${linktreeUsername}`,
    onSuccess: onClose,
  });

  return (
    <Modal maxWidth="462px" handleCloseModal={onClose}>
      <ModalHeaderBase>
        <LinktreeLogo />
        <ModalTitle>{t('importFromLinktreeModal.title')}</ModalTitle>
      </ModalHeaderBase>
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
              value={linktreeUsername}
              onChange={(e) => setLinktreeUsername(e.target.value)}
              placeholder={t('importFromLinktreeModal.inputPlaceholder') as string}
            />
            {isError && <ErrorMessage>{error.message}</ErrorMessage>}
            <Button onClick={() => refetch()}>{t('importFromLinktreeModal.buttonLabel')}</Button>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

const ModalHeader = styled(Header)`
  gap: 32px;
  justify-content: center;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px;
  padding-bottom: 0;
`;

const ModalContent = styled(ModalContentBase)`
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 33px;
`;

const LinktreeLogo = styled(Linktree)`
  width: 60px;
  height: 40px;
`;
