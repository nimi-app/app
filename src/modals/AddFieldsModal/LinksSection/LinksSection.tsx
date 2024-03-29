import { getNimiLinkLogoSVGElement } from '@nimi.io/card';
import { NimiLinkType } from '@nimi.io/card/types';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { ButtonGroup } from '../../../components/form/Button';
import { renderSVG } from '../../../utils';
import { StyledFlexList } from '../styled';

const SectionWrapper = styled.div`
  margin-bottom: 30px;
  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  color: #4e5d78;
  margin-bottom: 32px;
`;

export interface LinksSectionProps {
  sectionLinks: NimiLinkType[];
  title: string;
  onChange: any;
}

/**
 * Section that handles link selection
 * @returns
 */
export function LinksSection({ sectionLinks, onChange, title }: LinksSectionProps) {
  const { t } = useTranslation('nimi');

  return (
    <SectionWrapper>
      <SectionTitle>{t(`addFieldsModal.${title}`)}</SectionTitle>
      <StyledFlexList>
        {sectionLinks.map((link) => {
          const inputId = `modal-checkbox-${link}`;
          const i18nKey = `formLabel.${link.toLowerCase()}`;
          const logo = getNimiLinkLogoSVGElement(link);

          return (
            <ButtonGroup key={inputId} id={inputId} onClick={() => onChange(link)}>
              {renderSVG(logo)}
              {t(i18nKey)}
            </ButtonGroup>
          );
        })}
      </StyledFlexList>
    </SectionWrapper>
  );
}
