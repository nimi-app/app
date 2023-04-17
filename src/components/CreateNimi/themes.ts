import { NimiThemeType } from '@nimi.io/card/types';

import daivinityLogoImage from '../../assets/theme/daivinity-logo-image.png';
import daivinityLogoText from '../../assets/theme/daivinity-logo-text.svg';
import daivinityPreview from '../../assets/theme/daivinity-preview.png';
import tokyoLogo from '../../assets/theme/daotokyo-logo.png';
import tokyoPreview from '../../assets/theme/daotokyo-preview.png';
import tokyoText from '../../assets/theme/daotokyo-text.png';
import devconLogoImage from '../../assets/theme/devcon-logo-image.svg';
import devconLogoText from '../../assets/theme/devcon-logo-text.svg';
import devconPreview from '../../assets/theme/devcon-preview.png';
import ethTLVImage from '../../assets/theme/ethtlv-logo.png';
import ethTlvPreview from '../../assets/theme/ethtlv-preview.png';
import ethTlVText from '../../assets/theme/ethtlv-text.svg';
import nimiOGLogoImage from '../../assets/theme/nimi-og-logo-image.png';
import nimiOGLogoText from '../../assets/theme/nimi-og-logo-text.svg';
import nimiOGPreview from '../../assets/theme/nimi-og-preview.png';
import raaveLogoImage from '../../assets/theme/raave-logo-image.png';
import raaveLogoText from '../../assets/theme/raave-logo-text.svg';
import raavePreview from '../../assets/theme/raave-preview.png';
import { NimiCuratedTheme, ThemeAssets } from '../../types';

export const themes: Record<NimiCuratedTheme, ThemeAssets> = {
  [NimiThemeType.NIMI]: {
    type: NimiThemeType.NIMI,
    logoImage: nimiOGLogoImage,
    logoText: nimiOGLogoText,
    preview: nimiOGPreview,
  },
  [NimiThemeType.DEVCON]: {
    type: NimiThemeType.DEVCON,
    logoImage: devconLogoImage,
    logoText: devconLogoText,
    preview: devconPreview,
  },
  [NimiThemeType.RAAVE]: {
    type: NimiThemeType.RAAVE,
    logoImage: raaveLogoImage,
    logoText: raaveLogoText,
    preview: raavePreview,
  },
  [NimiThemeType.DAIVINITY]: {
    type: NimiThemeType.DAIVINITY,
    logoImage: daivinityLogoImage,
    logoText: daivinityLogoText,
    preview: daivinityPreview,
  },
  [NimiThemeType.ETHTLV_2023]: {
    type: NimiThemeType.ETHTLV_2023,
    logoImage: ethTLVImage,
    logoText: ethTlVText,
    preview: ethTlvPreview,
  },
  [NimiThemeType.ETH_RIO_2023]: {
    type: NimiThemeType.ETH_RIO_2023,
    logoImage: ethTLVImage,
    logoText: ethTlVText,
    preview: ethTlvPreview,
  },
  [NimiThemeType.ETH_DENVER_2023]: {
    type: NimiThemeType.ETH_DENVER_2023,
    logoImage: ethTLVImage,
    logoText: ethTlVText,
    preview: ethTlvPreview,
  },
  [NimiThemeType.DAO_TOKYO_2023]: {
    type: NimiThemeType.DAO_TOKYO_2023,
    logoImage: tokyoLogo,
    logoText: tokyoText,
    preview: tokyoPreview,
  },
};
