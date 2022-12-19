import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getAPIBaseURL } from '../../../../api/RestAPI/utils';
import { ReactComponent as Linktree } from '../../../../assets/svg/linktree.svg';
import { generateID, guessLinkTypeBasedOnUrl } from '../../../../utils';
import { Button } from '../../../Button';
import { Loader, LoaderWrapper } from '../../../Loader';
import {
  Modal,
  CloseButton as ModalCloseButton,
  Content as ModalContentBase,
  Header as ModalHeaderBase,
  Title as ModalTitle,
} from '../../../Modal';
import { ContentInput } from '../../../ReorderInput';

export function ImportFromLinktreeModal({ onClose }) {
  const { t } = useTranslation('nimi');
  const [linktreeUsername, setLinktreeUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const fetchLinktreeData = () => {
    setIsLoading(true);
    setError(undefined);

    const url = `${getAPIBaseURL()}/nimi/import`;

    axios
      .get<{ data }>(url, {
        params: {
          url: `https://linktr.ee/${linktreeUsername}`,
        },
      })
      .then(({ data }) => {
        const mappedLinks = data.data.map(({ content, title }) => {
          const guessLinkType = guessLinkTypeBasedOnUrl(content);
          return { type: guessLinkType, title, content, id: generateID() };
        });
        onClose(mappedLinks);
      })
      .catch((error) => {
        console.error('error', error);
        setError(error.message);
      })
      .then(() => setIsLoading(false));
  };

  return (
    <Modal>
      <ModalHeader>
        <ModalCloseButton role="button" onClick={() => onClose?.()} />
        <HeaderImageWrapper>
          <LinktreeLogo />
        </HeaderImageWrapper>
        <ModalTitle>{t('importFromLinktreeModal.title')}</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <ModalContentInnerWrapper>
          {isLoading ? (
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
                placeholder={t('importFromLinktreeModal.inputPlaceholder')}
              />

              <Button onClick={fetchLinktreeData}>{t('importFromLinktreeModal.buttonLabel')}</Button>
              <div>{error && error.message}</div>
            </>
          )}
        </ModalContentInnerWrapper>
      </ModalContent>
    </Modal>
  );
}

const ModalHeader = styled(ModalHeaderBase)`
  padding: 82px;
  padding-bottom: 0;
  justify-content: center;
  text-align: center;
`;

const ModalContent = styled(ModalContentBase)`
  padding: 82px;
  padding-top: 32px;
`;

const ModalContentInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 33px;
`;

const HeaderImageWrapper = styled.div`
  margin-bottom: 32px;
`;
const LinktreeLogo = styled(Linktree)`
  width: 60px;
  height: 40px;
`;
