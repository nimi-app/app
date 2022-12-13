import { Nimi } from '@nimi.io/card';
import createDebugger from 'debug';
import { useEffect, useState } from 'react';

import { Container } from '../../components/Container';
import { CreateNimi } from '../../components/CreateNimi';
import { Loader } from '../../components/Loader';
import { useAvaliableThemesFromPoaps } from '../../hooks/useAvaliableThemesFromPoaps';
import { useDefaultNimiData } from '../../hooks/useDefaultNimiData';
import { useRainbow } from '../../hooks/useRainbow';
import { fetchGeneratedNimi, fetchNimiDataByENSName } from '../../modules/api-service';

type CreateNimiContainerProps = {
  ensName: string;
};

const debug = createDebugger('CreateNimiContainer');

export function CreateNimiContainer({ ensName }: CreateNimiContainerProps) {
  const { account, provider } = useRainbow();

  //check if user has certain poap
  const { avaliableThemes, loading: themeLoading } = useAvaliableThemesFromPoaps({
    account,
  });

  const { data, loading: initialDataLoading } = useDefaultNimiData({
    ensName,
  });

  if (initialDataLoading || data === undefined || themeLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <CreateNimi
        ensAddress={account as string}
        ensName={ensName as string}
        provider={provider as any}
        availableThemes={avaliableThemes}
        initialNimi={data}
      />
    </Container>
  );
}
