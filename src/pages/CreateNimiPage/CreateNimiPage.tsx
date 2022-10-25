import { useParams } from 'react-router-dom';
import { useGetDomainFromSubgraphQuery } from '../../generated/graphql/ens';
import { CreateNimi } from '../../components/CreateNimi';
import { Loader } from '../../components/Loader';
import { Container } from '../../components/Container';
import { useWeb3React } from '@web3-react/core';
import { SUPPORTED_CHAIN_IDS } from '../../constants';
import { useAvaliableThemesFromPoaps } from '../../hooks/useAvaliableThemesFromPoaps';
import { namehash } from '@ethersproject/hash';

export function CreateNimiPage() {
  const { account, provider, chainId } = useWeb3React();

  const { ensName } = useParams<{
    ensName: string;
  }>();

  const domainId = namehash(ensName?.toLowerCase() || '');

  /**
   * @todo - prevent accessing if the user does not own the domain
   */
  const { data, loading, error } = useGetDomainFromSubgraphQuery({
    variables: {
      domainId,
    },
  });
  //check if user has certain poap
  const { avaliableThemes, loading: themeLoading } = useAvaliableThemesFromPoaps({
    account,
  });

  if (loading || themeLoading) {
    return <Loader />;
  }

  if (error || !data || !data.domain) {
    return <div>{error?.message}</div>;
  }

  if (!provider || !SUPPORTED_CHAIN_IDS.includes(chainId as number)) {
    return <div>Wrong network</div>;
  }

  return (
    <Container>
      <CreateNimi
        ensAddress={account as string}
        ensName={ensName as string}
        provider={provider}
        availableThemes={avaliableThemes}
      />
    </Container>
  );
}
