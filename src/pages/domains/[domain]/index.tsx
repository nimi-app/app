import { NimiThemeType } from '@nimi.io/card';
import { createPOAPClient, fetchUserPOAPs } from '@nimi.io/card/api';
import { Nimi, POAPToken } from '@nimi.io/card/types';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mainnet } from 'wagmi';

import { fetchNimiIPNS, generateNimiFromENS } from '../../../api/RestAPI/nimi';
import { getNimiAPIClient } from '../../../api/RestAPI/utils';
import { Container } from '../../../components/Container';
import { CreateNimi } from '../../../components/CreateNimi';
import { Loader, LoaderWrapper } from '../../../components/Loader';
import { getAvailableThemesByPOAPs } from '../../../hooks/useAvaliableThemesFromPoaps';
import { PageLayout } from '../../../layout';
import { insertPoapWidgetIntoNimi } from '../../../utils';

interface CreateNimiPageProps {
  availableThemes: ReturnType<typeof getAvailableThemesByPOAPs>;
  domain: string;
  ipnsKey?: string;
  nimiSnapshot?: Awaited<ReturnType<typeof fetchNimiIPNS>>['nimi'];
  initialNimi: Nimi;
  poapList: POAPToken[];
}

function CreateNimiContainer({ domain }: { domain: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [ipnsKey, setIpnsKey] = useState<string>();
  const [initialNimi, setInitialNimi] = useState<Nimi>({
    displayName: '',
    ensAddress: '',
    ensName: '',
    addresses: [],
    widgets: [],
    links: [],
    theme: {
      type: NimiThemeType.NIMI,
    },
  } as Nimi);
  const [poapList, setPoapList] = useState<POAPToken[]>([]);
  const [availableThemes, setAvailableThemes] = useState<ReturnType<typeof getAvailableThemesByPOAPs>>([]);

  useEffect(() => {
    async function fetchNimi() {
      try {
        let props = {
          availableThemes: [],
          domain,
          initialNimi: {
            displayName: '',
            ensAddress: '',
            ensName: '',
            addresses: [],
            widgets: [],
            links: [],
            theme: {
              type: NimiThemeType.NIMI,
            },
          } as Nimi,
          poapList: [],
        } as CreateNimiPageProps;

        if (!domain || domain === '[object Object]') {
          throw new Error('No domain provided');
        }
        const nimiAPIClient = getNimiAPIClient();
        // Nimi Snapshot from the API
        const nimiIPNSSnapshot = await fetchNimiIPNS(nimiAPIClient, domain, mainnet.id);

        // If the user has a Nimi IPNS, redirect to the Nimi page
        if (nimiIPNSSnapshot.ipns && nimiIPNSSnapshot.nimi) {
          props = {
            ...props,
            ipnsKey: nimiIPNSSnapshot.ipns,
            nimiSnapshot: nimiIPNSSnapshot.nimi,
            initialNimi: nimiIPNSSnapshot.nimi.nimi,
          };
        } else {
          props.initialNimi = await generateNimiFromENS(nimiAPIClient, domain, mainnet.id);
        }

        if (!props.initialNimi) {
          throw new Error('No Nimi found');
        }

        // Attempt to load
        const poapList = await fetchUserPOAPs(
          createPOAPClient(process.env.NEXT_PUBLIC_POAP_API_KEY as string),
          props.initialNimi.ensAddress as string
        );

        setPoapList(poapList);
        setInitialNimi(props.initialNimi);
        setIpnsKey(props.ipnsKey);
        setAvailableThemes(getAvailableThemesByPOAPs(poapList));
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    fetchNimi();
  }, [domain]);

  console.log({
    availableThemes,
    domain,
    ipnsKey,
    initialNimi,
  });

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

    return <div>Loading...</div>;
  }

  return (
    <CreateNimi
      ensAddress={initialNimi?.ensAddress as string}
      ensName={domain}
      availableThemes={availableThemes}
      initialNimi={insertPoapWidgetIntoNimi(initialNimi, poapList.length > 0, initialNimi?.ensAddress)}
      nimiIPNSKey={ipnsKey}
    />
  );
}

export default function CreateNimiPage() {
  const router = useRouter();
  const { domain } = router.query;

  const title = `Create Nimi for ${domain}`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <PageLayout>
        <Container>
          <CreateNimiContainer domain={domain as string} />
        </Container>
      </PageLayout>
    </>
  );
}
