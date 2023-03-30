import { styled } from 'styled-components';

import { ClaimPOAPButton } from './ClaimPOAPButton';
import { ReactComponent as CloseSvg } from '../../assets/svg/close-icon.svg';
// import { ReactComponent as CogSVG } from '../../../assets/cog.svg';

type ClaimPOAPModalProps = {
  dark?: boolean;
  name?: string;
  onClaimClick: () => void;
  closeModal: () => void;
};

export function ClaimPOAPModal({ dark = true, name = 'mialn', closeModal, onClaimClick }: ClaimPOAPModalProps) {
  return (
    <Modal dark={dark} onClick={(event) => event.stopPropagation()}>
      <Header>
        <Heading dark={dark}>You have met {name}</Heading>
        <CloseIcon onClick={closeModal}>
          <CloseSvg />
        </CloseIcon>
      </Header>
      <Body>
        <Description dark={dark}>Claim POAP that proves you met {name}.</Description>
        <InputGroup>
          <Input dark={dark} />
          {/* <CogButton>
              <CogSVG />
            </CogButton> */}
        </InputGroup>
      </Body>
      <Footer>
        <ClaimPOAPButton onClick={onClaimClick} />
      </Footer>
    </Modal>
  );
}

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2;
`;

type ModalProps = {
  dark: boolean;
};

const Modal = styled.div<ModalProps>`
  width: 348px;
  z-index: 2;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
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
`;

const Header = styled.header`
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const CloseIcon = styled.button`
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

const Body = styled.main`
  padding: 10px 0 16px;
`;

const Description = styled.h2<ModalProps>`
  line-height: 15px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;

  ${({ dark }) => `color: ${dark ? '#C3CAD2' : '#8a97aa'};`}
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Enter your ENS or Email to claim',
  spellCheck: false,
})<ModalProps>`
  height: 44px;
  width: 100%;
  border-radius: 8px;
  padding: 12px 16px;
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
