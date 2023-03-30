import { NimiPage as NimiPageRender } from '@nimi.io/card';
import { NimiThemeType } from '@nimi.io/card/types';
import { useParams, useSearchParams } from 'react-router-dom';

import { ClaimPOAPModal } from '../components/ClaimPOAPModal';
import { Spinner } from '../components/Spinner';
import { useInitialtNimiData } from '../hooks/useDefaultNimiData';

/**
 * Renders any valid ENS name nimi page on the path /:nimiUsername.
 * Example: https://nimi.io/dvve.eth will attempt to render the Nimi page for the ENS name dvve.eth
 */
export default function NimiPage() {
  const { nimiUsername } = useParams();
  console.log('nimiusername', nimiUsername);
  const [searchParams] = useSearchParams();
  const iykCode = searchParams.get('iykClaimCode');

  const handleClaimClick = () => {
    console.log('claim', iykCode);
  };

  const { data: initialNimi, loading: initialNimiLoading } = useInitialtNimiData({
    ensName: nimiUsername!,
    account: '0x26358E62C2eDEd350e311bfde51588b8383A9315',
  });

  if (initialNimiLoading || !initialNimi) {
    return <Spinner />;
  }
  console.log('initialNimi', initialNimi.theme);

  return (
    <>
      <NimiPageRender nimi={initialNimi} isApp={true} />
      <ClaimPOAPModal
        onClaimClick={handleClaimClick}
        dark={initialNimi.theme.type === NimiThemeType.RAAVE}
        closeModal={() => console.log('close')}
      />
    </>
  );
}
