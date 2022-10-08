import { useLocation } from 'react-router-dom';

import { useGetDomainFromSubgraphQuery } from '../../generated/graphql/ens';
import { CreateNimi } from '../../components/CreateNimi';
import { Loader } from '../../components/Loader';
import { Container } from '../../components/Container';
import { useWeb3React } from '@web3-react/core';
import { SUPPORTED_CHAIN_IDS } from '../../constants';
import { useAvaliableThemesFromPoaps } from '../../hooks/useAvaliableThemesFromPoaps';

export function CreateNimiPage() {
  const { account, provider, chainId } = useWeb3React();

  const { state }: any = useLocation();

  /**
   * @todo - prevent accessing if the user does not own the domain
   */
  const { data, loading, error } = useGetDomainFromSubgraphQuery({
    variables: {
      domainId: state.id.toLowerCase(),
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
        ensName={data.domain.name as string}
        ensLabelName={data.domain.labelName as string}
        provider={provider}
        availableThemes={avaliableThemes}
      />
    </Container>
  );
}
