import BackgroundImg from '../../assets/svg/bg-nimi.svg';
import NimiSocialCircles from '../../assets/svg/circles.png';
import NimiCensorshipProof from '../../assets/svg/shield.png';
import NimiFeedsCurated from '../../assets/svg/img-feeds-curated.png';
import NimiOneLink from '../../assets/svg/one-link.png';
import MadePossibleOrb from '../../assets/svg/made-possible-orb.png';

import { ReactComponent as NimiLogoText } from '../../assets/svg/logo-nimi.svg';
import { ReactComponent as NimiCurated } from '../../assets/svg/nimi-curated.svg';

import { ReactComponent as IconAppStore } from '../../assets/svg/icon-appstore.svg';
import { ReactComponent as IconAudits } from '../../assets/svg/icon-audits.svg';
import { ReactComponent as IconClubhouse } from '../../assets/svg/icon-clubhouse.svg';
import { ReactComponent as IconDiscord } from '../../assets/svg/icon-discord.svg';
import { ReactComponent as IconFacebook } from '../../assets/svg/icon-facebook.svg';
import { ReactComponent as IconFigma } from '../../assets/svg/icon-figma.svg';
import { ReactComponent as IconGithub } from '../../assets/svg/icon-github.svg';
import { ReactComponent as IconGnosis } from '../../assets/svg/icon-gnosis.svg';
import { ReactComponent as IconInstagram } from '../../assets/svg/icon-instagram.svg';
import { ReactComponent as IconKeybase } from '../../assets/svg/icon-keybase.svg';
import { ReactComponent as IconLens } from '../../assets/svg/icon-lens.svg';
import { ReactComponent as IconLinkedin } from '../../assets/svg/icon-linkedin.svg';
import { ReactComponent as IconMedium } from '../../assets/svg/icon-medium.svg';
import { ReactComponent as IconMessenger } from '../../assets/svg/icon-messenger.svg';
import { ReactComponent as IconOpensea } from '../../assets/svg/icon-opensea.svg';
import { ReactComponent as IconPaypal } from '../../assets/svg/icon-paypal.svg';
import { ReactComponent as IconPinterest } from '../../assets/svg/icon-pinterest.svg';
import { ReactComponent as IconQq } from '../../assets/svg/icon-qq.svg';
import { ReactComponent as IconSignal } from '../../assets/svg/icon-signal.svg';
import { ReactComponent as IconSnapchat } from '../../assets/svg/icon-snapchat.svg';
import { ReactComponent as IconSteam } from '../../assets/svg/icon-steam.svg';
import { ReactComponent as IconTiktok } from '../../assets/svg/icon-tiktok.svg';
import { ReactComponent as IconTwitch } from '../../assets/svg/icon-twitch.svg';
import { ReactComponent as IconTwitter } from '../../assets/svg/icon-twitter.svg';
import { ReactComponent as IconWechat } from '../../assets/svg/icon-wechat.svg';
import { ReactComponent as IconReddit } from '../../assets/svg/icon-reddit.svg';
import { ReactComponent as IconSnapshot } from '../../assets/svg/icon-snapshot.svg';
import { ReactComponent as IconZerion } from '../../assets/svg/icon-zerion.svg';

import { ReactComponent as LogoDxdao } from '../../assets/svg/dxdao.svg';
import { ReactComponent as LogoGitcoin } from '../../assets/svg/gitcoin.svg';
import { ReactComponent as LogoEns } from '../../assets/svg/ens.svg';
import { ReactComponent as LogoLens } from '../../assets/svg/lens.svg';

import { ReactComponent as LogoNimiText } from '../../assets/svg/logo-nimi-text.svg';
import { ReactComponent as IconTwitterNimi } from '../../assets/svg/icon-twitter-nimi.svg';
import { ReactComponent as IconDiscordNimi } from '../../assets/svg/icon-discord-nimi.svg';
import { ReactComponent as IconGithubNimi } from '../../assets/svg/icon-github-nimi.svg';

// SVGs
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
// Styled components
import { Content, Header, PageWrapper } from './styled';

