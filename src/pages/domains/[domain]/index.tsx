import { NimiThemeType } from '@nimi.io/card';
import { createPOAPClient, fetchUserPOAPs } from '@nimi.io/card/api';
import { Nimi, POAPToken } from '@nimi.io/card/types';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { fetchNimiIPNS, generateNimiFromENS } from '../../../api/RestAPI/nimi';
import { getNimiAPIClient } from '../../../api/RestAPI/utils';
import { Container } from '../../../components/Container';
import { CreateNimi } from '../../../components/CreateNimi';
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

  try {
    const domain = context?.params?.domain;

    if (!domain || domain === '[object Object]') {
      throw new Error('No domain provided');
    }
    const nimiAPIClient = getNimiAPIClient();
    // Nimi Snapshot from the API
    const nimiIPNSSnapshot = await fetchNimiIPNS(nimiAPIClient, domain);

    // If the user has a Nimi IPNS, redirect to the Nimi page
    if (nimiIPNSSnapshot.ipns && nimiIPNSSnapshot.nimi) {
      props = {
        ...props,
        ipnsKey: nimiIPNSSnapshot.ipns,
        nimiSnapshot: nimiIPNSSnapshot.nimi,
        initialNimi: nimiIPNSSnapshot.nimi.nimi,
      };
    } else {
      props.initialNimi = await generateNimiFromENS(nimiAPIClient, domain);
    }

    if (!props.initialNimi) {
      throw new Error('No Nimi found');
    }

    // Attempt to load
    const poapList = await fetchUserPOAPs(
      createPOAPClient(process.env.NEXT_PUBLIC_POAP_API_KEY as string),
      props.initialNimi.ensAddress as string
    );

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
