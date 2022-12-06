import { getAddress, isAddress } from '@ethersproject/address';
import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import { JsonRpcSigner, Web3Provider, JsonRpcProvider } from '@ethersproject/providers';
import { FC, SVGProps } from 'react';
import { nimiLinkDetailsExtended, NimiLinkType } from '@nimi.io/card';

export * from './explorer';

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, charsBefore = 4, charsAfter = 4): string {
  const parsed = getAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, charsBefore + 2)}...${parsed.substring(42 - charsAfter)}`;
}

// account is not optional
export function getSigner(library: Web3Provider | JsonRpcProvider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  provider: Web3Provider | JsonRpcProvider,
  account?: string
): Web3Provider | JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(provider, account) : provider;
}

/**
 * Creates and returns a contract instance
 * @param address The address of the contract to use
 * @param ABI The ABI of the contract to use
 * @param provider The provider to use
 * @param account The account to use
 * @returns
 */
export function getContract<T = Contract>(address: string, ABI: any, provider: Web3Provider, account?: string): T {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  const contract = new Contract(address, ABI, getProviderOrSigner(provider, account)) as unknown;

  return contract as T;
}

/**
 * Checks if its url
 * @param urlString string to be compared against
 * @returns boolean if is valid url
 */
export function isValidURL(urlString) {
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

/**
 * Loads a Fathom instance into the page
 * @param siteId The site id to use
 * @returns
 */
export function loadFathom(siteId: string) {
  return new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://upright-kings-leon.nimi.page/script.js';
    script.setAttribute('data-site', siteId);
    script.setAttribute('data-auto', 'true');
    script.defer = true;
    script.onload = () => resolve;
    document.body.appendChild(script);
  });
}

/**
 * Returns svg in correct format so it can be displated
 * @param logo Logo returned from Nimi-Card
 * @returns
 */
export function renderSVG(logo?: FC<SVGProps<SVGSVGElement>>, size = 20): JSX.Element | undefined {
  if (!logo) return;
  const Logo = logo;

  return <Logo height={size} width={size} />;
}

/**
 * Generates random Id based on timestamp
 * @returns
 */
export function generateID(randomString?: string): string {
  return 'id' + new Date().getTime() + randomString;
}

/**
 * Returns Nimi link type based on url provided
 * @param url string url that should be evaluated
 * @returns NimiLinkType
 */
export function guessLinkTypeBasedOnUrl(url: string): string {
  //loops through prepend urls and check if some of them contain url from linkree
  const linkSearch = Object.entries(nimiLinkDetailsExtended).find(
    (item) => item[1].prepend && url.includes(item[1].prepend.substring(8))
  );

  return linkSearch ? linkSearch[0] : NimiLinkType.URL;
}
