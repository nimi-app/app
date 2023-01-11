import Head from 'next/head';
import { useRouter } from 'next/router';

import { Container } from '../../../components/Container';
import { CreateNimi } from '../../../components/CreateNimi';
import { CreateNimiContainer } from '../../../components/CreateNimi/CreateNimiContainer';
import { Loader } from '../../../components/Loader';
import { useAvaliableThemesFromPoaps } from '../../../hooks/useAvaliableThemesFromPoaps';
import { useInitialtNimiData } from '../../../hooks/useDefaultNimiData';
import { useRainbow } from '../../../hooks/useRainbow';
import { PageLayout } from '../../../layout';
import { insertPoapWidgetIntoNimi } from '../../../utils';

export default function CreateNimiPage() {
  const { account } = useRainbow();

  const router = useRouter();
  const { domain } = router.query;

  const { avaliableThemes, isLoading: isThemeLoading, hasPoaps } = useAvaliableThemesFromPoaps(account);

  const { data: initialNimi, loading: initialNimiLoading } = useInitialtNimiData({
    ensName: domain as string,
    account: account as string,
  });

  return (
    <>
      <Head>
        <title>Create Nimi for {domain}</title>
      </Head>
      <PageLayout>
        <Container>
          {initialNimiLoading || initialNimi === undefined || isThemeLoading ? (
            <Loader />
          ) : (
            <CreateNimi
              ensAddress={account as string}
              ensName={domain as string}
              availableThemes={avaliableThemes}
              initialNimi={insertPoapWidgetIntoNimi(initialNimi, hasPoaps, account)}
            />
          )}
        </Container>
      </PageLayout>
    </>
  );
}
