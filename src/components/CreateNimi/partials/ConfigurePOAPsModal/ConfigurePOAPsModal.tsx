import { useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Reorder, motion, AnimatePresence, useDragControls } from 'framer-motion/dist/framer-motion';

import { ReactComponent as CloseIcon } from '../../../../assets/svg/close-icon.svg';
import { ReactComponent as DotsIcon } from '../../../../assets/svg/dots.svg';
import { NimiSignatureColor } from '../../../../theme';

type NavigationLinkProps = {
  children: string;
  onClick?: () => void;
  selected: boolean;
};

const NavigationLink = ({ children, onClick, selected }: NavigationLinkProps) => (
  <LinkContainer>
    <Link onClick={onClick}>{children}</Link>
    {selected && <LinkUnderline />}
  </LinkContainer>
);

type ConfigurePOAPsModalProps = {
  closeModal: () => void;
};

export function ConfigurePOAPsModal({ closeModal }: ConfigurePOAPsModalProps) {
  const [modalContainer] = useState(() => document.createElement('div'));
  const [customOrder, setCustomOrder] = useState(false);
  const [items, setItems] = useState([
    {
      event: {
        id: 55123,
        fancy_id: 'ethcc-paris-2022-lens-booth-2022',
        name: 'ETHCC Paris 2022 - Lens Booth',
        event_url: 'https://aave.com/',
        image_url: 'https://assets.poap.xyz/ethcc-paris-2022-lens-booth-2022-logo-1657894392878.png',
        country: 'France',
        city: 'Paris',
        description: 'Grow with Lens: This POAP was planted in your wallet at ETHCC 2022',
        year: 2022,
        start_date: '19-Jul-2022',
        end_date: '21-Jul-2022',
        expiry_date: '22-Jul-2022',
        supply: 435,
      },
      tokenId: '5365161',
      owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
      chain: 'xdai',
      created: '2022-07-19 09:10:40',
    },
    {
      event: {
        id: 53834,
        fancy_id: 'ethcc-5-attendee-2022',
        name: 'EthCC [5] - Attendee',
        event_url: 'https://ethcc.io/',
        image_url: 'https://assets.poap.xyz/ethcc-5-attendee-2022-logo-1657181110494.png',
        country: 'France',
        city: 'Paris',
        description:
          "You've attended the 5th edition of the Ethereum Community Conference, held in Paris at the Maison de la Mutuliaté from 19 to 21 July 2022. Thank you for your participation.\r\n\r\nThis POAP NFT gives you access to a collaborative art canvas displayed live during the conference. Join at bit.ly/poapart\r\n\r\nAND...Hunt the official sponsor POAPs around the venue to participate in a raffle for prizes.> https://poap.fun/raffle/1666",
        year: 2022,
        start_date: '19-Jul-2022',
        end_date: '21-Jul-2022',
        expiry_date: '19-Aug-2022',
        supply: 735,
      },
      tokenId: '5364618',
      owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
      chain: 'xdai',
      created: '2022-07-19 08:32:05',
    },
    {
      event: {
        id: 55353,
        fancy_id: 'how-to-be-a-crypto-sagepunk-2022',
        name: 'How to Be a Crypto Sagepunk',
        event_url: 'https://thesis.co/jobs',
        image_url: 'https://assets.poap.xyz/how-to-be-a-crypto-sagepunk-2022-logo-1658097728570.png',
        country: 'France',
        city: 'Paris',
        description: 'Thesis @ EthCC 2022',
        year: 2022,
        start_date: '18-Jul-2022',
        end_date: '18-Jul-2022',
        expiry_date: '23-Jul-2022',
        supply: 11,
      },
      tokenId: '5360797',
      owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
      chain: 'xdai',
      created: '2022-07-18 17:25:20',
    },
    {
      event: {
        id: 47553,
        fancy_id: 'proof-of-raave-ethcc-paris-2022-2022',
        name: 'Proof of rAAVE - ETHCC Paris 2022',
        event_url: 'https://aave.com',
        image_url: 'https://assets.poap.xyz/proof-of-raave-ethcc-paris-2022-2022-logo-1657631969210.png',
        country: '',
        city: '',
        description: 'Good music, good vibes and great Frens!',
        year: 2022,
        start_date: '01-Jul-2022',
        end_date: '01-Jul-2022',
        expiry_date: '31-Jul-2022',
        supply: 517,
      },
      tokenId: '5389976',
      owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
      chain: 'xdai',
      created: '2022-07-22 10:38:15',
    },
    {
      event: {
        id: 43514,
        fancy_id: 'devconnect-attendee-survey-2022',
        name: 'Devconnect Attendee Survey',
        event_url: 'https://devconnect.org/',
        image_url: 'https://assets.poap.xyz/devconnect-attendee-survey-2022-logo-1652120190767.png',
        country: 'Netherlands',
        city: 'Amsterdam',
        description:
          'This POAP is reserved exclusively for attendees of the very first Devconnect in Amsterdam, Netherlands who filled out the Attendee Survey that they received via email. Thank you for taking the time to submit your feedback & helping us improve the experience.',
        year: 2022,
        start_date: '14-May-2022',
        end_date: '14-May-2022',
        expiry_date: '15-Jun-2022',
        supply: 201,
      },
      tokenId: '4977685',
      owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
      chain: 'xdai',
      created: '2022-05-16 14:25:45',
    },
    {
      event: {
        id: 45151,
        fancy_id: 'i-demod-at-ethamsterdam-2022',
        name: "I Demo'd at ETHAmsterdam",
        event_url: 'https://amsterdam.ethglobal.com',
        image_url: 'https://assets.poap.xyz/i-demod-at-ethamsterdam-2022-logo-1652923278845.png',
        country: 'Netherlands',
        city: 'Amsterdam',
        description:
          "This POAP certifies that you demo'd your project at ETHAmsterdam to a panel of judges. Not everyone submits a project, but not only did you submit your project you also shared it live with the judges.\r\n\r\nCongratulations!",
        year: 2022,
        start_date: '24-Apr-2022',
        end_date: '24-Apr-2022',
        expiry_date: '15-Jun-2022',
        supply: 203,
      },
      tokenId: '4997079',
      owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
      chain: 'xdai',
      created: '2022-05-19 13:52:10',
    },
    // {
    //   event: {
    //     id: 43529,
    //     fancy_id: 'ethamsterdam-2022-staked-hacker-2022',
    //     name: 'ETHAmsterdam 2022 Staked Hacker',
    //     event_url: 'https://amsterdam.ethglobal.com/',
    //     image_url: 'https://assets.poap.xyz/ethamsterdam-2022-staked-hacker-2022-logo-1652126873695.png',
    //     country: 'Netherlands',
    //     city: 'Amsterdam',
    //     description:
    //       "This POAP confirms that you were a hacker at ETHGlobal's ETHAmsterdam hackathon on April 22-24th, 2022. ETHAmsterdam united over 1100 people passionate about the future of Ethereum under one roof. The event was part of Devconnect 2022 which took place over a week in April 2022.",
    //     year: 2022,
    //     start_date: '22-Apr-2022',
    //     end_date: '24-Apr-2022',
    //     expiry_date: '15-Jun-2022',
    //     supply: 337,
    //   },
    //   tokenId: '4941037',
    //   owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
    //   chain: 'xdai',
    //   created: '2022-05-11 06:54:30',
    // },
    // {
    //   event: {
    //     id: 32225,
    //     fancy_id: 'raave-eth-amsterdam-2022-2022',
    //     name: 'Proof of rAAVE - ETH Amsterdam 2022',
    //     event_url: 'https://aave.com/',
    //     image_url: 'https://assets.poap.xyz/raave-eth-amsterdam-2022-2022-logo-1649178876067.png',
    //     country: '',
    //     city: '',
    //     description: 'Good vibes, good music, great frens',
    //     year: 2022,
    //     start_date: '22-Apr-2022',
    //     end_date: '22-Apr-2022',
    //     expiry_date: '17-Jul-2022',
    //     supply: 389,
    //   },
    //   tokenId: '4814127',
    //   owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
    //   chain: 'xdai',
    //   created: '2022-04-25 10:16:00',
    // },
    // {
    //   event: {
    //     id: 38040,
    //     fancy_id: 'lens-booth-2022',
    //     name: 'Lens Booth',
    //     event_url: 'https://lens.dev/',
    //     image_url: 'https://assets.poap.xyz/lens-booth-2022-logo-1649435873710.png',
    //     country: 'Netherlands',
    //     city: 'Amsterdam',
    //     description: 'Grow with Lens: This POAP was planted in your wallet at ETH Amsterdam 2022',
    //     year: 2022,
    //     start_date: '22-Apr-2022',
    //     end_date: '24-Apr-2022',
    //     expiry_date: '25-Apr-2022',
    //     supply: 165,
    //   },
    //   tokenId: '4807630',
    //   owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
    //   chain: 'xdai',
    //   created: '2022-04-24 00:37:45',
    // },
    // {
    //   event: {
    //     id: 39095,
    //     fancy_id: 'schelling-point-amsterdam-2022-early-bird-2022',
    //     name: 'Schelling Point Amsterdam 2022 - Early Bird',
    //     event_url: 'https://schellingpoint.gitcoin.co/',
    //     image_url: 'https://assets.poap.xyz/schelling-point-amsterdam-2022-early-bird-2022-logo-1649947264362.png',
    //     country: 'The Netherlands',
    //     city: 'Amsterdam',
    //     description:
    //       'Early bird gets the worm! This POAP is for all the early Schelling Point at Dev Connect in Amsterdam held on 21 April 2022. ',
    //     year: 2022,
    //     start_date: '21-Apr-2022',
    //     end_date: '21-Apr-2022',
    //     expiry_date: '21-May-2022',
    //     supply: 135,
    //   },
    //   tokenId: '4770382',
    //   owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
    //   chain: 'xdai',
    //   created: '2022-04-21 13:46:40',
    // },
    // {
    //   event: {
    //     id: 38724,
    //     fancy_id: 'atlantis-world-devconnect-2022',
    //     name: 'Atlantis World Devconnect',
    //     event_url: 'https://discord.gg/atlantisworld',
    //     image_url: 'https://assets.poap.xyz/atlantis-world-devconnect-2022-logo-1649796868207.png',
    //     country: 'Netherlands',
    //     city: 'Amsterdam',
    //     description:
    //       'You met one of our team members at Devconnect in 2022 at Amsterdam!\r\nThis POAP will give you access to our alpha build of Atlantis World\r\nYou can visit it at Alpha.atlantis.world\r\ndiscord.gg/atlantisworld',
    //     year: 2022,
    //     start_date: '16-Apr-2022',
    //     end_date: '16-Apr-2022',
    //     expiry_date: '30-May-2022',
    //     supply: 345,
    //   },
    //   tokenId: '4791241',
    //   owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
    //   chain: 'xdai',
    //   created: '2022-04-22 21:18:15',
    // },
    // {
    //   event: {
    //     id: 27727,
    //     fancy_id: 'youve-met-rodrigo-at-ethdenver-2022-2022',
    //     name: "You've met Rodrigo at ETHDenver 2022!",
    //     event_url: 'https://app.poap.xyz/',
    //     image_url: 'https://assets.poap.xyz/youve-met-rodrigo-at-ethdenver-2022-2022-logo-1644647170131.png',
    //     country: 'United States',
    //     city: 'Denver',
    //     description:
    //       "This POAP indicates that you've met Rodrigo from the POAP Team at ETHDenver!\r\nTwitter: @rodrigo_lajous\r\nMail: rodrigo@poap.io",
    //     year: 2022,
    //     start_date: '11-Feb-2022',
    //     end_date: '21-Feb-2022',
    //     expiry_date: '31-Mar-2022',
    //     supply: 189,
    //   },
    //   tokenId: '4116462',
    //   owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
    //   chain: 'xdai',
    //   created: '2022-02-18 18:24:55',
    // },
    // {
    //   event: {
    //     id: 11330,
    //     fancy_id: 'eth-lisbon-attendee-day-1-2021',
    //     name: 'ETH Lisbon Attendee - Day 1',
    //     event_url: 'https://www.ethlisbon.org/',
    //     image_url: 'https://assets.poap.xyz/eth-lisbon-attendee-day-1-2021-logo-1634860825369.png',
    //     country: 'Portugal',
    //     city: 'Lisbon',
    //     description: 'Thank you for attending the first day of ETHLisbon. ',
    //     year: 2021,
    //     start_date: '22-Oct-2021',
    //     end_date: '22-Oct-2021',
    //     expiry_date: '22-Nov-2021',
    //     supply: 112,
    //   },
    //   tokenId: '2254320',
    //   owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
    //   chain: 'xdai',
    //   created: '2021-10-22 15:24:15',
    // },
    // {
    //   event: {
    //     id: 10454,
    //     fancy_id: 'ethichub-eth-lisbon-hackathon-2021-2021',
    //     name: 'EthicHub - ETH Lisbon Hackathon 2021',
    //     event_url: '',
    //     image_url: 'https://assets.poap.xyz/ethichub-eth-lisbon-hackathon-2021-2021-logo-1634134608070.png',
    //     country: 'Portugal',
    //     city: 'Lisbon',
    //     description:
    //       "This POAP was given on ETH Lisbon Hackaton 2021, along with a 250 gr. EthicHub's coffee bag. \nThis delicious coffee comes with the possibility of a 20% reward, are you ready to hodl?",
    //     year: 2021,
    //     start_date: '21-Oct-2021',
    //     end_date: '25-Oct-2021',
    //     expiry_date: '25-Nov-2021',
    //     supply: 60,
    //   },
    //   tokenId: '2254266',
    //   owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
    //   chain: 'xdai',
    //   created: '2021-10-22 15:23:40',
    // },
    // {
    //   event: {
    //     id: 9674,
    //     fancy_id: 'proof-of-pale-ale-by-dxdao-x-amo-brewery-2021',
    //     name: '"Proof of Pale" Ale by DXdao x A.M.O. Brewery',
    //     event_url: 'https://dxdao.eth.link/',
    //     image_url: 'https://assets.poap.xyz/proof-of-pale-ale-by-dxdao-x-amo-brewery-2021-logo-1634737571373.png',
    //     country: 'Portugal',
    //     city: 'Lisbon',
    //     description:
    //       'Decentrally crafted among a community of various skilled contributors, this rare "Proof of Pale" Ale brings together a handful of the defining qualities you might seek out in such a creation:\n\nscarcity, freshness, authenticity, community driven, hints of burn, the classic clank and escaping pressure sound, joy, and more...\n\nThis experience exists in a moment in time that is to be remembered, and this POAP provides you with proof.\n\nA special thanks to the A.M.O. Brewery community.',
    //     year: 2021,
    //     start_date: '19-Oct-2021',
    //     end_date: '22-Oct-2021',
    //     expiry_date: '22-Nov-2021',
    //     supply: 303,
    //   },
    //   tokenId: '2213157',
    //   owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
    //   chain: 'xdai',
    //   created: '2021-10-19 20:06:15',
    // },
    // {
    //   event: {
    //     id: 1783,
    //     fancy_id: 'first-community-call-dxdao-2021',
    //     name: 'First Community Call - DXdao',
    //     event_url: 'https://discord.gg/4QXEJQkvHH',
    //     image_url: 'https://assets.poap.xyz/first-community-call-dxdao-2021-logo-1619052713526.png',
    //     country: '',
    //     city: '',
    //     description:
    //       'This POAP indicates virtual attendance of the first DXdao Community Call, held on the DXdao Discord server.',
    //     year: 2021,
    //     start_date: '22-Apr-2021',
    //     end_date: '22-Apr-2021',
    //     expiry_date: '22-May-2021',
    //     supply: 29,
    //   },
    //   tokenId: '170973',
    //   owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
    //   chain: 'xdai',
    //   created: '2021-04-22 15:57:20',
    // },
    // {
    //   event: {
    //     id: 553,
    //     fancy_id: 'ethereum-20-serenity-launch-2020',
    //     name: 'Ethereum 2.0 Serenity Launch',
    //     event_url: 'https://www.youtube.com/watch?v=ciE75qkZXFw',
    //     image_url: 'https://assets.poap.xyz/ethereum-20-serenity-launch-2020-logo-1606540348892.png',
    //     country: '',
    //     city: '',
    //     description: '',
    //     year: 2020,
    //     start_date: '01-Dec-2020',
    //     end_date: '01-Dec-2020',
    //     expiry_date: '01-Jan-2021',
    //     supply: 1201,
    //   },
    //   tokenId: '36046',
    //   owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
    //   chain: 'xdai',
    //   created: '2020-12-01 12:29:30',
    // },
  ]);

  useEffect(() => {
    modalContainer.classList.add('modal-root');
    document.body.appendChild(modalContainer);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.removeChild(modalContainer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const setCustomOrderHandler = (v: boolean) => () => setCustomOrder(v);

  const handleCloseModal = (event) => {
    if (event.target === event.currentTarget) closeModal();
  };

  // {
  //   event: {
  //     id: 55123,
  //     fancy_id: 'ethcc-paris-2022-lens-booth-2022',
  //     name: 'ETHCC Paris 2022 - Lens Booth',
  //     event_url: 'https://aave.com/',
  //     image_url: 'https://assets.poap.xyz/ethcc-paris-2022-lens-booth-2022-logo-1657894392878.png',
  //     country: 'France',
  //     city: 'Paris',
  //     description: 'Grow with Lens: This POAP was planted in your wallet at ETHCC 2022',
  //     year: 2022,
  //     start_date: '19-Jul-2022',
  //     end_date: '21-Jul-2022',
  //     expiry_date: '22-Jul-2022',
  //     supply: 435,
  //   },
  //   tokenId: '5365161',
  //   owner: '0x26358e62c2eded350e311bfde51588b8383a9315',
  //   chain: 'xdai',
  //   created: '2022-07-19 09:10:40',
  // },

  return createPortal(
    <Backdrop onClick={handleCloseModal}>
      {/* // TODO: UPDATE EXIT ANIMATION */}
      <Modal
        initial={{ opacity: 0, scale: 0.5, y: '-100%' }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: '-100%' }}
      >
        <Header>
          <ModalTitle>Configure POAPs</ModalTitle>
          <ModalSubtitle>Add your POAPs in the order you want to showcase them.</ModalSubtitle>
          <CloseButton onClick={handleCloseModal} />
        </Header>
        <Body>
          <BodyControls>
            <BodyTitle>POAPs</BodyTitle>
            <BodyNavigation>
              <NavigationLink selected={!customOrder} onClick={setCustomOrderHandler(false)}>
                Most Recent
              </NavigationLink>
              <NavigationLink selected={customOrder} onClick={setCustomOrderHandler(true)}>
                Custom Order
              </NavigationLink>
            </BodyNavigation>
          </BodyControls>
          <AnimatePresence mode="wait">
            {customOrder ? (
              <CustomizePOAPs key="custom-poaps" items={items} setItems={setItems} />
            ) : (
              <RecentPOAPs key="recent-poaps" items={items} />
            )}
          </AnimatePresence>
        </Body>
      </Modal>
    </Backdrop>,
    modalContainer
  );
}

const AnimatedSection = ({ children }: { children: ReactNode }) => (
  <AnimatedContainer
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </AnimatedContainer>
);

const RecentPOAPs = ({ items }) => (
  <AnimatedSection>
    <POAPsContainer>
      {items.map((item) => (
        <StaticPOAP key={item.tokenId} src={item.event.image_url} />
      ))}
    </POAPsContainer>
  </AnimatedSection>
);

const CustomizePOAPs = ({ items, setItems }) => (
  <AnimatedSection>
    <POAPsContainer>
      <Reorder.Group axis="x" values={items} onReorder={setItems} as="div">
        {items.map((item) => (
          <ReorderItem key={item.tokenId} value={item} />
        ))}
      </Reorder.Group>
    </POAPsContainer>
  </AnimatedSection>
);

const ReorderItem = ({ value }) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={controls}
      dragElastic={0.1}
      whileTap={{ scale: 1.1 }}
      as="div"
      style={{
        width: 108,
        height: 108,
        position: 'relative',
        display: 'inline-block',
        marginRight: '-33px',
      }}
    >
      <Dragger onPointerDown={(e) => controls.start(e)}>
        <Dots />
      </Dragger>
      <StaticPOAP src={value.event.image_url} />
    </Reorder.Item>
  );
};

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
`;

const Modal = styled(motion.div)`
  width: 620px;
  padding: 32px;
  border-radius: 24px;
  background-color: white;
  box-shadow: 0px 0 62px rgba(52, 55, 100, 0.15);
