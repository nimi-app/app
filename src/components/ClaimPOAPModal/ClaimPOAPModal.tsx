import { POAPEvent } from '@nimi.io/card';
import { NIMI_CARDS_WIDTH } from '@nimi.io/card/constants';
import { NimiThemeType } from '@nimi.io/card/types';
import { Countdown } from 'components/Countdown';
import { Toggle } from 'components/form/Toggle';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { isAddressOrEns } from 'utils';

import claimErrorLottie from './claimErrorLottie.json';
import { ClaimPOAPButton } from './ClaimPOAPButton';
import sadFaceLottie from './sad-face.json';
import { ReactComponent as ArrowDown } from '../../assets/svg/arrow-down.svg';
import { ReactComponent as Checkmark } from '../../assets/svg/checkmark.svg';
import { ReactComponent as CloseSvg } from '../../assets/svg/close-icon.svg';
import { ReactComponent as Cross } from '../../assets/svg/cross.svg';
import { AnimatedSection } from '../../modals/ConfigurePOAPsModal/components/AnimatedSection';

export enum ClaimModalState {
  INITIAL,
  CLAIMING,
  SUCCESS,
  CLAIMED,
  ERROR,
  LOADING,
  FUTURE,
  EXPIRED,
  PENDING,
}

type ClaimPOAPModalProps = {
  theme: NimiThemeType | undefined;
  poapEvent?: POAPEvent;
  name?: string;
  onClaimClick: () => void;
  autoClaimPOAP: boolean;
  setAutoClaimPOAP: (value: boolean) => void;
  closeModal: () => void;
  claimStep?: ClaimModalState;
  setReciever: (value: string) => void;
  reciever?: string;
  poapImageURL?: string | undefined;
  resetAllFields: () => void;
};

const iconVariants = {
  open: { rotate: 0 },
  closed: { rotate: 180 },
};
const bodyVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
  },
  closed: {
    scaleY: 0,
    opacity: 0,
  },
};

