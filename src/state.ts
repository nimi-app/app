import { atom } from 'jotai';

export enum ModalTypes {
  IMPORT_FROM_TWITTER = 'IMPORT_FROM_TWITTER',
  NFT_SELECTOR = 'NFT_SELECTOR',
  ADD_FIELDS = 'ADD_FIELDS',
  CONFIGURE_POAPS = 'CONFIGURE_POAPS',
  TEMPLATE_PICKER = 'TEMPLATE_PICKER',
  PUBLISH_NIMI = 'PUBLISH_NIMI',
}

export const modalOpenedAtom = atom<keyof typeof ModalTypes | null>(null);
