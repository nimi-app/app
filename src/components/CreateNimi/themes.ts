import { NimiThemeType } from '@nimi.io/card/types';

import daivinityLogoImage from '../../assets/theme/daivinity-logo-image.png';
import daivinityLogoText from '../../assets/theme/daivinity-logo-text.svg?url';
import daivinityPreview from '../../assets/theme/daivinity-preview.png';
import devconLogoImage from '../../assets/theme/devcon-logo-image.svg?url';
import devconLogoText from '../../assets/theme/devcon-logo-text.svg?url';
import devconPreview from '../../assets/theme/devcon-preview.png';
import nimiOGLogoImage from '../../assets/theme/nimi-og-logo-image.png';
import nimiOGLogoText from '../../assets/theme/nimi-og-logo-text.svg?url';
import nimiOGPreview from '../../assets/theme/nimi-og-preview.png';
import raaveLogoImage from '../../assets/theme/raave-logo-image.png';
import raaveLogoText from '../../assets/theme/raave-logo-text.svg?url';
import raavePreview from '../../assets/theme/raave-preview.png';
import { NimiCuratedTheme, ThemeAssets } from '../../types';

export const themes: Record<NimiCuratedTheme, ThemeAssets> = {
  [NimiThemeType.NIMI_OG]: {
    type: NimiThemeType.NIMI_OG,
    logoImage: nimiOGLogoImage.src,
    logoText: nimiOGLogoText.src,
    preview: nimiOGPreview.src,
  },
  [NimiThemeType.DEVCON_2023_BOGOTA]: {
    type: NimiThemeType.DEVCON_2023_BOGOTA,
    logoImage: devconLogoImage.src,
    logoText: devconLogoText.src,
    preview: devconPreview.src,
  },
  [NimiThemeType.RAAVE_2023_BOGOTA]: {
    type: NimiThemeType.RAAVE_2023_BOGOTA,
    logoImage: raaveLogoImage.src,
    logoText: raaveLogoText.src,
    preview: raavePreview.src,
  },
  [NimiThemeType.DAIVINITY_2023_BOGOTA]: {
    type: NimiThemeType.DAIVINITY_2023_BOGOTA,
    logoImage: daivinityLogoImage.src,
    logoText: daivinityLogoText.src,
    preview: daivinityPreview.src,
  },
  // [NimiThemeType.INFINITE]: {
  //   type: NimiThemeType.RAAVE_2023_BOGOTA,
  //   logoImage: raaveLogoImage,
  //   logoText: raaveLogoText,
  //   preview: devconPreview,
  // },
};
