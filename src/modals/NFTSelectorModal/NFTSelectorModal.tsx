import { useState } from 'react';
import styled from 'styled-components';

import { Button } from '../../components/Button';
import { Modal, Content as ModalContentBase, Footer as ModalFooterBase } from '../../components/Modal';
import { NFTAsset, NFTSelector } from '../../components/NFTSelector';

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

export interface NFTSelectorModalProps {
  onClose: (asset?: NFTAsset) => void;
  address: string;
}

export function NFTSelectorModal({ address, onClose }: NFTSelectorModalProps) {
  const [selectedAsset, setSelectedAsset] = useState<NFTAsset>();

  return (
    <Modal title={'Select an NFT'} handleCloseModal={() => onClose(selectedAsset)} maxWidth="560px">
      <ModalContent>
        <NFTSelector
          address={address}
          onChange={(newValue) => {
            setSelectedAsset(newValue);
          }}
        />
      </ModalContent>
      <ModalFooterBase>
        <Button style={{ marginTop: '10px' }} onClick={() => onClose(selectedAsset)}>
          Submit
        </Button>
      </ModalFooterBase>
    </Modal>
  );
}
