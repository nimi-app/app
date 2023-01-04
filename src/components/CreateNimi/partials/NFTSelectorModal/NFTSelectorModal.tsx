import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button } from '../../../Button';
import { Content as ModalContentBase, Footer as ModalFooterBase, ModalPortal } from '../../../Modal';
import { NFTAsset, NFTSelector } from '../../../NFTSelector';

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
    <ModalPortal title={'Select an NFT'} handleCloseModal={() => onClose(selectedAsset)} maxWidth="560px">
      <ModalContent>
        <NFTSelector
          address={address}
          onChange={(newValue) => {
            setSelectedAsset(newValue);
          }}
        />
      </ModalContent>
      <ModalFooter>
        <Button onClick={() => onClose(selectedAsset)}>Submit</Button>
      </ModalFooter>
    </ModalPortal>
  );
}
