import { namehash as ensNameHash } from '@ethersproject/hash';
import { useParams } from 'react-router-dom';

import { useGetDomainFromSubgraphQuery } from '../../generated/graphql/ens';
import { CreateNimi } from '../../components/CreateNimi';
import { Loader } from '../../components/Loader';
import { Container } from '../../components/Container';
import { useWeb3React } from '@web3-react/core';

export function CreateNimiPage() {
  const { account } = useWeb3React();
  const { ensName } = useParams();
  const nodeHash = ensNameHash(ensName as string);

  /**
   * @todo - prevent accessing if the user does not own the domain
   */
  const { data, loading, error } = useGetDomainFromSubgraphQuery({
    variables: {
      domainId: nodeHash.toLowerCase(),
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (error || !data || !data.domain) {
    return <div>{error?.message}</div>;
  }

  return (
    <Container>
      <CreateNimi
        ensAddress={account as string}
        ensName={data.domain.name as string}
        ensLabelName={data.domain.labelName as string}
      />
    </Container>
  );
}
