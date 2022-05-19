import { ExternalLink, WhiteCard } from '../../../theme';
import { ReactComponent as NimiText } from '../../../assets/svg/nimi-text.svg';
import { ReactComponent as BottomBarText } from '../../../assets/svg/bottombar-with-text.svg';
import styled from 'styled-components';

export const StyledWhiteCard = styled(WhiteCard)`
  width: 372.87px;
  padding: 22px;
  padding-bottom: 110px;
  overflow: hidden;
  height: fit-content;
  font-family: 'Baloo 2';
`;
export const StyledNimiText = styled(NimiText)`
  z-index: 100;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const TopPart = styled.div`
  position: absolute;
  width: 372.87px;
  height: 186.93px;
  left: 0px;
  top: 0px;
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  opacity: 0.8;
  border-radius: 31px 31px 198.863px 198.863px;
`;

export const ProfilePic = styled.img`
  background-position: center, center;
  background-size: cover;
  border: 8px solid #ffffff;
  border-radius: 200px;
  height: 209.8px;
  width: 209.8px;
  z-index: 1;
`;

export const ProfilePicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledUsername = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 31.818px;
  line-height: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  color: #000000;
`;

export const EnsName = styled.div`
  font-size: 22px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`;

export const Divider = styled.div`
  height: 18px;
  width: 1.5px;
  background-color: #000000;
`;

export const SocialsWrapper = styled(WhiteCard)`
  padding: 38px;
  width: 100%;
  gap: 25px;
  align-items: flex-start;
`;

export const SocialsHeader = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 27.8408px;
  color: #000000;
`;

export const Description = styled.div`
  font-size: 14px;
  color: #000000;
  overflow-wrap: break-word;
  margin: 19px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
`;

export const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AccountInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 24px;
`;

export const StyledExternalLink = styled(ExternalLink)`
  font-weight: 400;
  font-size: 17.8976px;
  line-height: 100%;
`;

export const SocialFieldText = styled.div`
  font-weight: 400;
  font-size: 17.8976px;
  line-height: 100%;
  color: #2f80ed;
  margin-left: 8px;
`;

export const BottomBarTextStyle = styled(BottomBarText)`
  position: absolute;
  bottom: 0;
  left: -4px;
`;
