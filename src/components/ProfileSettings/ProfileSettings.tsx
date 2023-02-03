import { NimiImageType } from '@nimi.io/card/types';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { styled } from 'styled-components';

import { useUploadImageToIPFS } from '../../api/RestAPI/hooks/useUploadImageToIPFS';
import PlaceholderMini from '../../assets/images/nimi-placeholder.png';
import { supportedImageTypes } from '../../constants';
import { useUserInterface } from '../../services/useUserInterface';
import { MEDIA_WIDTHS, NimiModalStyles } from '../../theme';
import { ErrorMessage, FileInput, Toplabel } from '../CreateNimi/styled';
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

export const ProfileImage = styled.img`
  background-position: center, center;
  background-size: cover;
  border: 8px solid #ffffff;
  border-radius: 200px;
  height: 186px;
  width: 186px;
  z-index: 1;
  align-self: center;
  margin-bottom: 10px;
`;

export const ImportButton = styled.label`
  display: flex;
  position: relative;
  align-self: center;
  margin: 0 auto;
  margin-bottom: 22px;
  background: #4589ef;
  padding: 10px 24px;
  font-weight: 600;
  font-size: 16px;
  line-height: 17px;
  text-align: center;
  letter-spacing: -0.02em;
  width: fit-content;
  opacity: 0.8;
  border-radius: 30px;
  color: #ffffff;
  cursor: pointer;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;
  :hover {
    transition-duration: 0.1s;
    background-color: #c9d1f1;
  }
  :after {
    content: '';
    display: block;
    position: absolute;
    border-radius: 4em;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s;
    box-shadow: 0 0 10px 40px #a78aff;
  }
  :active:after {
    box-shadow: 0 0 0 0 white;
    position: absolute;
    border-radius: 4em;
    left: 0;
    top: 0;
    opacity: 1;
    transition: 0s;
  }
  :active {
    top: 1px;
  }
`;

const TemplateImportContainer = styled.div``;

const TemplateSection = styled.div`
  ${NimiModalStyles};
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
`;
