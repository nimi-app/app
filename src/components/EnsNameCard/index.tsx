import { CardWrapper, DomainText, ProfilePic, StyledButton, StyledExternalLink } from './styleds';

interface EnsCardProps {
  ensDomain: string;
  imageUrl?: string;
}

export default function EnsNameCard({ ensDomain, imageUrl }: EnsCardProps) {
  return (
    <CardWrapper>
      {imageUrl && <ProfilePic alt={imageUrl} src={imageUrl} />}
      <DomainText> {ensDomain}</DomainText>
      <StyledButton>Set up a Nimi Profile</StyledButton>
      <StyledExternalLink href={`https://${ensDomain}.limo`}>Go to {ensDomain}</StyledExternalLink>
    </CardWrapper>
  );
}
