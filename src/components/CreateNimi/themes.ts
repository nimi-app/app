import { NimiThemeType } from '@nimi.io/card/types';

import daivinityLogoImage from '../../assets/theme/daivinity-logo-image.png';
import daivinityLogoText from '../../assets/theme/daivinity-logo-text.svg?url';
import daivinityPreview from '../../assets/theme/daivinity-preview.png';
import devconLogoImage from '../../assets/theme/devcon-logo-image.svg?url';
import devconLogoText from '../../assets/theme/devcon-logo-text.svg?url';
import devconPreview from '../../assets/theme/devcon-preview.png';
import ethTLVImage from '../../assets/theme/ethtlv-logo.png';
import ethTlvPreview from '../../assets/theme/ethtlv-preview.png';
import ethTlVText from '../../assets/theme/ethtlv-text.svg?url';
import nimiOGLogoImage from '../../assets/theme/nimi-og-logo-image.png';
import nimiOGLogoText from '../../assets/theme/nimi-og-logo-text.svg?url';
import nimiOGPreview from '../../assets/theme/nimi-og-preview.png';
import raaveLogoImage from '../../assets/theme/raave-logo-image.png';
import raaveLogoText from '../../assets/theme/raave-logo-text.svg?url';
import raavePreview from '../../assets/theme/raave-preview.png';
import { NimiCuratedTheme, ThemeAssets } from '../../types';

export const themes: Record<NimiCuratedTheme, ThemeAssets> = {
  [NimiThemeType.NIMI]: {
    type: NimiThemeType.NIMI,
    logoImage: nimiOGLogoImage.src,
    logoText: nimiOGLogoText.src,
    preview: nimiOGPreview.src,
  },
  [NimiThemeType.DEVCON]: {
    type: NimiThemeType.DEVCON,
    logoImage: devconLogoImage.src,
    logoText: devconLogoText.src,
    preview: devconPreview.src,
  },
  [NimiThemeType.RAAVE]: {
    type: NimiThemeType.RAAVE,
    logoImage: raaveLogoImage.src,
    logoText: raaveLogoText.src,
    preview: raavePreview.src,
  },
  [NimiThemeType.DAIVINITY]: {
    type: NimiThemeType.DAIVINITY,
    logoImage: daivinityLogoImage.src,
    logoText: daivinityLogoText.src,
    preview: daivinityPreview.src,
  },
  [NimiThemeType.ETHTLV_2023]: {
    type: NimiThemeType.ETHTLV_2023,
    logoImage: ethTLVImage.src,
    logoText: ethTlVText.src,
    preview: ethTlvPreview.src,
  },
  // [NimiThemeType.INFINITE]: {
  //   type: NimiThemeType.RAAVE,
  //   logoImage: raaveLogoImage,
  //   logoText: raaveLogoText,
  //   preview: devconPreview,
  // },
};
