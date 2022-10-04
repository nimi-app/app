export type NimiApiVersion = 'v1.4' | 'v1';

/**
 * Returns the base URL for the Nimi API.
 * @returns {string} The base URL for the Nimi API.
 */
export function getAPIBaseURL() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_NIMI_API_DEV_BASE_URL;
  } else {
    return process.env.REACT_APP_NIMI_API_BASE_URL as string;
  }
}
