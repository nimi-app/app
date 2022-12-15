import axios from 'axios';

/**
 * Returns the base URL for the Nimi API.
 * @returns {string} The base URL for the Nimi API.
 */
export function getAPIBaseURL() {
  // If the REACT_APP_NIMI_API_BASE_URL is not set, throw an error.
  if (!process.env.REACT_APP_NIMI_API_BASE_URL) {
    throw new Error('REACT_APP_NIMI_API_BASE_URL is not set.');
  }

  if (
    process.env.REACT_APP_NIMI_API_DEV_BASE_URL &&
    (process.env.NODE_ENV === 'development' || process.env.REACT_APP_ENV === 'development')
  ) {
    return process.env.REACT_APP_NIMI_API_DEV_BASE_URL;
  }

  return process.env.REACT_APP_NIMI_API_BASE_URL as string;
}

export const baseClient = axios.create({
  baseURL: getAPIBaseURL(),
});
