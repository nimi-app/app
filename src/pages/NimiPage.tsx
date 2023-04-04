import { AddressZero } from '@ethersproject/constants';

import { NimiPage as NimiPageRender, ToastProvider } from '@nimi.io/card';
import { NimiThemeType } from '@nimi.io/card/types';
import { useIykRefCheck } from 'api/RestAPI/hooks/useIykHooks';
import { useCheckIfUserHasPaopEvent, usePoapTokens } from 'api/RestAPI/hooks/useUserPOAPs';
import { Loader, LoaderWrapper } from 'components/Loader';
import { OpacityMotion } from 'components/motion';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { ClaimModalState, ClaimPOAPModal } from '../components/ClaimPOAPModal';
import { useInitialtNimiData } from '../hooks/useDefaultNimiData';

/**
 * Renders any valid ENS name nimi page on the path /:nimiUsername.
 * Example: https://nimi.io/dvve.eth will attempt to render the Nimi page for the ENS name dvve.eth
 */
export default function NimiPage() {
  const { nimiUsername } = useParams();

  const [searchParams] = useSearchParams();
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(true);
  const [claimStep, setClaimStep] = useState(ClaimModalState.INITIAL);
  const iykRef = searchParams.get('iykRef');
  console.log('iykRef', iykRef);

  const { data: iykResponse, isLoading } = useIykRefCheck({ code: iykRef });

  const { data: poapData, isLoading: isLoadingPoapData } = usePoapTokens(iykResponse?.poapEvents[0].poapEventId);

  console.log('paopData', poapData);

  console.log('IykResponse', iykResponse);

  console.log('iykResponse', iykResponse);

  const [poapReciever, setPoapReciever] = useState('');

  const { data: checkIfUserHasPoap, isLoading: isLoadingCheckIfUserHasPoap } = useCheckIfUserHasPaopEvent({
    eventId: iykResponse?.poapEvents[0].poapEventId,
    account: poapReciever && claimStep === ClaimModalState.CLAIMING ? poapReciever : undefined,
  });
  console.log('checkIfUserHasPoap', checkIfUserHasPoap);
  const handleClaimClick = () => {
    setClaimStep(ClaimModalState.CLAIMING);
  };

  const { data: initialNimi } = useInitialtNimiData({
    ensName: nimiUsername!,
    account: AddressZero, // TODO: get account from the generated NimiPage
  });

  console.log('initialNimi', initialNimi);
  return (
    <AnimatePresence initial={false}>
      {!initialNimi ? (
        <OpacityMotion key="nimi-page-loader">
          <LoaderWrapper $fullPage={true}>
            <Loader />
          </LoaderWrapper>
        </OpacityMotion>
      ) : (
        <OpacityMotion key="nimi-page-content">
          {isClaimModalOpen ? (
            <ClaimPOAPModal
              setReciever={setPoapReciever}
              reciever={poapReciever}
              onClaimClick={handleClaimClick}
              name={nimiUsername}
              claimStep={claimStep}
              dark={initialNimi.theme.type === NimiThemeType.RAAVE}
              closeModal={() => setIsClaimModalOpen(false)}
            />
          ) : null}
          <ButtonList onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setClaimStep(ClaimModalState.INITIAL)}>Initial</button>
            <button onClick={() => setClaimStep(ClaimModalState.CLAIMING)}>Claiming</button>
            <button onClick={() => setClaimStep(ClaimModalState.SUCCESS)}>Success</button>
            <button onClick={() => setClaimStep(ClaimModalState.CLAIMED)}>Claimed</button>
            <button onClick={() => setClaimStep(ClaimModalState.ERROR)}>Error</button>
          </ButtonList>
          <ToastProvider>
            <NimiPageRender nimi={initialNimi} isApp={true} />
          </ToastProvider>
        </OpacityMotion>
      )}
    </AnimatePresence>
  );
}

const ButtonList = styled.div`
  position: absolute;
  left: 0;
  top: 10;
  z-index: 3;
`;
