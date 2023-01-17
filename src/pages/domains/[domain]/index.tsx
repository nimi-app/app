import { Nimi, POAPToken } from '@nimi.io/card/types';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { fetchUserPOAPs } from '../../../api/RestAPI/hooks/usePoapsFromUser';
import { nimiClient } from '../../../api/RestAPI/utils';
import { Container } from '../../../components/Container';
import { CreateNimi } from '../../../components/CreateNimi';
import { getAvailableThemesByPOAPs } from '../../../hooks/useAvaliableThemesFromPoaps';
import { PageLayout } from '../../../layout';
import { insertPoapWidgetIntoNimi } from '../../../utils';

interface NimiSnapshot {
  publisher: string;
  cid: string | null;
  nimi: Nimi;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export async function fetchNimiIPNS(ensName: string) {
  const url = `http://127.0.0.1:4002/ens/has-nimi-ipns?domain=${ensName}`;

  const rawResponse = await fetch(url, {
    method: 'GET',
  }).then();

  if (!rawResponse.ok) {
    throw new Error('Network response was not ok');
  }

  const data = (await rawResponse.json()) as {
    data: {
      ipns?: string;
      nimi?: NimiSnapshot;
    };
  };

  return data.data;
}

export async function generateNimiFromENS(ensName: string) {
  const { data } = await nimiClient.get<{
    data: {
      nimi: Nimi;
    };
  }>(`/nimi/generate`, {
    params: {
      domain: ensName,
    },
  });

  return data.data;
}

interface CreateNimiPageProps {
  availableThemes: ReturnType<typeof getAvailableThemesByPOAPs>;
  domain: string;
  ipnsKey?: string;
  nimiSnapshot?: NimiSnapshot;
  initialNimi: Nimi;
  poapList: POAPToken[];
}

// This is the page that will be server side rendered
export async function getServerSideProps(
  context: GetServerSidePropsContext<{
    domain: string;
  }>
): Promise<{
  props: CreateNimiPageProps;
}> {
  let props = {
    availableThemes: [],
    domain: context?.params?.domain,
    initialNimi: {} as Nimi,
    poapList: [],
  } as CreateNimiPageProps;

  try {
    if (!context?.params?.domain || context?.params?.domain === '[object Object]') {
      throw new Error('No domain provided');
    }

    const domain = context.params.domain;
    // Nimi Snapshot from the API
    const nimiIPNSSnapshot = await fetchNimiIPNS(domain);
    // If the user has a Nimi IPNS, redirect to the Nimi page
    if (nimiIPNSSnapshot.ipns && nimiIPNSSnapshot.nimi) {
      props = {
        ...props,
        ipnsKey: nimiIPNSSnapshot.ipns,
        nimiSnapshot: nimiIPNSSnapshot.nimi,
        initialNimi: nimiIPNSSnapshot.nimi.nimi,
      };
    } else {
      const { nimi } = await generateNimiFromENS(domain);
      props['initialNimi'] = nimi;
    }

    if (!props.initialNimi) {
      throw new Error('No Nimi found');
    }

    // Attempt to load
    const poapList = await fetchUserPOAPs(props.initialNimi.ensAddress as string);
    const availableThemes = getAvailableThemesByPOAPs(poapList);

    if (poapList) {
      props = {
        ...props,
        poapList,
        availableThemes,
      };
    }
  } catch (e) {
    console.log(e);
  }
  // If the user doesn't have a Nimi IPNS, generate a Nimi from the ENS name
  return { props };
}

export default function CreateNimiPage({
  domain,
  ipnsKey,
  initialNimi,
  poapList,
  availableThemes,
}: Awaited<ReturnType<typeof getServerSideProps>>['props']) {
  return (
    <>
      <Head>
        <title>Create Nimi for {domain}</title>
      </Head>
      <PageLayout>
        <Container>
          <CreateNimi
            ensAddress={initialNimi?.ensAddress as string}
            ensName={domain}
            availableThemes={availableThemes}
            initialNimi={insertPoapWidgetIntoNimi(initialNimi, poapList.length > 0, initialNimi?.ensAddress)}
            nimiIPNSKey={ipnsKey}
          />
        </Container>
      </PageLayout>
    </>
  );
}
