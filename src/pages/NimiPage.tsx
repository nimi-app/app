import { AddressZero } from '@ethersproject/constants';

import { NimiPageProvider, NimiPage as NimiPageRender, ToastProvider } from '@nimi.io/card';
import { NimiThemeType } from '@nimi.io/card/types';
import { useIYKRefQuery, useMintIYKPOAPToken } from 'api/RestAPI/hooks/useIykHooks';
import { usePOAPEventQuery, useUserHasPOAPQuery } from 'api/RestAPI/hooks/useUserPOAPs';
import { Loader, LoaderWrapper } from 'components/Loader';
import { OpacityMotion } from 'components/motion';
import { AnimatePresence } from 'framer-motion';
import { useDebounce } from 'hooks/useDebounce';
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
  // Read stored reciever address from local storage
  const poapRecieverLocalStorage = localStorage.getItem('nimiPOAPReciever');

  // Set reciever address to local storage value or empty string
  const [poapReciever, setPoapReciever] = useState(poapRecieverLocalStorage || '');
  const debouncedPOAPReciever = useDebounce(poapReciever, 500);

  // Local state for the claim modal
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(true);
  const [claimStep, setClaimStep] = useState(ClaimModalState.INITIAL);

  // Fetch the Nimi data for the ENS name
  const { data: initialNimi } = useInitialtNimiData({
    ensName: nimiUsername!,
    account: AddressZero,
  });

  // Retrieve the IYK reference from the URL and fetch its data
  const [searchParams] = useSearchParams();
  const iykRef = searchParams.get('iykRef');
  const { data: iykResponse, isLoading } = useIYKRefQuery(iykRef);

  // Retrieve the POAP event data and check if the user has already claimed the POAP
  const { data: poapEvent } = usePOAPEventQuery(iykResponse?.poapEvents[0].poapEventId);
  const { error: userHasPOAPError, data: userHasPOAPData } = useUserHasPOAPQuery({
    eventId: iykResponse?.poapEvents[0].poapEventId,
    account: debouncedPOAPReciever,
    enabled: !!debouncedPOAPReciever,
  });
  // Mint the POAP token
  const { mutateAsync: mintIYKPOAPToken } = useMintIYKPOAPToken();

  // Debugging
  console.log({
    userHasPOAPError,
    userHasPOAPData,
  });

  const handleClaimClick = async () => {
    setClaimStep(ClaimModalState.CLAIMING);

    // User has already claimed the POAP
    if (userHasPOAPData?.owner) {
      return setClaimStep(ClaimModalState.CLAIMED);
    }

    const mintResponse = await mintIYKPOAPToken({
      otpCode: iykResponse?.poapEvents[0].otp,
      recipient: poapReciever,
      poapEventId: iykResponse?.poapEvents[0].poapEventId,
    });

    console.log({ mintResponse });

    setClaimStep(mintResponse.success ? ClaimModalState.SUCCESS : ClaimModalState.ERROR);

    return;
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
              poapImageURL={poapEvent?.image_url}
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
              <NimiPageRender nimi={initialNimi} isApp={true} />
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
