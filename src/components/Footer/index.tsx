import styled from 'styled-components';

import { ReactComponent as GitHubLogo } from '../../assets/svg/github-logo.svg';
import { ReactComponent as Twitter } from '../../assets/svg/twitter-logo.svg';
import { ExternalLink, FOOTER_HEIGHT, MEDIA_WIDTHS } from '../../theme';

export function Footer() {
  return (
    <Container>
      <Content>
        <Paragraph>
          Nimi.eth |&nbsp;<a href="https://amsterdam.ethglobal.com/">ETHAmsterdam 2022 Hackathon</a>&nbsp;winners
        </Paragraph>
        <Navigation>
          <ExternalLink title="Nimi on Twitter" href="https://twitter.com/0xNimi">
            <Twitter />
          </ExternalLink>
          <ExternalLink title="Nimi on GitHub" href="https://github.com/nimi-app">
            <GitHubLogo fill="#1F3E4F" />
          </ExternalLink>
        </Navigation>
      </Content>
    </Container>
  );
}

const Container = styled.footer`
  width: 100%;
`;

const Content = styled.div`
  max-width: ${MEDIA_WIDTHS.upToMedium}px;
  width: 100%;
  height: ${FOOTER_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin: 0 auto;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: column;
  }
`;

const Paragraph = styled.p`
  display: inline-block;
  line-height: 24px;
  text-align: left;
`;

const Navigation = styled.nav`
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
