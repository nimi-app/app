import { useWeb3React } from '@web3-react/core';
import { useParams } from 'react-router-dom';

import { CreateNimiContainer } from '../../../components/CreateNimi/CreateNimiContainer';
import { SUPPORTED_CHAIN_IDS } from '../../../constants';

export default function ManageDomainPage() {
  const { provider, chainId } = useWeb3React();

  const params = useParams<{
    'ens-name': string;
  }>();

  if (!provider) {
    return <div>Connect wallet</div>;
  }

  if (!SUPPORTED_CHAIN_IDS.includes(chainId as number)) {
    return <div>Wrong network</div>;
  }

  return <CreateNimiContainer ensName={params['ens-name'] as string} />;
}
