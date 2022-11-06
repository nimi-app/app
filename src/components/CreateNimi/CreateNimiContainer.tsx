import { CreateNimi } from '../../components/CreateNimi';
import { Loader } from '../../components/Loader';
import { Container } from '../../components/Container';
import { useWeb3React } from '@web3-react/core';
import { useAvaliableThemesFromPoaps } from '../../hooks/useAvaliableThemesFromPoaps';
import { useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { fetchGeneratedNimi, fetchNimiDataByENSName } from '../../modules/api-service';
import { Nimi } from '@nimi.io/card';

type CreateNimiContainerProps = {
  ensName: string;
};

export function CreateNimiContainer({ ensName }: CreateNimiContainerProps) {
  const { account, provider } = useWeb3React();
  const [initialNimi, setInitialNimi] = useState<Nimi>();
  const [isLoading, setIsLoading] = useState(true);

  //check if user has certain poap
  const { avaliableThemes, loading: themeLoading } = useAvaliableThemesFromPoaps({
    account,
  });

  useEffect(() => {
    // Check for previous nimi snapshot

    const fetchInitialNimi = async () => {
      try {
        const nimiData = await fetchNimiDataByENSName(ensName);
        console.log(nimiData);
        if (nimiData) {
          setInitialNimi(nimiData.nimi);
          return;
        }
        // If no previous nimi snapshot, generate the initial nimi
        const initialGeneratedNimi = await fetchGeneratedNimi(ensName);
        if (initialGeneratedNimi) {
          setInitialNimi(initialGeneratedNimi);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialNimi();
  }, [ensName]);

  if (isLoading || themeLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <CreateNimi
        ensAddress={account as string}
        ensName={ensName as string}
        provider={provider as Web3Provider}
        availableThemes={avaliableThemes}
        initialNimi={initialNimi}
      />
    </Container>
  );
}
