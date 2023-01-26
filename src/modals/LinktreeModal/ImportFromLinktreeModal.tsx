import { Nimi } from '@nimi.io/card/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { useImportFromLinktree } from '../../api/RestAPI/hooks/useImportFromLinktree';
import Linktree from '../../assets/svg/linktree.svg';
import { Button } from '../../components/Button';
import { ErrorMessage } from '../../components/CreateNimi/styled';
import {
  Modal,
  Content as ModalContentBase,
  HeaderBase as ModalHeaderBase,
  Title as ModalTitle,
} from '../../components/Modal';
import { ContentInput } from '../../components/Input/ReorderInput';

export function ImportFromLinktreeModal({ onClose }: { onClose: (data?: Nimi) => void }) {
  const { t } = useTranslation('nimi');
  const [linktreeUsername, setLinktreeUsername] = useState('');

  const { refetch, error, isError, isFetching } = useImportFromLinktree({
    linktreeUrl: `https://linktr.ee/${linktreeUsername}`,
    onSuccess: onClose,
  });

  return (
    <Modal isLoading={isFetching} maxWidth="462px" handleCloseModal={onClose}>
      <ModalHeaderBase>
        <LinktreeLogo />
        <ModalTitle>{t('importFromLinktreeModal.title')}</ModalTitle>
      </ModalHeaderBase>
      <ModalContent>
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
      </ModalContent>
    </Modal>
  );
}

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
