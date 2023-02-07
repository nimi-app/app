import { useIPNSData } from '../../api/RestAPI/hooks/useIPNSData';
import { Container } from '../../components/Container';
import { CreateNimi } from '../../components/CreateNimi';
import { Loader } from '../../components/Loader';
import { useAvaliableThemesFromPoaps } from '../../hooks/useAvaliableThemesFromPoaps';
import { useInitialtNimiData } from '../../hooks/useDefaultNimiData';
import { useRainbow } from '../../hooks/useRainbow';
import { insertPoapWidgetIntoNimi } from '../../utils';

type CreateNimiContainerProps = {
  ensName: string;
};

export function CreateNimiContainer({ ensName }: CreateNimiContainerProps) {
  const { account } = useRainbow();

  //check if user has certain poap
  const { avaliableThemes, isLoading: isThemeLoading, hasPoaps } = useAvaliableThemesFromPoaps(account);

  //check for users current Nimi profile data or else adds data generated from ens
  const { data: initialNimi, loading: initialNimiLoading } = useInitialtNimiData({
    ensName,
    account,
  });

  const { data: IPNSDATA, isLoading: IPNSLOADING } = useIPNSData(ensName);

  if (initialNimiLoading || initialNimi === undefined || isThemeLoading || IPNSLOADING) {
    return <Loader />;
  }

  return (
    <Container>
      <CreateNimi
        ensAddress={account as string}
        ensName={ensName as string}
        availableThemes={avaliableThemes}
        initialNimi={insertPoapWidgetIntoNimi(initialNimi, hasPoaps, account)}
        nimiIPNSKey={IPNSDATA?.ipns}
      />
    </Container>
  );
}