export function ClaimPOAPModal({
  theme,
  name = 'mialn',
  poapEvent,
  closeModal,
  onClaimClick,
  autoClaimPOAP,
  setAutoClaimPOAP,
  claimStep,
  reciever,
  setReciever,
  poapImageURL,
  resetAllFields,
}: ClaimPOAPModalProps) {
  const [showBody, setShowBody] = useState(false);

  const isRecipientValid = useMemo(() => {
    if (!reciever) return false;

    return isAddressOrEns(reciever);
  }, [reciever]);

  return (
    <OverlayWrap nimiTheme={theme}>
      <Modal key="claimModal" nimiTheme={theme} onClick={(event) => event.stopPropagation()}>
        {claimStep === ClaimModalState.INITIAL && (
          <AnimatedSection>
            <Header>
              <Heading nimiTheme={theme}>You have met {name}</Heading>
              <ArowDownIcon onClick={closeModal}>
                <CloseSvg />
              </ArowDownIcon>
            </Header>
            <Body>
              <Description nimiTheme={theme}>Claim POAP that proves you met {name}</Description>
              <InputGroup>
                <Input value={reciever} onChange={(e) => setReciever(e.target.value)} nimiTheme={theme} />
                <InputIcons>
                  {isRecipientValid ? (
                    <StyledCheckmark />
                  ) : reciever?.length ? (
                    <StyledCross onClick={() => setReciever('')} />
                  ) : (
                    ''
                  )}
                </InputIcons>
              </InputGroup>
              {/*
              @TODO: work on this later
            <InputGroup>
              <ReceiverInput onChange={(nextValue) => setReciever(nextValue)} />
            </InputGroup> */}
            </Body>
            <InputGroup>
              <ClaimPOAPButton nimiTheme={theme} disabled={!isRecipientValid} onClick={onClaimClick} />
            </InputGroup>
            <AutoClaimWrapper>
              <Toggle
                id="autoClaimPOAP"
                checked={autoClaimPOAP}
                onChange={(nextChecked) => setAutoClaimPOAP(nextChecked)}
                label="Auto Claim"
              />
            </AutoClaimWrapper>
          </AnimatedSection>
        )}
        {claimStep === ClaimModalState.CLAIMING && (
          <AnimatedSection>
            <Header>
              <Heading nimiTheme={theme}>Claiming...</Heading>
              <ArowDownIcon
                variants={iconVariants}
                initial="closed"
                animate={showBody ? 'open' : 'closed'}
                onClick={() => setShowBody(!showBody)}
              >
                <ArrowDown />
              </ArowDownIcon>
            </Header>
            {showBody && (
              <Body
                style={{ originY: '100%' }}
                transition={{ duration: 0.3 }}
                variants={bodyVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <Description nimiTheme={theme}>POAP is being claimed to</Description>
                <InputGroup>
                  <Input value={reciever} disabled={true} nimiTheme={theme} />
                </InputGroup>
              </Body>
            )}
          </AnimatedSection>
        )}
        {claimStep === ClaimModalState.SUCCESS && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CloseIcon onClick={closeModal}>
              <CloseSvg />
            </CloseIcon>
            <SuccessBody
              transition={{ duration: 0.3 }}
              variants={bodyVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <img width={'124px'} height={'124px'} src={poapImageURL} />
              <Heading style={{ marginTop: '24px', marginBottom: '10px' }} nimiTheme={theme}>
                Succesfully Claimed
              </Heading>
              <SucessDescription nimiTheme={theme}>POAP was succesfully claimed</SucessDescription>
            </SuccessBody>
          </motion.div>
        )}
        {claimStep === ClaimModalState.CLAIMED && (
          <motion.div>
            <CloseIcon onClick={closeModal}>
              <CloseSvg />
            </CloseIcon>
            <SuccessBody
              transition={{ duration: 0.3 }}
              variants={bodyVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <img width={'124px'} height={'124px'} src={poapImageURL} />
              <Heading style={{ marginTop: '24px', marginBottom: '10px' }} nimiTheme={theme}>
                POAP Already Claimed
              </Heading>
              <SucessDescription nimiTheme={theme}>
                This POAP was already claimed by <span style={{ fontWeight: '700' }}>{reciever}</span>
              </SucessDescription>
              {autoClaimPOAP && (
                <AutoClaimWrapper>
                  <Toggle
                    id="autoClaimPOAP"
                    checked={autoClaimPOAP}
                    onChange={(nextChecked) => {
                      if (!nextChecked) {
                        resetAllFields();
                      }
                      setAutoClaimPOAP(nextChecked);
                    }}
                    label="Auto Claim"
                  />
                </AutoClaimWrapper>
              )}
            </SuccessBody>
          </motion.div>
        )}
        {claimStep === ClaimModalState.ERROR && (
          <motion.div>
            <CloseIcon onClick={closeModal}>
              <CloseSvg />
            </CloseIcon>

            <SuccessBody
              transition={{ duration: 0.3 }}
              variants={bodyVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <Lottie
                animationData={claimErrorLottie}
                loop={false}
                rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                height={124}
                width={124}
              />
              <Heading style={{ marginBottom: '10px' }} nimiTheme={theme}>
                Failed to claim
              </Heading>
              <SucessDescription nimiTheme={theme}>POAP couldn’t be claimed. Please try again.</SucessDescription>
            </SuccessBody>
            <Footer>
              <ClaimPOAPButton nimiTheme={theme} text={'Try again'} onClick={() => resetAllFields()} />
            </Footer>
          </motion.div>
        )}
        {claimStep === ClaimModalState.EXPIRED && (
          <motion.div>
            <CloseIcon onClick={closeModal}>
              <CloseSvg />
            </CloseIcon>

            <SuccessBody
              transition={{ duration: 0.3 }}
              variants={bodyVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <LottieStyle>
                <Lottie
                  animationData={sadFaceLottie}
                  loop={true}
                  rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                />
              </LottieStyle>

              <Heading style={{ marginBottom: '10px', marginTop: '16px;' }} nimiTheme={theme}>
                POAP Event Ended
              </Heading>
              <SucessDescription marginBottom="24px" nimiTheme={theme}>
                User run out of POAPs or Event ended. The owner of the card can add a new POAP event.{' '}
              </SucessDescription>
            </SuccessBody>
            <Footer>
              <ClaimPOAPButton
                nimiTheme={theme}
                text={'Add a POAP'}
                onClick={() =>
                  window.open(
                    'https://iyk.notion.site/IYK-Devices-How-to-Upload-POAPs-to-Your-Device-14f83269daea49a5836b80326a6fa761'
                  )
                }
              />
            </Footer>
          </motion.div>
        )}
        {claimStep === ClaimModalState.FUTURE && (
          <motion.div>
            <CloseIcon onClick={closeModal}>
              <CloseSvg />
            </CloseIcon>
            <SuccessBody
              transition={{ duration: 0.3 }}
              variants={bodyVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <img width={'124px'} height={'124px'} src={poapImageURL} />
              <Heading style={{ marginTop: '24px', marginBottom: '10px' }} nimiTheme={theme}>
                POAP Event starts in
              </Heading>
              {poapEvent?.end_date && <Countdown theme={theme} targetDate={poapEvent?.start_date} />}
            </SuccessBody>
          </motion.div>
        )}
      </Modal>
    </OverlayWrap>
  );
}

type ModalProps = {
  nimiTheme: NimiThemeType | undefined;
};
const OverlayWrap = styled.div<ModalProps>`
  @media (max-width: 570px) {
    position: fixed;
    left: 50%;
    height: 355px;

    width: 100vw;
    transform: translate(-50%, 0);
    top: unset;
    bottom: 0px;
    z-index: 10;
    background: ${({ nimiTheme }) =>
      nimiTheme === NimiThemeType.ETH_PRAGUE_2023
        ? ' linear-gradient(rgba(202, 229, 255, 0) -6%, rgb(202, 228, 255) 30%);'
        : ''};
  }
`;
const AutoClaimWrapper = styled.div``;
const LottieStyle = styled.div`
  width: 94px;
  height: 94px;
  margin-bottom: 16px;
`;
const ArowDownIcon = styled(motion.div)`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const Modal = styled(motion.div)<ModalProps>`
  width: 348px;
  z-index: 2;
  position: fixed;
  bottom: 22px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 22px;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 14px 24px rgba(52, 55, 100, 0.12);

  ${({ nimiTheme }) =>
    nimiTheme === NimiThemeType.RAAVE || nimiTheme === NimiThemeType.DAO_TOKYO_2023
      ? `
    border: 4px solid #4B5563;
    background-color: #1F2A37;`
      : nimiTheme === NimiThemeType.ETH_PRAGUE_2023
      ? `background-color:#F1FFF8;`
      : `
    border: 4px solid white;
    background-color: #f0f3fb;
  `}

  @media (max-width: ${NIMI_CARDS_WIDTH}px) {
    width: calc(100% - 36px);
  }
`;

const SuccessBody = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputIcons = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
`;
const StyledCheckmark = styled(Checkmark)`
  path {
    fill: #057a55;
  }
`;
const StyledCross = styled(Cross)`
  cursor: pointer;
  &:hover path {
    fill: #8c90a0;
  }
`;

const Heading = styled.h1<ModalProps>`
  line-height: 20px;
  font-size: 18px;

  ${({ nimiTheme }) =>
    nimiTheme === NimiThemeType.RAAVE || nimiTheme === NimiThemeType.DAO_TOKYO_2023
      ? `
    color: white;
    `
      : nimiTheme === NimiThemeType.ETH_PRAGUE_2023
      ? `color:#212123;`
      : `
      background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
  `}
`;

const CloseIcon = styled.div`
  width: 25px;
  height: 25px;

  position: absolute;
  right: 17px;
  cursor: pointer;
  top: 14px;
  z-index: 100;
  &:hover .svg-path {
    fill: #9ca3afb8;
  }
`;

const Body = styled(motion.div)`
  padding-top: 10px;
`;

const Description = styled.h2<ModalProps>`
  line-height: 15px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  ${({ nimiTheme }) =>
    `color: ${
      nimiTheme === NimiThemeType.RAAVE || nimiTheme === NimiThemeType.DAO_TOKYO_2023
        ? '#C3CAD2'
        : NimiThemeType.ETH_PRAGUE_2023
        ? '#212123A6'
        : '#8a97aa'
    };`}
`;

const SucessDescription = styled(Description)<{ marginBottom?: string }>`
  text-align: center;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '10px')};
  line-height: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  margin-bottom: 16px;
`;

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Enter your ENS or Ethereum address',
  spellCheck: false,
})<ModalProps>`
  height: 44px;
  width: 100%;
  border-radius: 8px;
  padding: 12px 16px;
  padding-right: 33px;
  outline: none;

  ${({ nimiTheme }) =>
    nimiTheme === NimiThemeType.RAAVE || nimiTheme === NimiThemeType.DAO_TOKYO_2023
      ? `
    color: #ffffffcf;
    background: #374151;
    border: 1px solid #4B5563;

    &:focus,
    &:hover {
        color: #fff;
        background: #374151cf;
        border: 1px solid #4B5563cf;
    }`
      : `
    color: #374151;
    background: #f9fafb;
    border: 1px solid #d1d5db;

    &:focus,
    &:hover {
        color: #4368ea;
        border: 1px solid transparent;
        background-image: linear-gradient(white, white), linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
        background-origin: border-box;
        background-clip: padding-box, border-box;
    }
  `}
`;

// const CogButton = styled.button`
//   width: 44px;
//   height: 44px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: none;
//   background-color: transparent;
//   cursor: pointer;
// `;

const Footer = styled.footer``;
