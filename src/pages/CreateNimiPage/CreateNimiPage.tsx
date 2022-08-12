import { namehash as ensNameHash } from '@ethersproject/hash';
import { useLocation, useParams } from 'react-router-dom';

import { useGetDomainFromSubgraphQuery } from '../../generated/graphql/ens';
import { CreateNimi } from '../../components/CreateNimi';
import { Loader } from '../../components/Loader';
import { Container } from '../../components/Container';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { AppState } from '../../state';

export function CreateNimiPage() {
  const { account } = useWeb3React();
  const { state } = useLocation();
  const data = useParams();
  const nodeHash = ensNameHash(data.ensName as string);

  const phantomWallet = useSelector((state: AppState) => state.application.phantomWallet);
  console.log('validator', phantomWallet);
  console.log('data', data);
  const isSolana = true;

  /**
   * @todo - prevent accessing if the user does not own the domain
   */
  const {
    data: subgraphData,
    loading,
    error,
  } = useGetDomainFromSubgraphQuery({
    variables: {
      domainId: nodeHash.toLowerCase(),
    },
  });

  if (loading) {
    return <Loader />;
  }

  // if (error || !data || !data.domain || ) {
  //   return <div>{error?.message}</div>;
  // }

  console.log('solana', state);

  return (
    <Container>
      <CreateNimi
        ensAddress={'0x26358E62C2eDEd350e311bfde51588b8383A9315'}
        ensName={
          isSolana && data.ensName
            ? data.ensName.toString()
            : subgraphData?.domain?.name
            ? (subgraphData.domain.name as string)
            : ''
        }
        ensLabelName={
          isSolana && data.reverse
            ? data.reverse
            : subgraphData?.domain?.labelName
            ? (subgraphData.domain.labelName as string)
            : ''
        }
        solanaAddress={isSolana && phantomWallet && phantomWallet.publicKey.toString()}
        solanaData={state}
      />
    </Container>
  );
}