export function Landing() {
  return (
    <PageWrapper>
      <img src={BackgroundImg} className="background-img" />
      <Header>
        <NimiLogoText height="60px" />
      </Header>
      <Content className="landing-container">
        <Container>
          <NimiCurated className="nimi-curated" width="100%" />
          <div className="email-form">
            <h3>Sign up for beta access</h3>
            <div className="email-field-container">
              <input type="email" name="email" placeholder="Enter your e-mail address" className="email-field"></input>
              <Button>
                <span>Sign Up</span>
              </Button>
            </div>
          </div>
        </Container>
          <div className="cards-container">
            <div className="card">
              <div className="card-img-container">
                <img src={NimiOneLink} width="100%" />
              </div>
              <h3>
                <b>One Link</b> to rule them all
              </h3>
              <p>With Nimi Link you can gather all your socials & links into one place, your nimi profile. </p>
            </div>
            <div className="card feeds">
              <div className="card-img-container">
                <img src={NimiFeedsCurated} width="100%" />
              </div>
              <h3>
                <b>Feeds</b>, Curated
              </h3>
              <p>With Nimi Curated it is easy to keep up with those you follow. Curate what you want to see.</p>
            </div>
            <div className="card circles">
              <div className="card-img-container">
                <img src={NimiSocialCircles} width="100%" />
              </div>
              <h3>
                <b>Circles</b> is coming back!
              </h3>
              <p>Social Circles makes you in control of what is getting shared and with who. Take back control.</p>
            </div>
            <div className="card">
              <div className="card-img-container">
                <img src={NimiCensorshipProof} width="100%" />
              </div>
              <h3>
                Censorship<b> proof</b>
              </h3>
              <p>
                You are the captain of this ship.<br></br>
                Your data, your terms.<br></br>
                All, Powered by Ethereum.
              </p>
            </div>
          </div>
          <Container>
            <div className="links-section">
              <h2>
                <b>All</b> your links & Content in <b>one place</b>
              </h2>
              <p>Our smart link detection makes sure all links are valid and verified</p>
              <div className="links-container">
                <div className="link-card">
                  <IconTwitter />
                  <span>Twitter</span>
                </div>
                <div className="link-card">
                  <IconInstagram />
                  <span>Instagram</span>
                </div>
                <div className="link-card">
                  <IconFacebook />
                  <span>Facebook</span>
                </div>
                <div className="link-card">
                  <IconLinkedin />
                  <span>LinkedIn</span>
                </div>
                <div className="link-card">
                  <IconKeybase />
                  <span>Keybase</span>
                </div>
                <div className="link-card">
                  <IconDiscord />
                  <span>Discord</span>
                </div>
                <div className="link-card">
                  <IconFigma />
                  <span>Figma</span>
                </div>
                <div className="link-card">
                  <IconMedium />
                  <span>Medium</span>
                </div>
                <div className="link-card">
                  <IconLens />
                  <span>Lens</span>
                </div>
                <div className="link-card">
                  <IconOpensea />
                  <span>Opensea</span>
                </div>
                <div className="link-card">
                  <IconGithub />
                  <span>GitHub</span>
                </div>
                <div className="link-card">
                  <IconZerion />
                  <span>Zerion</span>
                </div>
                <div className="link-card">
                  <IconGnosis />
                  <span>Gnosis Safe</span>
                </div>
                <div className="link-card">
                  <IconSnapshot />
                  <span>Snapshot</span>
                </div>
                <div className="link-card">
                  <IconAudits />
                  <span>Audits</span>
                </div>
                <div className="link-card">
                  <IconAudits />
                  <span>Bounties</span>
                </div>
                <div className="link-card">
                  <IconTiktok />
                  <span>Tiktok</span>
                </div>
                <div className="link-card">
                  <IconTwitch />
                  <span>Twitch</span>
                </div>
                <div className="link-card">
                  <IconSteam />
                  <span>Steam</span>
                </div>
                <div className="link-card">
                  <IconQq />
                  <span>QQ</span>
                </div>
                <div className="link-card">
                  <IconAppStore />
                  <span>Appstore</span>
                </div>
                <div className="link-card">
                  <IconPaypal />
                  <span>Paypal</span>
                </div>
                <div className="link-card">
                  <IconPinterest />
                  <span>Pinterest</span>
                </div>
                <div className="link-card">
                  <IconReddit />
                  <span>Reddit</span>
                </div>
                <div className="link-card">
                  <IconSnapchat />
                  <span>Snapchat</span>
                </div>
                <div className="link-card">
                  <IconMessenger />
                  <span>Messenger</span>
                </div>
                <div className="link-card">
                  <IconSignal />
                  <span>Signal</span>
                </div>
                <div className="link-card">
                  <IconWechat />
                  <span>WeChat</span>
                </div>
                <div className="link-card">
                  <IconClubhouse />
                  <span>Clubhouse</span>
                </div>
              </div>
            </div>
            <div className="made-possible-section">
              <div className="made-possible-container">
                <img src={MadePossibleOrb} width="100%" />
                <h2>Made possible thanks to</h2>
              </div>
              <div className="made-possible-logos">
                <LogoDxdao />
                <LogoGitcoin />
                <LogoLens />
                <LogoEns />
              </div>
            </div>
            <div className="email-form">
              <h3>Sign up for beta access</h3>
              <div className="email-field-container">
                <input type="email" name="email" placeholder="Enter your e-mail address" className="email-field"></input>
                <Button>
                  <span>Sign Up</span>
                </Button>
              </div>
            </div>
            <footer>
              <LogoNimiText />
              <span>TO MAKE THE WEB3 A LITTLE LESS BORING</span>
              <div className="social-icons">
                <a href="https://twitter.com/0xNimi" target="_blank" rel="noreferrer">
                  <IconTwitterNimi />
                </a>
                <a href="https://discord.com/invite/ZcyJa7MJZR" target="_blank" rel="noreferrer">
                  <IconDiscordNimi />
                </a>
                <a href="https://github.com/nimi-app" target="_blank" rel="noreferrer">
                  <IconGithubNimi />
                </a>
              </div>
            </footer>
        </Container>
      </Content>
    </PageWrapper>
  );
}
