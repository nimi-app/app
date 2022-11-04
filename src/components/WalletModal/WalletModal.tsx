import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { useWeb3React } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { ChainIdNotAllowedError } from '@web3-react/store';
import { Connector } from '@web3-react/types';
import { WalletConnect } from '@web3-react/walletconnect';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getName, useWeb3Connectors } from '../../connectors';
import { ChainId, CHAINS, ENV_SUPPORTED_CHAIN_IDS, getAddChainParameters } from '../../constants';
import { ApplicationModal } from '../../state/application/actions';
import { useCloseModals, useModalOpen } from '../../state/application/hooks';
import { shortenAddress } from '../../utils';
import { Button } from '../Button';
import { Loader, LoaderWrapper as LoaderWrapperBase } from '../Loader';
import { Content, Footer, Header, Modal } from '../Modal';
import { ConnectorListWrapper } from './styled';

const LoaderWrapper = styled(LoaderWrapperBase)`
  padding-bottom: 16px;
`;

export function WalletModal() {
  const { t } = useTranslation();

  const { connector, isActive, account, error } = useWeb3React();
  const isModalOpen = useModalOpen(ApplicationModal.WALLET_SWITCHER);
  const connectors = useWeb3Connectors();
  const closeModal = useCloseModals();
  const navigate = useRouter();
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
        <Header>
          <h2>{t('wallet')}</h2>
        </Header>
        <Content>
          <p>
            {t('connectedViaConnector', {
              connectorName: getName(connector),
            })}
          </p>
          <p>{shortenAddress(account)}</p>
        </Content>
        <Footer>
          <Button onClick={() => connector.deactivate()}>{t('disconnect')}</Button>
          <Button onClick={closeModal}>{t('close')}</Button>
        </Footer>
      </Modal>
    );
  }

  // On wrong networks, invite the user to switch to supported chains
  if (isWrongNetwork) {
    const intlFormatter = new Intl.ListFormat(navigator.language, {
      style: 'short',
      type: 'disjunction',
    });
    const chainNameList = ENV_SUPPORTED_CHAIN_IDS.map((chainId) => CHAINS[chainId].name);

    return (
      <Modal>
        <Header>
          <h2>{t('error.wrongNetwork')}</h2>
        </Header>
        <Content>
          <p>
            {chainNameList.length > 1
              ? t('network.switchToEither', {
                  networkNameList: intlFormatter.format(chainNameList),
                })
              : t('network.switchTo', {
                  networkName: intlFormatter.format(chainNameList),
                })}
          </p>
        </Content>
        <Footer>
          <Button onClick={() => activateConnector(connector)}>{t('switchNetwork')}</Button>
          <Button onClick={closeModal}>{t('close')}</Button>
        </Footer>
      </Modal>
    );
  }

  // A connector is being activated
  if (isActivatingAConnector) {
    return (
      <Modal>
        <Header>
          <h2>{t('error.wrongNetwork')}</h2>
        </Header>
        <Content>
          <LoaderWrapper>
            <Loader size={72} />
          </LoaderWrapper>
        </Content>
      </Modal>
    );
  }

  // A wallet is not connected, show the list of connectors
  return (
    <Modal>
      <Header>
        <h2>{t('connectWallet')}</h2>
      </Header>
      <Content>
        <ConnectorListWrapper>
          {connectors.map(({ connector, name }) => {
            return (
              <Button
                key={name}
                onClick={() =>
                  activateConnector(connector)
                    .then(() => {
                      navigate.push('/domains');
                    })
                    .catch(console.error)
                }
              >
                {name}
              </Button>
            );
          })}
        </ConnectorListWrapper>
      </Content>
      <Footer>
        <Button onClick={closeModal}>{t('close')}</Button>
      </Footer>
    </Modal>
  );
}
