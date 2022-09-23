// TODO: Check with the team what should be validated for each link type.
// TODO: Define regular expression validator for each of the types!

export const inputValidators = {
  URL: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
  EMAIL: /^[a-zA-Z0-9]{3,}$/,
  TWITTER: /^[a-zA-Z0-9]{3,}$/,
  INSTAGRAM: /^[a-zA-Z0-9]{3,}$/,
  LINKEDIN: /^[a-zA-Z0-9]{3,}$/,
  YOUTUBE_CHANNEL: /^[a-zA-Z0-9]{3,}$/,
  TWITCH: /^[a-zA-Z0-9]{3,}$/,
  GITHUB: /^[a-zA-Z0-9]{3,}$/,
  MEDIUM: /^[a-zA-Z0-9]{3,}$/,
  LENSTER: /^[a-zA-Z0-9]{3,}$/,
  TELEGRAM: /^[a-zA-Z0-9]{3,}$/,
  REDDIT: /^[a-zA-Z0-9]{3,}$/,
  DISCORD: /^[a-zA-Z0-9]{3,}$/,
  WHATSAPP: /^[a-zA-Z0-9]{3,}$/,
  MESSENGER: /^[a-zA-Z0-9]{3,}$/,
  WECHAT: /^[a-zA-Z0-9]{3,}$/,
  KEYBASE: /^[a-zA-Z0-9]{3,}$/,
  SNAPCHAT: /^[a-zA-Z0-9]{3,}$/,
  FACEBOOK: /^[a-zA-Z0-9]{3,}$/,
  DRIBBBLE: /^[a-zA-Z0-9]{3,}$/,
  FIGMA: /^[a-zA-Z0-9]{3,}$/,
};
