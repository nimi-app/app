import { useNavigate } from 'react-router-dom';
import { CardWrapper, DomainText, ProfilePic, StyledButton, StyledExternalLink } from './styleds';

interface ENSCardProps {
  ensDomain: string;
  imageUrl?: string;
}

export function ENSNameCard({ ensDomain, imageUrl }: ENSCardProps) {
  const navigate = useNavigate();
  const handleSubmit = () => navigate(`/domains/${ensDomain}`);

  return (
    <CardWrapper>
      {imageUrl && <ProfilePic alt={imageUrl} src={imageUrl} />}
      <DomainText> {ensDomain}</DomainText>
      <StyledButton onClick={handleSubmit}>Set up a Nimi Profile</StyledButton>
      <StyledExternalLink href={`https://${ensDomain}.limo`}>Go to {ensDomain}</StyledExternalLink>
    </CardWrapper>
  );
}
