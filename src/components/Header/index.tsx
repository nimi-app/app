import Link from 'next/link';
import { styled } from 'styled-components';

import NimiLogo from '../../assets/svg/nimi-logo-text.svg';
import { HEADER_HEIGHT, MEDIA_WIDTHS } from '../../theme';
import { Web3Status } from '../Web3Status';

export function Header() {
  return (
    <Container>
      <Content>
        <Link href="/domains">
          <NimiLogo width="100px" height="40px" />
        </Link>
        <Web3Status />
      </Content>
    </Container>
  );
}

const Container = styled.header`
  width: 100%;
`;

const Content = styled.div`
  /* max-width: ${MEDIA_WIDTHS.upToMedium}px; */
  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  margin: 0 auto;
  margin-bottom: 5rem;
  @media (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    padding: 0 20px;
  }
`;
