import { AddressZero } from '@ethersproject/constants';

import { NimiPageProvider, NimiPage as NimiPageRender, ToastProvider } from '@nimi.io/card';
import { NimiThemeType } from '@nimi.io/card/types';
import { useIYKRefQuery, useMintIYKPOAPToken } from 'api/RestAPI/hooks/useIykHooks';
import { usePOAPEventQuery, useUserHasPOAPQuery } from 'api/RestAPI/hooks/useUserPOAPs';
import { autoClaimPOAPAtom, autoClaimPOAPRecentReceiverAtom } from 'components/ClaimPOAPModal/ReceiverInput';
import { Loader, LoaderWrapper } from 'components/Loader';
import { OpacityMotion } from 'components/motion';
import { AnimatePresence } from 'framer-motion';
import { useDebounce } from 'hooks/useDebounce';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { isAddressOrEns } from 'utils';

import { ClaimModalState, ClaimPOAPModal } from '../components/ClaimPOAPModal';
import { useInitialtNimiData } from '../hooks/useDefaultNimiData';

const eventUrlToThemeMapping = {
  ['daotokyo-tokyo-2023']: NimiThemeType.DAO_TOKYO_2023,
  ['ethprague2023']: NimiThemeType.ETH_PRAGUE_2023,
};

/**
 * Renders any valid ENS name nimi page on the path /:nimiUsername.
 * Example: https://nimi.io/dvve.eth will attempt to render the Nimi page for the ENS name dvve.eth
 */
export default function NimiPage() {
  const { nimiUsername: ensName } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  // const [autoClaimPOAPLocalStorage, setAutoClaimPOAPLocalStorage] = useAtom(autoClaimPOAPAtom);
  const [autoClaimPOAP, setAutoClaimPOAP] = useAtom(autoClaimPOAPAtom);
  const [autoClaimPOAPRecentReceiver, setAutoClaimPOAPRecentReciever] = useAtom(autoClaimPOAPRecentReceiverAtom);
  // Hydrate the local state with the recent receiver address
  const [poapReciever, setPoapReciever] = useState(
    isAddressOrEns(autoClaimPOAPRecentReceiver) && autoClaimPOAP ? autoClaimPOAPRecentReceiver : ''
  );
  const debouncedPOAPReciever = useDebounce(poapReciever, 500);

  // Local state for the claim modal
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(true);
  const [claimStep, setClaimStep] = useState(ClaimModalState.INITIAL);

  // Retrieve the IYK reference from the URL and fetch its data
  const [searchParams] = useSearchParams();
  const iykRef = searchParams.get('iykRef');
  const event = searchParams.get('event');
  const { data: refData, isFetching: isRefDataLoading } = useIYKRefQuery(iykRef);
  const poapEventId = refData?.poapEvents?.[0]?.poapEventId;

  // Retrieve the POAP event data and check if the user has already claimed the POAP
  const { data: poapEvent, isFetching: isPoapEventLoading } = usePOAPEventQuery(poapEventId);

  // Fetch the Nimi data for the ENS name
  const { data: initialNimi, isGenerated } = useInitialtNimiData({
    ensName: ensName!,
    account: AddressZero,
    injectedTheme: event && eventUrlToThemeMapping[event],
  });

  const {
    isFetching: isUserHasPOAPLoading,
    error: userHasPOAPError,
    data: userHasPOAPData,
  } = useUserHasPOAPQuery({
    eventId: poapEventId,
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

  const claimHandler = async () => {
    setClaimStep(ClaimModalState.CLAIMING);

    // User has already claimed the POAP
    if (userHasPOAPData?.owner) {
      setAutoClaimPOAPRecentReciever(debouncedPOAPReciever);
      setClaimStep(ClaimModalState.CLAIMED);
      return;
    }
    try {
      const mintResponse = await mintIYKPOAPToken({
        otpCode: refData?.poapEvents[0].otp,
        recipient: debouncedPOAPReciever,
        poapEventId: poapEventId!,
      });
      console.log({ mintResponse });

      if (mintResponse.success) {
        setClaimStep(ClaimModalState.SUCCESS);
        // If the user wants to auto claim the POAP, save the reciever address to local storage
        setAutoClaimPOAPRecentReciever(debouncedPOAPReciever);
      } else {
        setClaimStep(ClaimModalState.ERROR);
      }
    } catch (error) {
      console.error(error);
      setClaimStep(ClaimModalState.ERROR);
    }

    return;
  };
  useEffect(() => {
    // On first render, attempt to claim the POAP if the user has auto claim enabled
    const attemptClaim = async () => {
      if (isRefDataLoading || isMounted || isUserHasPOAPLoading) return;
      if (userHasPOAPData && userHasPOAPData?.owner) {
        setIsMounted(true);
        setClaimStep(ClaimModalState.CLAIMED);
        return;
      }
      if (
        isAddressOrEns(autoClaimPOAPRecentReceiver) &&
        autoClaimPOAP &&
        refData?.isValidRef &&
        refData?.poapEvents[0]?.status === 'active'
      ) {
        await claimHandler();
        setIsMounted(true);
      }

      if (refData?.poapEvents[0]?.status !== 'active') {
        if (refData?.poapEvents[0]?.status === 'expired') {
          setClaimStep(ClaimModalState.EXPIRED);
          setIsMounted(true);
        } else if (refData?.poapEvents[0]?.status === 'future') {
          setClaimStep(ClaimModalState.FUTURE);
          setIsMounted(true);
        } else if (refData?.poapEvents[0]?.status === 'pending-approval') {
          setClaimStep(ClaimModalState.PENDING);
          setIsMounted(true);
        }
      }
    };

    attemptClaim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isMounted,
    autoClaimPOAP,
    refData,
    isRefDataLoading,
    isUserHasPOAPLoading,
    userHasPOAPData,
    autoClaimPOAPRecentReceiver,
  ]);

  const resetAllFields = () => {
    setClaimStep(ClaimModalState.INITIAL);
    setPoapReciever('');
    setIsClaimModalOpen(true);
  };

  return (
    <AnimatePresence initial={false}>
      {!initialNimi || isRefDataLoading || isPoapEventLoading ? (
        <OpacityMotion key="nimi-page-loader">
          <LoaderWrapper $fullPage={true}>
            <Loader />
          </LoaderWrapper>
        </OpacityMotion>
      ) : (
        <OpacityMotion key="nimi-page-content">
          {(isClaimModalOpen && refData?.isValidRef) || true ? (
            <ClaimPOAPModal
              poapEvent={poapEvent}
              resetAllFields={resetAllFields}
              poapImageURL={poapEvent?.image_url}
              setReciever={setPoapReciever}
              reciever={poapReciever}
              onClaimClick={claimHandler}
              name={ensName}
              claimStep={claimStep}
              theme={event && eventUrlToThemeMapping[event]}
              closeModal={() => setIsClaimModalOpen(false)}
              autoClaimPOAP={autoClaimPOAP}
              setAutoClaimPOAP={setAutoClaimPOAP}
            />
          ) : null}
          <ToastProvider>
            <NimiPageProvider poapAPIKey={process.env.REACT_APP_POAP_API_KEY as string}>
              <NimiPageRender nimi={initialNimi} showClaimModal={!refData?.isValidRef && isGenerated} mode={'id'} />
            </NimiPageProvider>
          </ToastProvider>
        </OpacityMotion>
      )}
    </AnimatePresence>
  );
}
