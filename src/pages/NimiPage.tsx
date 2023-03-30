import { NimiPage as NimiPageRender } from '@nimi.io/card';
import { NimiThemeType } from '@nimi.io/card/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * Renders any valid ENS name nimi page on the path /:nimiUsername.
 * Example: https://nimi.io/dvve.eth will attempt to render the Nimi page for the ENS name dvve.eth
 */
export default function NimiPage() {
  const [loading, setLoading] = useState(true);
  const { nimiUsername } = useParams();

  // Attempt to find a snapshot for the given ENS name
  useEffect(() => {
    try {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }, [nimiUsername]);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <NimiPageRender
      nimi={{
        displayName: 'Nimi',
        image: {
          type: 'URL' as any,
          url: 'https://ipfs.io/ipfs/QmTVmDTUNnMChujFptE4gQvo2QH2yBpj4YX2wzVT1mdZEv',
        },
        addresses: [{ address: '0x26358E62C2eDEd350e311bfde51588b8383A9315', blockchain: 'ETHEREUM' as any }],
        description:
          'Host your personal page on your ENS domain! Nimi 0.1.alpha live on Ethereum Mainnet :) #devconnect #ETHAmsterdam',
        ensAddress: '0x26358E62C2eDEd350e311bfde51588b8383A9315',
        widgets: [
          {
            type: 'POAP' as any,
            context: {
              tokenIds: ['5388110', '5364618', '5389976', '4997079', '4941037', '4770382'],
            },
          },
          {
            type: 'NFTY_UNIVERSAL_DM' as any,
            context: {},
          },
        ],
        ensName: 'nimce.ethereum.rio',
        links: [
          { type: 'DISCORD' as any, title: '', content: 'violet#6640' },
          { type: 'EMAIL' as any, title: 'Email', content: 'smilenostress@gmail.com' },
          { type: 'URL' as any, title: 'My website', content: 'https://linkedin.com/in/Mi-lan' },
          { type: 'TWITTER' as any, title: 'Twitter', content: '0xViolet' },
          { type: 'LINKEDIN' as any, title: 'Github', content: 'https://linkedin.com/in/Mi-lan' },
          { type: 'GITHUB' as any, title: 'Github', content: 'https://github.com/Mi-lan' },
          { type: 'LENSTER' as any, title: 'Lenster', content: 'luduvigo.lens' },
          { type: 'FIGMA' as any, title: '', content: 'luduvigo' },
          { type: 'DRIBBBLE' as any, title: 'Personal', content: 'dribler' },
        ],
        theme: {
          type: NimiThemeType.ETHTLV_2023,
        },
      }}
      isApp={true}
    />
  );
}
