import { Flex } from 'rebass';
import { Link } from 'react-router-dom';
// SVGs
import { ReactComponent as CTAButtonLogo } from '../../assets/svg/wallet-connect.svg';
import { ReactComponent as TwitterLogo } from '../../assets/svg/twitter-logo.svg';
import { ReactComponent as GitHubLogo } from '../../assets/svg/github-logo.svg';
import { ReactComponent as NimiLogo } from '../../assets/svg/nimi-logo.svg';

// Styled components
import {
  PageWrapper,
  Header,
  Content,
  HeroLead,
  HeroSub,
  HeroText,
  Footer,
  FooterContent,
  FooterNav,
  FooterWrapper,
} from './styled';
import { ButtonPrimary } from '../../components/Button';
import { Container } from '../../components/Container';
import styled from 'styled-components';

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
          <div>
            <Link to="/domains">
              <ButtonPrimary>
                <CTAButtonWrapper>
                  <CTAButtonLogo />
                  <span>Go to Nimi</span>
                </CTAButtonWrapper>
              </ButtonPrimary>
            </Link>
          </div>
        </Container>
      </Content>
      <Footer>
        <Container>
          <FooterWrapper>
            <FooterContent>
              <span>
                Nimi.eth | <a href="https://amsterdam.ethglobal.com/"> ETHAmsterdam 2022 Hackathon</a> winners
              </span>
            </FooterContent>
            <FooterNav>
              <a title="Nimi on Twitter" href="https://twitter.com/0xNimi">
                <TwitterLogo />
              </a>
              <a title="Nimi on GitHub" href="https://twitter.com/nimi-app">
                <GitHubLogo fill="#1F3E4F" />
              </a>
            </FooterNav>
          </FooterWrapper>
        </Container>
      </Footer>
    </PageWrapper>
  );
}
