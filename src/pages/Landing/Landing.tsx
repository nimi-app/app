import { Flex } from 'rebass';
import { Link } from 'react-router-dom';
// SVGs
import { ReactComponent as CTAButtonLogo } from '../../assets/svg/wallet-connect.svg';

import { ReactComponent as NimiLogo } from '../../assets/svg/nimi-logo.svg';

// Styled components
import { PageWrapper, Header, Content, HeroLead, HeroSub, HeroText } from './styled';
import { ButtonPrimary } from '../../components/Button';
import { Container } from '../../components/Container';
import styled from 'styled-components';
import { Footer } from '../../components/Footer';

const CTAButtonWrapper = styled(Flex)`
  align-items: center;
  gap: 10px;
`;

export function Landing() {
  return (
    <PageWrapper>
      <Header>
        <NimiLogo />
      </Header>
      <Content>
        <Container>
          <HeroText>
            <HeroLead>Your ENS deserves better.</HeroLead>
            <HeroSub>Nimi, new me.</HeroSub>
          </HeroText>

          <Link to="/domains">
            <ButtonPrimary>
              <CTAButtonWrapper>
                <CTAButtonLogo />
                <span>Go to Nimi</span>
              </CTAButtonWrapper>
            </ButtonPrimary>
          </Link>
        </Container>
      </Content>
      <Footer />
    </PageWrapper>
  );
}
