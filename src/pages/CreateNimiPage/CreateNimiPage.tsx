import { namehash as ensNameHash } from '@ethersproject/hash';
import { useParams } from 'react-router-dom';

import { useGetDomainFromSubgraphQuery } from '../../generated/graphql';
import { CreateNimi } from '../../components/nimi/CreateNimi/CreateNimi';
import { Loader } from '../../components/Loader';
import { Container } from '../../components/Container';

export function CreateNimiPage() {
  const { ensName } = useParams();
  const nodeHash = ensNameHash(ensName as string);

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
