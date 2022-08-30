import axios from 'axios';
import { ChangeEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getAPIBaseURL } from '../../../../modules/api-service';
import { Button } from '../../../Button';
import { FormGroup, Input } from '../../../form';
import { Loader, LoaderWrapper } from '../../../Loader';
import {
  Modal,
  Header as ModalHeaderBase,
  Content as ModalContentBase,
  CloseButton as ModalCloseButton,
  Title as ModalTitle,
} from '../../../Modal';

import { ImportTwitterDataModalProps, TwitterData } from './types';

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

export function ImportFromTwitterModal({ onClose, onDataImport }: ImportTwitterDataModalProps) {
  const { t } = useTranslation('nimi');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUsername(event.target.value);
  };

  const fetchTwitterData = () => {
    setIsLoading(true);
    setError(undefined);

    const url = new URL('/twitter-info', getAPIBaseURL());

    axios
      .get<{ data: TwitterData }>(url.toString(), {
        params: {
          username: username.charAt(0) === '@' ? username.substring(1) : username,
        },
      })
      .then(({ data }) => {
        onDataImport(data.data);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      })
      .then(() => setIsLoading(false));
  };

  return (
    <Modal>
      <ModalHeader>
        <ModalCloseButton role="button" onClick={() => onClose?.()} />
        <HeaderImageWrapper>
          <svg width="61" height="48" viewBox="0 0 61 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.3688 47.6427C42.0104 47.6427 54.3944 29.5039 54.3944 13.774C54.3944 13.2588 54.3944 12.7459 54.3584 12.2353C56.7676 10.5503 58.8473 8.46388 60.5 6.07381C58.2533 7.03645 55.87 7.66775 53.4296 7.94664C55.9994 6.45901 57.9227 4.11922 58.8416 1.36273C56.4252 2.74926 53.7815 3.72642 51.0248 4.25204C49.1688 2.34366 46.7141 1.07999 44.0405 0.656558C41.3669 0.233129 38.6236 0.673553 36.2349 1.90968C33.8463 3.1458 31.9456 5.10871 30.8269 7.49465C29.7082 9.88059 29.4339 12.5565 30.0464 15.1084C25.1522 14.8712 20.3643 13.6413 15.9935 11.4987C11.6228 9.35613 7.76681 6.34868 4.676 2.67162C3.10182 5.2921 2.61968 8.39422 3.32775 11.3464C4.03582 14.2985 5.88085 16.8787 8.4872 18.5617C6.52818 18.5055 4.61187 17.9945 2.9 17.0718C2.9 17.1205 2.9 17.1715 2.9 17.2226C2.90078 19.9708 3.88463 22.6342 5.68468 24.761C7.48473 26.8878 9.99015 28.347 12.776 28.8912C10.9637 29.3692 9.06219 29.439 7.2176 29.0955C8.00422 31.4607 9.53568 33.529 11.5978 35.0112C13.6599 36.4934 16.1495 37.3152 18.7184 37.3619C14.3594 40.6746 8.97454 42.4729 3.4304 42.4675C2.45097 42.4657 1.47249 42.4083 0.5 42.2958C6.12953 45.7891 12.6798 47.6421 19.3688 47.6334"
              fill="#56CCF2"
            />
          </svg>
        </HeaderImageWrapper>
        <ModalTitle>{t('importFromTwitterModal.title')}</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <ModalContentInnerWrapper>
          {isLoading ? (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          ) : (
            <>
              <FormGroup>
                <Input
                  type="text"
                  value={username}
                  onChange={onInputChange}
                  placeholder={t('importFromTwitterModal.inputPlaceholder')}
                />
              </FormGroup>
              <Button onClick={fetchTwitterData}>{t('importFromTwitterModal.buttonLabel')}</Button>
              <div>{error && error.message}</div>
            </>
          )}
        </ModalContentInnerWrapper>
      </ModalContent>
    </Modal>
  );
}
