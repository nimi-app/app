import { NimiPage as NimiPageRender } from '@nimi.io/card';
import { NimiThemeType } from '@nimi.io/card/types';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { ClaimModalStates, ClaimPOAPModal } from '../components/ClaimPOAPModal';
import { Spinner } from '../components/Spinner';
import { useInitialtNimiData } from '../hooks/useDefaultNimiData';

/**
 * Renders any valid ENS name nimi page on the path /:nimiUsername.
 * Example: https://nimi.io/dvve.eth will attempt to render the Nimi page for the ENS name dvve.eth
 */
export default function NimiPage() {
  const { nimiUsername } = useParams();

  const [searchParams] = useSearchParams();
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(true);
  const [claimStep, setClaimStep] = useState(ClaimModalStates.CLAIMED);

  const [poapReciever, setPoapReciever] = useState('');

  const iykCode = searchParams.get('iykClaimCode');

  const handleClaimClick = () => {
    setClaimStep(ClaimModalStates.CLAIMING);
    console.log('claim', iykCode);
  };

  const { data: initialNimi, loading: initialNimiLoading } = useInitialtNimiData({
    ensName: nimiUsername!,
    account: '0x26358E62C2eDEd350e311bfde51588b8383A9315',
  });

  if (initialNimiLoading || !initialNimi) {
    return <Spinner />;
  }

  return (
    <>
      {iykCode && isClaimModalOpen && (
        <ClaimPOAPModal
          setReciever={setPoapReciever}
          reciever={poapReciever}
          onClaimClick={handleClaimClick}
          claimStep={claimStep}
          // dark={initialNimi.theme.type === NimiThemeType.RAAVE}
          dark={false}
          closeModal={() => setIsClaimModalOpen(false)}
        />
      )}

      <NimiPageRender nimi={initialNimi} isApp={true} />
    </>
  );
}
