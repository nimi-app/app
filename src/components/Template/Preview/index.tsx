import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { WhiteCard } from '../../../theme';
import { ReactComponent as NimiText } from '../../../assets/svg/nimi-text.svg';
import { useActiveWeb3React } from '../../../hooks/useWeb3';
import { Flex } from 'rebass';
import { defaultFields } from '../../../constants';
const StyledWhiteCard = styled(WhiteCard)`
  width: 372.87px;
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
  /* or 32px */

  display: flex;
  align-items: center;

  color: #000000;
`;
const EnsName = styled.div``;

const Divider = styled.div``;
const Address = styled.div``;
const SocialsWrapper = styled(WhiteCard)`
  margin: 36px 23px auto 23px;
  padding: 38px;
  width: 100%;
  align-items: flex-start;
`;
const SocialsHeader = styled.div`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 500;
  font-size: 27.8408px;
  color: #000000;
`;
const Description = styled.div``;
const SocialWrapper = styled.div``;
const BottomSection = styled.div`
  position: absolute;
  width: 372.87px;
  height: 74.57px;
  bottom: -1px;
  transform: rotate(-180deg);
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  opacity: 0.8;
  border-radius: 111px 107px 198.863px 198.863px;
`;
interface PreviewProps {
  ensName?: string;
}
export function Preview({ ensName }: PreviewProps) {
  const { watch } = useFormContext();
  const { account } = useActiveWeb3React();
  console.log(account, 'address');
  console.log('ensName', ensName);
  const arrayOfFormFields = watch();
  console.log(arrayOfFormFields);

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
      <Flex>
        <EnsName>{ensName}</EnsName>
        <Divider />
        <Address>{account}</Address>
      </Flex>
      <Description>
        {arrayOfFormFields.Description ? arrayOfFormFields.Description : defaultFields[1].placeholder}
      </Description>
      <SocialsWrapper>
        <SocialsHeader>Socials</SocialsHeader>
        {/* fix this object and shit when brain works better */}
        {Object.keys(arrayOfFormFields).map((item, index) => {
          if (item)
            return (
              <div key={index}>
                <SocialWrapper></SocialWrapper>
                <div> Field:{item}</div>
                <div> Value:{arrayOfFormFields[item]}</div>
              </div>
            );
        })}
      </SocialsWrapper>
      <BottomSection></BottomSection>
    </StyledWhiteCard>
  );
}
