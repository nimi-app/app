import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { ExternalLink, WhiteCard } from '../../../theme';
import { ReactComponent as NimiText } from '../../../assets/svg/nimi-text.svg';
import { useActiveWeb3React } from '../../../hooks/useWeb3';

import { defaultFields, FieldsMapping } from '../../../constants';
import { getExplorerLink, shortenAddress } from '../../../utils';
import { ReactComponent as BottomBarText } from '../../../assets/svg/bottombar-with-text.svg';
const StyledWhiteCard = styled(WhiteCard)`
  width: 372.87px;
  padding: 22px;
  overflow: hidden;
  height: fit-content;
`;
const StyledNimiText = styled(NimiText)`
  z-index: 100;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const TopPart = styled.div`
  position: absolute;
  width: 372.87px;
  height: 186.93px;
  left: 0px;
  top: 0px;

  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  opacity: 0.8;
  border-radius: 31px 31px 198.863px 198.863px;
`;
const ProfilePic = styled.img`
  background-position: center, center;
  background-size: cover;
  border: 8px solid #ffffff;
  border-radius: 200px;
  height: 209.8px;
  width: 209.8px;
  z-index: 1;
`;
const ProfilePicContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;
const StyledUsername = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 31.818px;
  line-height: 100%;
  margin-top: 20px;

  display: flex;
  align-items: center;

  color: #000000;
`;
const EnsName = styled.div`
  font-family: Baloo 2;
  font-size: 22px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
`;

const Divider = styled.div`
  height: 18px;
  width: 1.5px;
  background-color: #000000;
`;

const SocialsWrapper = styled(WhiteCard)`
  padding: 38px;
  width: 100%;
  gap: 25px;
  align-items: flex-start;
`;
const SocialsHeader = styled.div`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 500;
  font-size: 27.8408px;
  color: #000000;
`;
const Description = styled.div`
  font-family: Baloo 2;
  font-size: 14px;
  color: #000000;
  margin: 19px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
`;
const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AccountInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 24px;
`;
const StyledExternalLink = styled(ExternalLink)`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 400;
  font-size: 17.8976px;
  line-height: 100%;
`;
const SocialFieldText = styled.div`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 400;
  font-size: 17.8976px;
  line-height: 100%;
  color: #2f80ed;
  margin-left: 8px;
`;
const BottomBarTextStyle = styled(BottomBarText)`
  position: absolute;
  bottom: 0;
  left: -4px;
`;
interface PreviewProps {
  ensName?: string;
}
export function Preview({ ensName }: PreviewProps) {
  const { watch } = useFormContext();
  const { account, chainId } = useActiveWeb3React();

  const arrayOfFormFields = watch();

  return (
    <StyledWhiteCard>
      <ProfilePicContainer>
        <TopPart />
        <StyledNimiText />
        <ProfilePic src={'https://pbs.twimg.com/profile_images/1192201003950583808/vV9BWyLU_400x400.jpg'} />
      </ProfilePicContainer>
      <StyledUsername>
        {arrayOfFormFields.Username ? arrayOfFormFields.Username : defaultFields[0].placeholder}
      </StyledUsername>
      <AccountInfo>
        <EnsName>{ensName}</EnsName>

        {account && chainId && (
          <>
            <Divider />
            <StyledExternalLink color="shadow1" href={getExplorerLink(chainId, account, 'address')}>
              {shortenAddress(account, 2, 4)}
            </StyledExternalLink>
          </>
        )}
      </AccountInfo>
      <Description>
        {arrayOfFormFields.Description ? arrayOfFormFields.Description : defaultFields[1].placeholder}
      </Description>
      <SocialsWrapper margin={'36px 23px 110px 23px'}>
        <SocialsHeader>Socials</SocialsHeader>

        {Object.keys(arrayOfFormFields).map((item, index) => {
          if (FieldsMapping[item]?.logo)
            return (
              <SocialWrapper key={index}>
                <img src={FieldsMapping[item].logo} />
                <SocialFieldText>{arrayOfFormFields[item]}</SocialFieldText>
              </SocialWrapper>
            );
        })}
      </SocialsWrapper>
      <BottomBarTextStyle />
    </StyledWhiteCard>
  );
}
