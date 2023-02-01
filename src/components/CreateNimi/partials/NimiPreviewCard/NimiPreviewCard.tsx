import { Nimi } from '@nimi.io/card/types';
import { validateNimi } from '@nimi.io/card/validators';
import dynamic from 'next/dynamic';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import styled, { StyleSheetManager } from 'styled-components';

import { FixedGlobalStyle, ThemeProvider } from '../../../../theme';
import { Card as CardBase } from '../../../Card';

// document.body is undefined in SSR
const NimiCardApp = dynamic(
  async () => {
    const NimiCardModule = await import('@nimi.io/card');

    return NimiCardModule.NimiCard;
  },
  { ssr: false }
);

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
  const filterNimi = () => {
    try {
      const validatedNimi = validateNimi(nimi);

      return validatedNimi;
    } catch {
      return false;
    }
  };

  const filteredNimi = filterNimi();

  if (!nimi || !filteredNimi) {
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
                  <NimiCardApp nimi={filteredNimi} isApp={false} />
                </ThemeProvider>
              </>
            </StyleSheetManager>
          )}
        </FrameContextConsumer>
      </PreviewFrame>
    </Card>
  );
}