`;

const Header = styled.header`
  position: relative;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h1`
  line-height: 28px;
  font-size: 28px;
  ${NimiSignatureColor}
  margin-bottom: 16px;
`;

const ModalSubtitle = styled.p`
  line-height: 15px;
  font-size: 14px;
  color: #7a7696;
`;

const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const Body = styled.main`
  width: 100%;
  padding: 36px;
  border-radius: 12px;
  background-color: #f1f2f5;
`;

const BodyControls = styled.div`
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BodyTitle = styled.h2`
  line-height: 26px;
  font-size: 26px;
  color: black;
`;

const BodyNavigation = styled.nav`
  height: 21px;
`;

const LinkContainer = styled.div`
  display: inline-block;
  margin-left: 18px;
`;

const Link = styled.a`
  display: inline-block;
  vertical-align: top;
  line-height: 15px;
  font-size: 14px;
  ${NimiSignatureColor}
  cursor: pointer;
  margin-bottom: 4px;
`;

const LinkUnderline = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
`;

const POAPsContainer = styled.div`
  margin-top: 32px;
`;

const StaticPOAP = styled.img`
  width: 108px;
  height: 108px;
  position: relative;
  display: inline-block;
  border-radius: 50%;
  margin-right: -33px;
  background-color: white;
  box-shadow: 0px 14px 24px rgba(52, 55, 100, 0.12);
`;

const AnimatedContainer = styled(motion.div)`
  width: 100%;
  height: 108px;
`;

const Dragger = styled.div`
  width: 34px;
  height: 50px;
  position: absolute;
  bottom: -17px;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 0 0 8px 8px;
  background-color: white;
  user-select: none;
  cursor: pointer;
  box-shadow: 0px 14px 24px rgba(52, 55, 100, 0.12);
`;

const Dots = styled(DotsIcon)`
  position: absolute;
  bottom: 7px;
  left: 50%;
  transform: translate(-50%, 0);
`;
