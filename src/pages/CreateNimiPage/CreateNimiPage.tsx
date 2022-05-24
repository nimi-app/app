import { namehash as ensNameHash } from '@ethersproject/hash';
import { useParams } from 'react-router-dom';

import { useGetDomainFromSubgraphQuery } from '../../generated/graphql';
import { CreateNimi } from '../../components/CreateNimi';
import { Loader } from '../../components/Loader';
import { Container } from '../../components/Container';

export function CreateNimiPage() {
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
      <CreateNimi name={data.domain.name as string} labelName={data.domain.labelName as string} />
    </Container>
  );
}
