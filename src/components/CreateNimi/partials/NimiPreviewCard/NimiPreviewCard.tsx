import Frame, { FrameContextConsumer } from 'react-frame-component';
import { filterEmptyFields, Nimi, NimiCard, validateNimi, nimiLinkValidator } from '@nimi.io/card';
import { useEffect, useState } from 'react';
import styled, { StyleSheetManager } from 'styled-components';
import { FixedGlobalStyle, ThemeProvider } from '../../../../theme';
import { Card as CardBase } from '../../../Card';

export interface NimiPreviewCardProps {
  nimi: Nimi;
}

const Card = styled(CardBase)`
  overflow: hidden;
  height: 100%;
`;

const PreviewFrame = styled(Frame)`
  width: 100%;
  height: 100%;
  border: 0;
`;

export function NimiPreviewCard({ nimi }: NimiPreviewCardProps) {
  const [previewNimi, setPreviewNimi] = useState<Nimi>();

  const removeInvalidLinks = async (links) => {
    const result = await Promise.all(
      links.map((link) =>
        nimiLinkValidator
          .isValid({
            type: link.type,
            content: link.content,
          })
          .then((isLinkValid) => {
            return isLinkValid;
          })
          .catch((error) => {
            console.log('error', error);
            return false;
          })
      )
    );

    return links.filter((_, index) => result[index]);
  };

  useEffect(() => {
    // Filter invalid links
    const filterFunction = async () => {
      const filteredNimi = filterEmptyFields(nimi);

      const filteredLinks = await removeInvalidLinks(filteredNimi.links);

      validateNimi({ ...filteredNimi, links: filteredLinks })
        .then((validatedNimi) => {
          if (process.env.NODE_ENV !== 'production') {
          }
          setPreviewNimi(validatedNimi as Nimi);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    filterFunction();
  }, [nimi]);

  if (!previewNimi) {
    return (
      <div>
        <p>...</p>
      </div>
    );
  }

  return (
    <Card>
      <PreviewFrame>
        <FrameContextConsumer>
          {(frameContext) => (
            <StyleSheetManager target={frameContext?.document?.head}>
              <>
                <style>
                  {`@import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&display=swap")`}
                </style>
                <FixedGlobalStyle />
                <ThemeProvider>
                  <NimiCard nimi={previewNimi} isApp={false} />
                </ThemeProvider>
              </>
            </StyleSheetManager>
          )}
        </FrameContextConsumer>
      </PreviewFrame>
    </Card>
  );
}
