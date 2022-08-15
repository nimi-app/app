import Frame, { FrameContextConsumer } from 'react-frame-component';
import { Nimi, nimiValidator, NimiCard } from 'nimi-card';
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

  useEffect(() => {
    // Filter invalid links

    nimiValidator
      .validate(nimi, {
        abortEarly: false,
      })
      .then((validatedNimi) => {
        if (process.env.NODE_ENV !== 'production') {
          console.log({
            validatedNimi,
          });
        }
        setPreviewNimi(validatedNimi as Nimi);
      })
      .catch((error) => {
        console.error(error);
      });
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
                  <NimiCard nimi={previewNimi} />
                </ThemeProvider>
              </>
            </StyleSheetManager>
          )}
        </FrameContextConsumer>
      </PreviewFrame>
    </Card>
  );
}
