import { Flex } from 'rebass';
import styled from 'styled-components';
import EnsNameCard from '../../components/EnsNameCard';
import { MockENSData } from '../../constants/mock_fixtures';

const StyledDomainsWrapper = styled(Flex)`
  flex-wrap: wrap;
  gap: 19px;
`;

export function Domains() {
  return (
    <StyledDomainsWrapper>
      {MockENSData.map(({ ensDomain, imageUrl }) => {
        return <EnsNameCard ensDomain={ensDomain} imageUrl={imageUrl} />;
      })}
    </StyledDomainsWrapper>
  );
}
