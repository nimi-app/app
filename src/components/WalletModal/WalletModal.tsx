import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { ChainIdNotAllowedError } from '@web3-react/store';
import { WalletConnect } from '@web3-react/walletconnect';
import { MetaMask } from '@web3-react/metamask';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import { Connector } from '@web3-react/types';

import { Button } from '../Button';
import { Loader } from '../Loader';

import { useCloseModals, useModalOpen } from '../../state/application/hooks';
import { ChainId, getAddChainParameters, CHAINS } from '../../constants';
import { ApplicationModal } from '../../state/application/actions';
import { getName, useWeb3Connectors } from '../../connectors';
import { shortenAddress } from '../../utils';

import {
  StyledModalInnerWrapper,
  ConnectorListWrapper,
  StyledModalBackdrop,
  StyledModalContent,
  StyledModalDialog,
  StyledModalFooter,
  StyledModalHeader,
  LoaderWrapper,
  ModalContent,
} from './styled';

const Modal: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <StyledModalDialog>
    <StyledModalBackdrop>
      <StyledModalContent>
        <StyledModalInnerWrapper>{children}</StyledModalInnerWrapper>
      </StyledModalContent>
    </StyledModalBackdrop>
  </StyledModalDialog>
);

export function WalletModal() {
  const { t } = useTranslation();

  const { connector, isActive, account, error } = useWeb3React();
  const isModalOpen = useModalOpen(ApplicationModal.WALLET_SWITCHER);
  const connectors = useWeb3Connectors();
  const closeModal = useCloseModals();
  // Internal state
  const [isActivatingAConnector, setIsActivatingAConnector] = useState(false);
  const [pendingError, setPendingError] = useState<Error | undefined>();
  const isWrongNetwork = pendingError instanceof ChainIdNotAllowedError;

  // Track connector errors
  useEffect(() => {
    setPendingError(error);
  }, [error]);

  /**
   * Activate a connector
   */
  const activateConnector = async (connector: Connector) => {
    setIsActivatingAConnector(true);
    // For MetaMask, show the loader
    if (connector instanceof MetaMask) {
      return connector.activate(getAddChainParameters(ChainId.MAINNET)).then(() => {
        setIsActivatingAConnector(false);
        closeModal();
      });
    }

    // Close the modal before activating the connector
    setTimeout(() => {
      // Reset internal state and close the modal
      setIsActivatingAConnector(false);
      setPendingError(undefined);
      closeModal();
    }, 500);

    // For any wallet that triggers a popup, close the native modal
    if (connector instanceof WalletConnect || connector instanceof CoinbaseWallet) {
      return connector.activate(ChainId.MAINNET);
    }

    // Generic unknown connector
    return connector.activate(getAddChainParameters(ChainId.MAINNET));
  };

  // Modal is closed, do nothing
  if (!isModalOpen) {
    return null;
  }

  // A wallet is connected on the right network
  if (account && isActive) {
    return (
      <Modal>
        <StyledModalHeader>
          <h2>{t('wallet')}</h2>
        </StyledModalHeader>
        <ModalContent>
          <p>
            {t('connectedViaConnector', {
              connectorName: getName(connector),
            })}
          </p>
          <p>{shortenAddress(account)}</p>
        </ModalContent>
        <StyledModalFooter>
          <Button onClick={() => connector.deactivate()}>{t('disconnect')}</Button>
          <Button onClick={closeModal}>{t('close')}</Button>
        </StyledModalFooter>
      </Modal>
    );
  }

  // On wrong networks, invite the user to switch to supported chains
  if (isWrongNetwork) {
    return (
      <Modal>
        <StyledModalHeader>
          <h2>{t('error.wrongNetwork')}</h2>
        </StyledModalHeader>
        <ModalContent>
          <p>
            {t('switchToEither')} {CHAINS[ChainId.MAINNET].name}, {CHAINS[ChainId.RINKEBY].name}, or{' '}
            {CHAINS[ChainId.GOERLI].name}
          </p>
        </ModalContent>
        <StyledModalFooter>
          <Button onClick={() => activateConnector(connector)}>{t('switchNetwork')}</Button>
          <Button onClick={closeModal}>{t('close')}</Button>
        </StyledModalFooter>
      </Modal>
    );
  }

  // A connector is being activated
  if (isActivatingAConnector) {
    return (
      <Modal>
        <StyledModalHeader>
          <h2>{t('error.wrongNetwork')}</h2>
        </StyledModalHeader>
        <ModalContent>
          <LoaderWrapper>
            <Loader size={72} />
          </LoaderWrapper>
        </ModalContent>
      </Modal>
    );
  }

  // A wallet is not connected, show the list of connectors
  return (
    <Modal>
      <StyledModalHeader>
        <h2>{t('connectWallet')}</h2>
      </StyledModalHeader>
      <ModalContent>
        <ConnectorListWrapper>
          {connectors.map(({ connector, name }) => {
            return (
              <Button key={name} onClick={() => activateConnector(connector).catch(console.error)}>
                {name}
              </Button>
            );
          })}
        </ConnectorListWrapper>
      </ModalContent>
      <StyledModalFooter>
        <Button onClick={closeModal}>{t('close')}</Button>
      </StyledModalFooter>
    </Modal>
  );
}
