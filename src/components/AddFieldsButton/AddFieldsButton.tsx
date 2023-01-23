import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { useUserInterface } from '../../services/useUserInterface';
import { DottedBorder } from '../Button/styled';

export function AddFieldsButton() {
  const { openModal, ModalTypes } = useUserInterface();
  const { t } = useTranslation('nimi');

  return (
    <Button type="button" onClick={() => openModal(ModalTypes.ADD_FIELDS)}>
      + {t('buttonLabel.addFields')}
    </Button>
  );
}

const Button = styled.button`
  ${DottedBorder}
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 10px 0;
  cursor: pointer;
`;
