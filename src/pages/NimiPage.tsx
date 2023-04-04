import { AddressZero } from '@ethersproject/constants';

import { NimiPageProvider, NimiPage as NimiPageRender, ToastProvider } from '@nimi.io/card';
import { NimiThemeType } from '@nimi.io/card/types';
import { useIykRefCheck, useMintIykPoapToken } from 'api/RestAPI/hooks/useIykHooks';
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

  const [poapReciever, setPoapReciever] = useState('');
  const [searchParams] = useSearchParams();
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(true);

  const [claimStep, setClaimStep] = useState(ClaimModalState.INITIAL);
  const iykRef = searchParams.get('iykRef');

  const { data: initialNimi } = useInitialtNimiData({
    ensName: nimiUsername!,
    account: AddressZero, // TODO: get account from the generated NimiPage
  });

  const { data: iykResponse, isLoading } = useIykRefCheck({ code: iykRef });
  console.log(' iykResponse', iykResponse);
  console.log('isLoading', isLoading);

  const { mutateAsync } = useMintIykPoapToken();

  const { data: poapData } = usePoapTokens(iykResponse?.poapEvents[0].poapEventId);

  const { refetch: checkIfUserHasPoapAsync, error } = useCheckIfUserHasPaopEvent({
    eventId: iykResponse?.poapEvents[0].poapEventId,
    account: poapReciever,
    enabled: false,
  });

  console.log('HasntPoapError', error);
  const handleClaimClick = async () => {
    setClaimStep(ClaimModalState.CLAIMING);
    const checkIfUserHasPoap = await checkIfUserHasPoapAsync();
    console.log('response', checkIfUserHasPoap);
    if (checkIfUserHasPoap?.data) {
      console.log('claimedBy', checkIfUserHasPoap?.data.owner);

      setClaimStep(ClaimModalState.CLAIMED);
      return;
    } else {
      const data = await mutateAsync({
        otpCode: iykResponse?.poapEvents[0].otp,
        recipient: poapReciever,
        poapEventId: iykResponse?.poapEvents[0].poapEventId,
      });
      console.log('DATA IM LOOKNОР FOR', data);
      if (data.success) {
        setClaimStep(ClaimModalState.SUCCESS);
      } else {
        setClaimStep(ClaimModalState.ERROR);
      }

      console.log('data', data);
      return;
    }
  };

  console.log('initialNimi', initialNimi);
  return (
    <AnimatePresence initial={false}>
      {!initialNimi || isLoading ? (
        <OpacityMotion key="nimi-page-loader">
          <LoaderWrapper $fullPage={true}>
            <Loader />
          </LoaderWrapper>
        </OpacityMotion>
      ) : (
        <OpacityMotion key="nimi-page-content">
          {isClaimModalOpen && iykResponse?.isValidRef ? (
            <ClaimPOAPModal
              poapUrl={poapData?.data.image_url}
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
            <NimiPageProvider poapAPIKey={process.env.REACT_APP_POAP_API_KEY as string}>
              <NimiPageRender nimi={initialNimi} mode={'app'} />
            </NimiPageProvider>
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
