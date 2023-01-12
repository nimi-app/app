import { NimiImageType } from '@nimi.io/card/types';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { useUploadImageToIPFS } from '../../api/RestAPI/hooks/useUploadImageToIPFS';
import PlaceholderMini from '../../assets/images/nimi-placeholder.png';
import { supportedImageTypes } from '../../constants';
import { useUserInterface } from '../../services/useUserInterface';
import { MEDIA_WIDTHS, NimiModalStyles } from '../../theme';
import {
  ErrorMessage,
  FileInput,
  ImportButton,
  ProfileImage,
  TemplateImportContainer,
  TemplateSection,
  Toplabel,
} from '../CreateNimi/styled';
import { themes } from '../CreateNimi/themes';
import { ImportSection } from '../ImportSection';
import { TemplatePickerButton } from '../TemplatePickerButton';

export function ProfileSettings() {
  const [customImg, setCustomImg] = useState<any>(null);
  const [imgErrorMessage, setImgErrorMessage] = useState('');

  const { openModal, ModalTypes } = useUserInterface();

  const { setValue, getValues, watch } = useFormContext();
  const formWatchPayload = watch();

  const { mutateAsync: uploadImageAsync } = useUploadImageToIPFS();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];

      if (file.size > 2000000) {
        setImgErrorMessage('File too big! Max size: 2mb');
        setTimeout(() => {
          setImgErrorMessage('');
        }, 5000);
        return;
      }
      if (!supportedImageTypes.includes(file.type)) {
        setImgErrorMessage('File type unsupported!');

        setTimeout(() => {
          setImgErrorMessage('');
        }, 5000);

        return;
      }
      const reader = new FileReader();

      reader.onloadend = () => {
        setCustomImg([reader.result]);
      };

      try {
        const { cidV1 } = await uploadImageAsync(file);

        setValue('image', {
          type: NimiImageType.URL,
          url: `https://ipfs.io/ipfs/${cidV1}`,
        });
      } catch (error) {
        setImgErrorMessage('Network Error');
        setTimeout(() => {
          setImgErrorMessage('');
        }, 5000);
      }
    }
  };

  return (
    <Container>
      <ProfilePictureContainer>
        <Toplabel>Profile Picture</Toplabel>
        <ProfileImage
          src={customImg ? customImg : formWatchPayload.image?.url ? formWatchPayload.image.url : PlaceholderMini}
        />
        {imgErrorMessage && <ErrorMessage>{imgErrorMessage}</ErrorMessage>}
        <ImportButton>
          <FileInput name="myfile" type="file" onChange={handleUpload} />
          Change Profile Picture
        </ImportButton>
      </ProfilePictureContainer>
      <TemplateImportContainer>
        <TemplateSection>
          <Toplabel>Template</Toplabel>
          <TemplatePickerButton
            selectedTheme={themes[getValues('theme').type as keyof typeof themes]}
            onClick={() => openModal(ModalTypes.TEMPLATE_PICKER)}
          />
        </TemplateSection>
        <ImportSection />
      </TemplateImportContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin-bottom: 14px;
  gap: 14px;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: column;
  }
`;

const ProfilePictureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  flex-grow: 1;
  ${NimiModalStyles};
`;
