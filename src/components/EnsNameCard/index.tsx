import { Flex } from 'rebass';
import styled from 'styled-components';
import { ExternalLink } from '../../theme';
import { ButtonPrimary } from '../Button';

interface EnsCardProps {
  ensDomain: string;
  imageUrl?: string;
}

const CardWrapper = styled(Flex)`
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 5px 24px rgba(138, 143, 234, 0.12);
  backdrop-filter: blur(20px);
  width: 337px;
  height: 348px;
  flex-direction: column;
  border-radius: 25px;
  padding: 32px 65px;
  justify-content: center;
`;
const DomainText = styled.div`
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 100%;
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
  margin-bottom: 42px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
const ProfilePic = styled.img`
  background-position: center, center;
  background-size: cover;
  border: 8px solid #ffffff;
  border-radius: 200px;
  height: 83px;
  width: 83px;
  margin-bottom: 24px;
  z-index: 1;
`;
const StyledExternalLink = styled(ExternalLink)``;

export default function EnsNameCard({ ensDomain, imageUrl }: EnsCardProps) {
  return (
    <CardWrapper>
      {imageUrl && <ProfilePic alt={imageUrl} src={imageUrl} />}
      <DomainText> {ensDomain}</DomainText>
      <ButtonPrimary>Set up a Nimi Profile</ButtonPrimary>
      <StyledExternalLink href={`https://${ensDomain}.limo`}>Go to {ensDomain}</StyledExternalLink>
    </CardWrapper>
  );
}
