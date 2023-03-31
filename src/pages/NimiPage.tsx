import { AddressZero } from '@ethersproject/constants';

import { NimiPage as NimiPageRender } from '@nimi.io/card';
import { NimiThemeType } from '@nimi.io/card/types';
import { getIYKRefData } from 'api/iyk';
import { Loader, LoaderWrapper } from 'components/Loader';
import { OpacityMotion } from 'components/motion';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
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
  const [ikyRefData, setIkyRefData] = useState<Awaited<ReturnType<typeof getIYKRefData>>>();
  const [poapReciever, setPoapReciever] = useState('');
  const iykRef = searchParams.get('iykRef'); // from IYK documentation

  // Fetch the IYK ref data
  useEffect(() => {
    if (!iykRef) {
      return;
    }
    getIYKRefData(iykRef)
      .then((data) => {
        setIkyRefData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [iykRef]);

  const handleClaimClick = () => {
    setClaimStep(ClaimModalState.CLAIMING);
  };

  const { data: initialNimi, loading: initialNimiLoading } = useInitialtNimiData({
    ensName: nimiUsername!,
    account: AddressZero, // TODO: get account from the generated NimiPage
  });

  return (
    <AnimatePresence initial={false}>
      {initialNimiLoading || !initialNimi ? (
        <OpacityMotion key="nimi-page-loader">
          <LoaderWrapper $fullPage={true}>
            <Loader />
          </LoaderWrapper>
        </OpacityMotion>
      ) : (
        <OpacityMotion key="nimi-page-content">
          {ikyRefData?.isValidRef && isClaimModalOpen ? (
            <ClaimPOAPModal
              setReciever={setPoapReciever}
              reciever={poapReciever}
              onClaimClick={handleClaimClick}
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
          <NimiPageRender nimi={initialNimi} isApp={true} />
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
