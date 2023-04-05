import { isAddress as isEVMAddress } from '@ethersproject/address';
import { isValidName } from '@ethersproject/hash';

import { NIMI_LINK_DETAIL_EXTENDED } from '@nimi.io/card/constants';
import { Nimi, NimiLinkType, NimiWidget, NimiWidgetType } from '@nimi.io/card/types';
import { FC, SVGProps } from 'react';

export * from './explorer';

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
export function generateID(): string {
  return 'id' + new Date().getTime();
}

/**
 * Returns Nimi link type based on url provided
 * @param url string url that should be evaluated
 * @returns NimiLinkType
 */
export function guessLinkTypeBasedOnUrl(url: string): NimiLinkType {
  //loops through prepend urls and check if some of them contain url from linkree
  const linkSearch = Object.entries(NIMI_LINK_DETAIL_EXTENDED).find(
    (item) => item[1].prepend && url.includes(item[1].prepend.substring(8))
  );

  return linkSearch ? (linkSearch[0] as NimiLinkType) : NimiLinkType.URL;
}

/**
 * Returns Nimi object with poaps widget inserted if avaliable
 * @param nimi Nimi object
 * @param hasPoaps boolean for checking if user has poaps related to his address
 * @param address users address
 * @returns modified nimi object
 */
export function insertPoapWidgetIntoNimi(nimi: Nimi, hasPoaps: boolean, address?: string) {
  const nimiObject = nimi;

  const hasPoapWidget = nimi.widgets.some(({ type }) => type === NimiWidgetType.POAP);

  if (!hasPoapWidget && hasPoaps && address) {
    const widget = { type: NimiWidgetType.POAP } as NimiWidget;
    nimiObject.widgets.push(widget);
  }

  return nimiObject;
}

/**
 * Check if string is ethereum address or ens name
 * @param address string to check
 * @returns boolean
 */
export function isAddressOrEns(address: string): boolean {
  address = address.trim().toLocaleLowerCase();

  const isENS = isValidName(address) && (address.endsWith('.eth') || address.endsWith('lens.xyz'));
  const isAddress = isEVMAddress(address);

  return isENS || isAddress;
}
