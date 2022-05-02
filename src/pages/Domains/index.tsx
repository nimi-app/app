import { Flex } from 'rebass';
import styled from 'styled-components';
import { ENSNameCard } from '../../components/EnsNameCard';
import { MockENSData } from '../../mock_fixtures';

const StyledDomainsWrapper = styled(Flex)`
  flex-wrap: wrap;
  gap: 19px;
`;

export function Domains() {
  return (
    <StyledDomainsWrapper>
      {MockENSData.map(({ ensDomain, imageUrl }) => {
        return <ENSNameCard ensDomain={ensDomain} imageUrl={imageUrl} />;
      })}
    </StyledDomainsWrapper>
  );
}
