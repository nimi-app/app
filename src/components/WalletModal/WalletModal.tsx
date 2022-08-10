import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { ChainIdNotAllowedError } from '@web3-react/store';
import { WalletConnect } from '@web3-react/walletconnect';
import { MetaMask } from '@web3-react/metamask';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';

import { Connector } from '@web3-react/types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWallet } from '@solana/wallet-adapter-react/lib/cjs';

import { Button } from '../Button';
import { LoaderWrapper as LoaderWrapperBase, Loader } from '../Loader';

import { useCloseModals, useModalOpen } from '../../state/application/hooks';
import { ChainId, getAddChainParameters, CHAINS, ENV_SUPPORTED_CHAIN_IDS } from '../../constants';
import { ApplicationModal } from '../../state/application/actions';
import { getName, useWeb3Connectors } from '../../connectors';
import { shortenAddress, shortenString } from '../../utils';

import { Modal, Header, Footer, Content } from '../Modal';
import { ConnectorListWrapper } from './styled';
import { useNavigate } from 'react-router-dom';

import { AppState } from '../../state';
import { useSelector } from 'react-redux';
import { ActiveNetworkState, useActiveNetwork } from '../../context/ActiveNetwork';

const LoaderWrapper = styled(LoaderWrapperBase)`
  padding-bottom: 16px;
`;

export function WalletModal() {
  const { t } = useTranslation();

  const { connector, isActive, account, error } = useWeb3React();

  const { wallets, connect } = useWallet();
  const { activeNetwork, setActiveNetwork } = useActiveNetwork();

  const isModalOpen = useModalOpen(ApplicationModal.WALLET_SWITCHER);
  const connectors = useWeb3Connectors();
  const closeModal = useCloseModals();
  const navigate = useNavigate();

  // Internal state
  const [isActivatingAConnector, setIsActivatingAConnector] = useState(false);

  const [pendingError, setPendingError] = useState<Error | undefined>();
  const isWrongNetwork = pendingError instanceof ChainIdNotAllowedError;
  const phantomWallet = useSelector((state: AppState) => state.application.phantomWallet);

  console.log('isInstalled', wallets);
  const isSolana = true;
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

  if (!isActive && wallets[0].readyState == 'Installed') {
    console.log('here');
    return (
      <Modal>
        <Header>Select Soalana or Ethereum</Header>
        <Footer>
          <Button onClick={() => connect()}>Solana</Button>
          <Button onClick={() => console.log('here')}>Ethereum</Button>
          <Button onClick={closeModal}>{t('close')}</Button>
        </Footer>
        ;
      </Modal>
    );
  }
  if ((account && isActive) || wallets) {
    // A wallet is connected on the right network
    return (
      <Modal>
        <Header>
          <h2>{t('wallet')}</h2>
        </Header>
        <Content>
          <p>
            {activeNetwork === ActiveNetworkState.SOLANA
              ? 'solana'
              : t('connectedViaConnector', {
                  connectorName: getName(connector),
                })}
          </p>
          <p>
            {activeNetwork ? shortenString(phantomWallet.publicKey.toString()) : account ? shortenAddress(account) : ''}
          </p>
        </Content>
        <Footer>
          <Button onClick={() => connector.deactivate()}>{t('disconnect')}</Button>
          <Button onClick={closeModal}>{t('close')}</Button>
        </Footer>
      </Modal>
    );
  }

  // On wrong networks, invite the user to switch to supported chains
  if (isWrongNetwork || !isSolana) {
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
                      navigate('/domains');
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
