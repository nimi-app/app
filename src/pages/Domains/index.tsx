import { Flex } from 'rebass';
import styled from 'styled-components';
import EnsNameCard from '../../components/EnsNameCard';

const arrayOfEnsData = [
  {
    ensDomain: 'milanrasovic.eth',
    imageUrl: 'https://pbs.twimg.com/profile_images/1511030457093271558/GBHgfEOS_400x400.jpg',
  },
  {
    ensDomain: 'blue.eth',
    imageUrl: 'https://pbs.twimg.com/profile_images/701077842197618688/6mRqLx_p_400x400.jpg',
  },
  { ensDomain: 'green.eth', imageUrl: '' },
  { ensDomain: 'red.eth', imageUrl: '' },
];
const StyledDomainsWrapper = styled(Flex)`
  flex-wrap: wrap;
  gap: 19px;
`;
export function Domains() {
  return (
    <StyledDomainsWrapper>
      {arrayOfEnsData.map(({ ensDomain, imageUrl }) => {
        return <EnsNameCard ensDomain={ensDomain} imageUrl={imageUrl} />;
      })}
    </StyledDomainsWrapper>
  );
}
