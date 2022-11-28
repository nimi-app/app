import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { SUPPORTED_CHAIN_IDS } from '../../constants';
import { CreateNimiContainer } from '../../components/CreateNimi/CreateNimiContainer';
import { useWalletSwitcherPopoverToggle } from '../../state/application/hooks';
import { Button } from '../../components/Button';
import { useTranslation } from 'react-i18next';

export function CreateNimiPage() {
  const { t } = useTranslation();
  const { provider, chainId } = useWeb3React();
  const openWalletSwitcherPopover = useWalletSwitcherPopoverToggle();
  const { ensName } = useParams();

  if (!provider || !chainId || !SUPPORTED_CHAIN_IDS.includes(chainId)) {
    return <Button onClick={openWalletSwitcherPopover}>{t('connectWallet')}</Button>;
  }

  return <CreateNimiContainer ensName={ensName as string} />;
}
