import { NIMI_CARDS_WIDTH } from '@nimi.io/card/constants';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { styled } from 'styled-components';
import { isAddressOrEns } from 'utils';

import { ClaimPOAPButton } from './ClaimPOAPButton';
import { ReactComponent as ArrowDown } from '../../assets/svg/arrow-down.svg';
import { ReactComponent as Checkmark } from '../../assets/svg/checkmark.svg';
import { ReactComponent as CloseSvg } from '../../assets/svg/close-icon.svg';
import { ReactComponent as Cross } from '../../assets/svg/cross.svg';
import { AnimatedSection } from '../../modals/ConfigurePOAPsModal/components/AnimatedSection';

// import { ReactComponent as CogSVG } from '../../../assets/cog.svg';

export enum ClaimModalState {
  INITIAL,
  CLAIMING,
  SUCCESS,
  CLAIMED,
  ERROR,
}

type ClaimPOAPModalProps = {
  dark?: boolean;
  name?: string;
  onClaimClick: () => void;
  closeModal: () => void;
  claimStep?: ClaimModalState;
  setReciever: (value: string) => void;
  reciever?: string;
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
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
  dark = true,
  name = 'mialn',
  closeModal,
  onClaimClick,
  claimStep,
  reciever,
  setReciever,
}: ClaimPOAPModalProps) {
  const [showBody, setShowBody] = useState(false);

  const isRecipientValid = isAddressOrEns(reciever || '');
  return (
    <Modal key="claimModal" dark={dark} onClick={(event) => event.stopPropagation()}>
      {claimStep === ClaimModalState.INITIAL && (
        <AnimatedSection>
          <Header>
            <Heading dark={dark}>You have met {name}</Heading>
            <CloseIcon onClick={closeModal}>
              <CloseSvg />
            </CloseIcon>
          </Header>
          <Body>
            <Description dark={dark}>Claim POAP that proves you met {name}</Description>
            <InputGroup>
              <Input value={reciever} onChange={(e) => setReciever(e.target.value)} dark={dark} />
              <InputIcons>
                {isRecipientValid ? (
                  <StyledCheckmark />
                ) : reciever?.length ? (
                  <StyledCross onClick={() => setReciever('')} />
                ) : (
                  ''
                )}
              </InputIcons>
              {/* <CogButton>
              <CogSVG />
            </CogButton> */}
            </InputGroup>
          </Body>
          <Footer>
            <ClaimPOAPButton disabled={!isRecipientValid} onClick={onClaimClick} />
          </Footer>
        </AnimatedSection>
      )}
      {claimStep === ClaimModalState.CLAIMING && (
        <AnimatedSection>
          <Header>
            <Heading dark={dark}>Claiming...</Heading>
            <CloseIcon
              variants={iconVariants}
              initial="closed"
              animate={showBody ? 'open' : 'closed'}
              onClick={() => setShowBody(!showBody)}
            >
              <ArrowDown />
            </CloseIcon>
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
              <Description dark={dark}>POAP is being claimed to</Description>
              <InputGroup>
                <Input value={reciever} disabled={true} dark={dark} />
                {/* <CogButton>
              <CogSVG />
            </CogButton> */}
              </InputGroup>
            </Body>
          )}
        </AnimatedSection>
      )}
      {claimStep === ClaimModalState.SUCCESS && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Header>
            <div></div>
            <CloseIcon onClick={closeModal}>
              <CloseSvg />
            </CloseIcon>
          </Header>
          <SuccessBody
            transition={{ duration: 0.3 }}
            variants={bodyVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <img
              width={'124px'}
              height={'124px'}
              src="https://assets.poap.xyz/raave-devcon-bogota-2022-logo-1664886515532.png?size=small"
            />
            <Heading style={{ marginTop: '24px', marginBottom: '10px' }} dark={dark}>
              Succesfully Claimed
            </Heading>
            <SucessDescription dark={dark}>POAP was succesfully claimed</SucessDescription>
          </SuccessBody>
        </motion.div>
      )}
      {claimStep === ClaimModalState.CLAIMED && (
        <motion.div>
          <Header>
            <div></div>
            <CloseIcon onClick={closeModal}>
              <CloseSvg />
            </CloseIcon>
          </Header>
          <SuccessBody
            transition={{ duration: 0.3 }}
            variants={bodyVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <img
              width={'124px'}
              height={'124px'}
              src="https://assets.poap.xyz/raave-devcon-bogota-2022-logo-1664886515532.png?size=small"
            />
            <Heading style={{ marginTop: '24px', marginBottom: '10px' }} dark={dark}>
              POAP Already Claimed
            </Heading>
            <SucessDescription dark={dark}>
              This POAP was already claimed by <span style={{ fontWeight: '700' }}>zeasdsadsadsadtt.eth</span>
            </SucessDescription>
          </SuccessBody>
        </motion.div>
      )}
      {claimStep === ClaimModalState.ERROR && (
        <motion.div>
          <Header>
            <div></div>
            <CloseIcon onClick={closeModal}>
              <CloseSvg />
            </CloseIcon>
          </Header>
          <SuccessBody
            transition={{ duration: 0.3 }}
            variants={bodyVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <img
              width={'124px'}
              height={'124px'}
              src="https://assets.poap.xyz/raave-devcon-bogota-2022-logo-1664886515532.png?size=small"
            />
            <ErrorText>Failed to claim</ErrorText>
          </SuccessBody>

          <Footer>
            <ClaimPOAPButton text={'Try again'} onClick={() => console.log('Try again click')} />
          </Footer>
        </motion.div>
      )}
    </Modal>
  );
}

type ModalProps = {
  dark: boolean;
};

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

  ${({ dark }) =>
    dark
      ? `
    border: 4px solid #4B5563;
    background-color: #1F2A37;`
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

const ErrorText = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: #f05252;
  margin-top: 14px;
  margin-bottom: 24px;
  /* identical to box height */

  text-align: center;
`;

const InputIcons = styled.div`
  position: absolute;
  right: 36px;
  top: 97px;
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

  ${({ dark }) =>
    dark
      ? `
    color: white;
    `
      : `
      background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
  `}
`;

const CloseIcon = styled(motion.button)`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover .svg-path {
    fill: #9ca3afb8;
  }
`;

const Body = styled(motion.div)`
  padding: 10px 0 16px;
`;

const Description = styled.h2<ModalProps>`
  line-height: 15px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  ${({ dark }) => `color: ${dark ? '#C3CAD2' : '#8a97aa'};`}
`;

const SucessDescription = styled(Description)`
  text-align: center;
  margin-bottom: 0%;
  line-height: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
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

  ${({ dark }) =>
    dark
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
