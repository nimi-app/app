// Styled components
import { FooterMain, FooterContent, FooterNav, FooterWrapper } from './styled';

import { Container } from '../../components/Container';
// SVGs

import { ReactComponent as TwitterLogo } from '../../assets/svg/twitter-logo.svg';
import { ReactComponent as GitHubLogo } from '../../assets/svg/github-logo.svg';

export function Footer() {
  return (
    <FooterMain>
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
    </FooterMain>
  );
}
