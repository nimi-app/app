import Link from 'next/link';

import GitHubLogo from '../../assets/svg/github-logo.svg';
import { Container } from '../Container';
import { FooterContent, FooterMain, FooterNav, FooterWrapper, TwitterLogo } from './styled';

export function Footer() {
  return (
    <FooterMain>
      <Container>
        <FooterWrapper>
          <FooterContent>
            <span>
              Nimi.eth | <a href="https://amsterdam.ethglobal.com/">ETHAmsterdam 2022 Hackathon</a> winners
            </span>
          </FooterContent>
          <FooterNav>
            <Link title="Nimi on Twitter" href="https://twitter.com/0xNimi">
              <TwitterLogo />
            </Link>
            <Link title="Nimi on GitHub" href="https://github.com/nimi-app">
              <GitHubLogo fill="#1F3E4F" />
            </Link>
          </FooterNav>
        </FooterWrapper>
      </Container>
    </FooterMain>
  );
}
