import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { SUPPORTED_CHAIN_IDS } from '../../constants';
import { CreateNimiContainer } from '../../components/CreateNimi/CreateNimiContainer';

export function CreateNimiPage() {
  const { provider, chainId } = useWeb3React();

  const { ensName } = useParams();

  if (!provider) {
    return <div>Connect wallet</div>;
  }

  if (!SUPPORTED_CHAIN_IDS.includes(chainId as number)) {
    return <div>Wrong network</div>;
  }

  return <CreateNimiContainer ensName={ensName as string} />;
}
