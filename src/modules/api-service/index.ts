export type NimiApiVersion = 'v1.4' | 'v1';

/**
 * Returns the base URL for the Nimi API.
 * @param {NimiApiVersion} version - The version of the Nimi API to use. Defaults to the latest version.
 * @returns {string} The base URL for the Nimi API.
 */
export function getAPIBaseURL(version: NimiApiVersion = 'v1.4') {
  if (version === 'v1.4') {
    return process.env.REACT_APP_NIMI_API_BASE_URL_V1_4;
  }

  return process.env.REACT_APP_NIMI_API_BASE_URL as string;
}
