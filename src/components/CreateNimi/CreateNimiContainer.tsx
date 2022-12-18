import { Container } from '../../components/Container';
import { CreateNimi } from '../../components/CreateNimi';
import { Loader } from '../../components/Loader';
import { useAvaliableThemesFromPoaps } from '../../hooks/useAvaliableThemesFromPoaps';
import { useInitialtNimiData } from '../../hooks/useDefaultNimiData';
import { useRainbow } from '../../hooks/useRainbow';

type CreateNimiContainerProps = {
  ensName: string;
};

export function CreateNimiContainer({ ensName }: CreateNimiContainerProps) {
  const { account, provider } = useRainbow();

  //check if user has certain poap
  const {
    avaliableThemes,
    isLoading: isThemeLoading,
    hasPoaps,
  } = useAvaliableThemesFromPoaps({
    account,
  });

  //check for users current Nimi profile data or else adds data generated from ens
  const { data: initialNimi, loading: initialNimiLoading } = useInitialtNimiData({
    ensName,
    account,
  });

  if (initialNimiLoading || initialNimi === undefined || isThemeLoading) {
    return <Loader />;
  }
  console.log('TODO: add poap widget is user has poaps via hasPaops:', hasPoaps);
  return (
    <Container>
      <CreateNimi
        ensAddress={account as string}
        ensName={ensName as string}
        provider={provider as any}
        availableThemes={avaliableThemes}
        initialNimi={initialNimi}
      />
    </Container>
  );
}
