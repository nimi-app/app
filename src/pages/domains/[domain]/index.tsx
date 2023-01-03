import Head from 'next/head';
import { useRouter } from 'next/router';

import { CreateNimiContainer } from '../../../components/CreateNimi/CreateNimiContainer';
import { PageLayout } from '../../../layout';

export default function CreateNimiPage() {
  const router = useRouter();
  const { domain } = router.query;

  // DOn't render anything on server side
  if (typeof window === 'undefined') {
    console.log('Server side rendering');
    return null;
  }

  return (
    <>
      <Head>
        <title>Create Nimi for {domain}</title>
      </Head>
      <PageLayout>
        <CreateNimiContainer ensName={domain as string} />
      </PageLayout>
    </>
  );
}
