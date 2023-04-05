import { NIMI_CARDS_WIDTH } from '@nimi.io/card/constants';
import { ClaimPOAPButton, StyledButton } from 'components/ClaimPOAPModal/ClaimPOAPButton';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { NimiSignatureColor } from 'theme';

export function ClaimNimiModal({ hasPoap, ensName }: { hasPoap: boolean; ensName?: string }) {
  const navigate = useNavigate();
  return (
    <Modal hasPoap={hasPoap}>
      <BackgroundWrapper hasPoap={hasPoap}>
        <Header>Claim your Nimi Profile!</Header>
        <Body>Semper in cursus magna et eu varius nunc adipiscing. Elementum justo, laoreet.</Body>
        <ClaimPOAPButton text={'Claim Profile'} />
      </BackgroundWrapper>
      <ClaimProfile onClick={() => navigate(`/domains/${ensName}`)} hasPoap={hasPoap} variant="big">
        Claim Profile
      </ClaimProfile>
    </Modal>
  );
}

const Modal = styled(motion.div)<{ hasPoap: boolean }>`
  width: 570px;
  background: transparent;
  z-index: 2;
  position: fixed;

  left: 50%;
  transform: translate(-50%, -50%);
  top: 70%;
  box-sizing: border-box;
  border-radius: 16px;

  @media (max-width: ${NIMI_CARDS_WIDTH}px) {
    width: calc(100% - 36px);
    transform: translate(-50%, 0);
    top: unset;
    bottom: 22px;
  }
`;
const ClaimProfile = styled(StyledButton)<{ hasPoap: boolean }>`
  display: none;
  @media (max-width: ${NIMI_CARDS_WIDTH}px) {
    ${({ hasPoap }) => hasPoap && `display: unset;`}
  }
`;
const BackgroundWrapper = styled.div<{ hasPoap: boolean }>`
  background: #ffffff;
  border-radius: 16px;
  padding: 22px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow: 0px 3px 10px rgba(33, 33, 35, 0.06);
  padding: 32px 24px;
  @media (max-width: ${NIMI_CARDS_WIDTH}px) {
    ${({ hasPoap }) => hasPoap && `display: none;`}
  }
`;
const Header = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  ${NimiSignatureColor};
  margin-bottom: 16px;
`;
const Body = styled.div`
  color: #8a97aa;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */

  text-align: center;
  letter-spacing: -0.02em;
  max-width: 279px;
  margin-bottom: 24px;
`;
