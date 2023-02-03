import { NimiImageType } from '@nimi.io/card/types';
import { useFormContext } from 'react-hook-form';
import { styled } from 'styled-components';

import { useLensDefaultProfileData } from '../../hooks/useLensDefaultProfileData';
import { useUserInterface } from '../../services/useUserInterface';
import { NimiModalStyles } from '../../theme';
import { ImportButton, ImportButtonType } from '../Button/ImportButton';
import { Toplabel } from '../CreateNimi/styled';

export function ImportSection() {
  const { openModal, ModalTypes } = useUserInterface();

  const { setValue } = useFormContext();

  const { loading: loadingLensProfile, defaultProfileData: lensProfile } = useLensDefaultProfileData();

  const handleImportLensProfile = () => {
    if (!lensProfile) return;

    setValue('displayName', lensProfile.name);
    setValue('description', lensProfile.description);
    setValue('image', {
      type: NimiImageType.URL,
      url: lensProfile?.pictureUrl,
    });
  };

  return (
    <Container>
      <Toplabel>Import from</Toplabel>
      <Content>
        <ImportButton type={ImportButtonType.Twitter} onClick={() => openModal(ModalTypes.IMPORT_FROM_TWITTER)} />
        {!loadingLensProfile && !!lensProfile && (
          <ImportButton type={ImportButtonType.Lens} onClick={handleImportLensProfile} />
        )}
        <ImportButton type={ImportButtonType.Linktree} onClick={() => openModal(ModalTypes.IMPORT_FROM_LINKTREE)} />
        <ImportButton type={ImportButtonType.Nft} onClick={() => openModal(ModalTypes.NFT_SELECTOR)} />
      </Content>
    </Container>
  );
}

export const Container = styled.div`
  ${NimiModalStyles};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
`;
