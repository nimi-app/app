import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button } from '../../../Button';
import {
  Modal,
  Header as ModalHeaderBase,
  Content as ModalContentBase,
  Title as ModalTitle,
  Footer as ModalFooterBase,
} from '../../../Modal';

import { NFTSelector, NFTAsset } from '../../../NFTSelector';

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
  justify-content: center;
`;

export interface NFTSelectorModalProps {
  onClose: (asset?: NFTAsset) => void;
  address: string;
}

export function NFTSelectorModal({ address, onClose }: NFTSelectorModalProps) {
  const { t } = useTranslation();
  const [selectedAsset, setSelectedAsset] = useState<NFTAsset>();

  return (
    <Modal maxWidth="560px">
      <ModalHeader>
        <ModalTitle>Select an NFT</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <NFTSelector
          address={address}
          onChange={(newValue) => {
            setSelectedAsset(newValue);
          }}
        />
      </ModalContent>
      <ModalFooter>
        <Button onClick={() => onClose(selectedAsset)}>{t('close')}</Button>
      </ModalFooter>
    </Modal>
  );
}
