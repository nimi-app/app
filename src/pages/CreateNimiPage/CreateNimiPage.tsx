import { useParams } from 'react-router-dom';
import { namehash as ensNameHash } from '@ethersproject/hash';

import { useGetDomainFromSubgraphQuery } from '../../generated/graphql/ens';
import { CreateNimi } from '../../components/CreateNimi';
import { Loader } from '../../components/Loader';
import { Container } from '../../components/Container';
import { useWeb3React } from '@web3-react/core';
import { SUPPORTED_CHAIN_IDS } from '../../constants';
import { useAvaliableThemesFromPoaps } from '../../hooks/useAvaliableThemesFromPoaps';
import { useEnsGeneratedData } from '../../hooks/useEnsGeneratedData';

export function CreateNimiPage() {
  const { account, provider, chainId } = useWeb3React();

  const { ensName } = useParams();

  const nodeHash = ensNameHash(ensName as string);
  console.log('search', ensName);

  /**
   * @todo - prevent accessing if the user does not own the domain
   */
  const { data, loading, error } = useGetDomainFromSubgraphQuery({
    variables: {
      domainId: nodeHash.toLowerCase(),
    },
  });
  //check if user has certain poap
  const { avaliableThemes, loading: themeLoading } = useAvaliableThemesFromPoaps({
    account,
  });
  //populate with ens data
  const { generatedData, loading: loadingEnsData } = useEnsGeneratedData({
    ensName: ensName,
  });
  console.log('generatedDta', generatedData);

  if (themeLoading || loadingEnsData || loading) {
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
        ensData={generatedData}
      />
    </Container>
  );
}
