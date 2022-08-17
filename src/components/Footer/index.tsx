// Styled components
import { TwitterLogo, FooterMain, FooterContent, FooterNav, FooterWrapper } from './styled';

// SVGs

import { ReactComponent as GitHubLogo } from '../../assets/svg/github-logo.svg';
import { ExternalLink } from '../../theme';
import { Container } from '../Container';

export function Footer() {
  return (
    <FooterMain>
      <Container>
        <FooterWrapper>
          <FooterContent>
            <span>Nimi.eth | Solana Hackers</span>
          </FooterContent>
          <FooterNav>
            <ExternalLink title="Nimi on Twitter" href="https://twitter.com/0xNimi">
              <TwitterLogo />
            </ExternalLink>
            <ExternalLink title="Nimi on GitHub" href="https://github.com/nimi-app">
              <GitHubLogo fill="#1F3E4F" />
            </ExternalLink>
          </FooterNav>
        </FooterWrapper>
      </Container>
    </FooterMain>
  );
}
