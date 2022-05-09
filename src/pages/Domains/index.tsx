import { Flex } from 'rebass';
import styled from 'styled-components';
import { ENSNameCard } from '../../components/EnsNameCard';
import { MockENSData } from '../../mock_fixtures';

const StyledDomainsWrapper = styled(Flex)`
  flex-wrap: wrap;
  gap: 19px;
  justify-content: center;
`;

export function Domains() {
  return (
    <StyledDomainsWrapper>
      {MockENSData.map(({ ensDomain, imageUrl }) => {
        return <ENSNameCard key={`${ensDomain} + ${imageUrl}`} ensDomain={ensDomain} imageUrl={imageUrl} />;
      })}
    </StyledDomainsWrapper>
  );
}
