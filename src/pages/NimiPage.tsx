import { NimiPage as NimiPageRender } from '@nimi.io/card';
import { NimiThemeType } from '@nimi.io/card/types';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';

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
  const [claimStep, setClaimStep] = useState(ClaimModalStates.INITIAL);

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
      <AnimatePresence initial={false}>
        {iykCode && isClaimModalOpen && (
          <ClaimPOAPModal
            setReciever={setPoapReciever}
            reciever={poapReciever}
            onClaimClick={handleClaimClick}
            claimStep={claimStep}
            dark={initialNimi.theme.type === NimiThemeType.RAAVE}
            closeModal={() => setIsClaimModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <ButtonList onClick={(event) => event.stopPropagation()}>
        <button onClick={() => setClaimStep(ClaimModalStates.INITIAL)}>Initial</button>
        <button onClick={() => setClaimStep(ClaimModalStates.CLAIMING)}>Claiming</button>
        <button onClick={() => setClaimStep(ClaimModalStates.SUCCESS)}>Success</button>
        <button onClick={() => setClaimStep(ClaimModalStates.CLAIMED)}>Claimed</button>
        <button onClick={() => setClaimStep(ClaimModalStates.ERROR)}>Error</button>
      </ButtonList>

      <NimiPageRender nimi={initialNimi} isApp={true} />
    </>
  );
}

const ButtonList = styled.div`
  position: absolute;
  left: 0;
  top: 10;
  z-index: 3;
`;
