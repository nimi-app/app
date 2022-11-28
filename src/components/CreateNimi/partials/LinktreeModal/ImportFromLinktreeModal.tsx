import axios from 'axios';
import { ChangeEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getAPIBaseURL } from '../../../../modules/api-service';
import { Button } from '../../../Button';
import { ReactComponent as Linktree } from '../../../../assets/svg/linktree.svg';

import { Loader, LoaderWrapper } from '../../../Loader';
import {
  Modal,
  Header as ModalHeaderBase,
  Content as ModalContentBase,
  CloseButton as ModalCloseButton,
  Title as ModalTitle,
} from '../../../Modal';
import { ContentInput } from '../../../ReorderInput';
import { generateID, guessLinkTypeBasedOnUrl } from '../../../../utils';
import { nimiLinkDetailsExtended } from '@nimi.io/card';

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

export function ImportFromLinktreeModal({ onClose }) {
  const { t } = useTranslation('nimi');
  const [linktreeUrl, setLinktreeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const targetValue = event.target.value;
    const isValueMissingProtocol = !targetValue.startsWith('http://') && !targetValue.startsWith('https://');
    const valueWithProtocol = isValueMissingProtocol ? `https://${targetValue}` : targetValue;
    setLinktreeUrl(valueWithProtocol);
  };
  console.log('nimi details', nimiLinkDetailsExtended);

  const fetchLinktreeData = () => {
    setIsLoading(true);
    setError(undefined);

    const url = `${getAPIBaseURL()}/nimi/import`;
    console.log('url', url);

    axios
      .get<{ data }>(url, {
        params: {
          url: linktreeUrl,
        },
      })
      .then(({ data }) => {
        const mappedLinks = data.data.map(({ content, title }) => {
          const guessLinkType = guessLinkTypeBasedOnUrl(content);
          return { type: guessLinkType, title, content, id: generateID() };
        });
        console.log('ImportedData', mappedLinks);
        onClose(mappedLinks);
      })
      .catch((error) => {
        console.log('error', error);
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
                value={linktreeUrl}
                onChange={onInputChange}
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
