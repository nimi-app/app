import { AddressZero } from '@ethersproject/constants';

import { NimiPage, NimiPageProvider, ToastProvider } from '@nimi.io/card';
import { Loader, LoaderWrapper } from 'components/Loader';
import { OpacityMotion } from 'components/motion';
import { AnimatePresence } from 'framer-motion';
import { useInitialtNimiData } from 'hooks/useDefaultNimiData';
import React from 'react';
import { useParams } from 'react-router-dom';

export const ErrorBoundary = () => {
  const { nimiUsername: ensName } = useParams();

  // Fetch the Nimi data for the ENS name
  const { data: initialNimi, isGenerated } = useInitialtNimiData({
    ensName: ensName!,
    account: AddressZero,
  });

  return (
    <AnimatePresence initial={false}>
      {!initialNimi ? (
        <OpacityMotion key="nimi-page-loader">
          <LoaderWrapper $fullPage={true}>
            <Loader />
          </LoaderWrapper>
        </OpacityMotion>
      ) : (
        <OpacityMotion key="nimi-page">
          <ToastProvider>
            <NimiPageProvider poapAPIKey={process.env.REACT_APP_POAP_API_KEY as string}>
              <NimiPage nimi={initialNimi} showClaimModal={isGenerated} mode={'app'} />
            </NimiPageProvider>
          </ToastProvider>
        </OpacityMotion>
      )}
    </AnimatePresence>
  );
};
