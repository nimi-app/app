import { Nimi, NimiPage, NimiPageProvider } from '@nimi.io/card';
import { validateNimi } from '@nimi.io/card/validators';
import createDebug from 'debug';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { styled, StyleSheetManager } from 'styled-components';

import { FixedGlobalStyle, ThemeProvider } from '../../../../theme';
import { Card as CardBase } from '../../../Card';

const debug = createDebug('components:NimiPreviewCard');

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
    } catch (error) {
      debug('Nimi is not valid', error.message, nimi);
      return false;
    }
  };

  const filteredNimi = filterNimi();
  debug('filteredNimi', filteredNimi);
  if (!nimi || !filteredNimi) {
    return <div></div>;
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
                  <NimiPageProvider poapAPIKey={process.env.NEXT_PUBLIC_POAP_API_KEY || ''}>
                    <NimiPage nimi={filteredNimi} isApp={false} />
                  </NimiPageProvider>
                </ThemeProvider>
              </>
            </StyleSheetManager>
          )}
        </FrameContextConsumer>
      </PreviewFrame>
    </Card>
  );
}
