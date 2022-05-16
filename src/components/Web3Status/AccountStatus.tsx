import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Network as NetworkConnector } from '@web3-react/network';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ChainId, getChainLabel } from '../../constants';
import { ENSAvatarData } from '../../hooks/useENSAvatar';
import { shortenAddress } from '../../utils';
import { TYPE } from '../../theme';

const View = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  margin-left: auto;
  background-color: ${({ theme }) => theme.dark1};
  border: solid 2px transparent;
  color: ${({ theme }) => theme.purple2};
  border-radius: 12px;
  white-space: nowrap;
  margin-left: 8px;
  padding: 1px;
`;

const Web3StatusConnected = styled.button<{ pending?: boolean }>`
  height: 29px;
  padding: 0 8px;
  background: none;
  border: none;
  color: ${({ pending, theme }) => (pending ? theme.white : theme.text4)};
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
`;

const Web3StatusNetwork = styled.button<{ pendingTransactions?: boolean; isConnected: boolean; clickable: boolean }>`
  display: flex;
  align-items: center;
  height: 26px;
  padding: 7px 8px;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  border-radius: 10px;
  background-color: ${({ theme, isConnected }) => (isConnected ? theme.dark2 : 'transparent')};
  border: none;
  outline: none;
  cursor: ${(props) => (props.clickable ? 'pointer' : 'initial')};
`;

const NetworkName = styled.div`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `};
`;

const AddressDesktop = styled.span`
  display: block;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `};
`;

const AddressMobile = styled.span`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
  `};
`;

export interface StyledAvatarProps {
  url: string;
}

interface AccountStatusProps {
  ENSName?: string;
  avatar?: ENSAvatarData;
  account: string | undefined | null;
  connector: AbstractConnector | undefined;
  networkConnectorChainId: ChainId | undefined;
  onAddressClick: () => void;
}

export function AccountStatus({
  ENSName,
  account,
  connector,
  networkConnectorChainId,
  onAddressClick,
  avatar,
}: AccountStatusProps) {
  const [networkSwitchingActive, setNetworkSwitchingActive] = useState(false);

  useEffect(() => {
    setNetworkSwitchingActive(
      connector instanceof NetworkConnector ||
        connector instanceof InjectedConnector ||
        connector instanceof AbstractConnector
    );
  }, [connector]);

  if (!networkConnectorChainId) return null;

  return (
    <View>
      {account && (
        <Web3StatusConnected id="web3-status-connected" onClick={onAddressClick}>
          <>
            <AddressDesktop>{shortenAddress(account)}</AddressDesktop>
            <AddressMobile>{shortenAddress(account, 2)}</AddressMobile>
          </>
        </Web3StatusConnected>
      )}
      <div>
        <Web3StatusNetwork
          clickable={networkSwitchingActive}
          onClick={
            networkSwitchingActive
              ? () => {
                  setNetworkSwitchingActive(false);
                }
              : undefined
          }
          isConnected={!!account}
        >
          {account && (
            <NetworkName>
              <TYPE.White ml="8px" fontWeight={700} fontSize="12px">
                {getChainLabel(networkConnectorChainId)}
              </TYPE.White>
            </NetworkName>
          )}
        </Web3StatusNetwork>
      </div>
    </View>
  );
}
