import axios from 'axios';

/**
 * Returns the POAP API client.
 * @returns
 */
export function getPOAPAPIClient() {
  if (!process.env.REACT_APP_POAP_API_KEY) {
    throw new Error('REACT_APP_POAP_API_KEY is not set.');
  }

  return axios.create({
    baseURL: 'https://api.poap.tech',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.REACT_APP_POAP_API_KEY,
    },
  });
}
