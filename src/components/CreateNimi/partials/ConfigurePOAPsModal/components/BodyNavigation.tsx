import styled from 'styled-components';

import { NimiSignatureColor } from '../../../../../theme';

type BodyNavigationProps = {
  page: 'recent' | 'custom';
  openRecentPage: () => void;
  openCustomPage: () => void;
  noPOAPs: boolean;
};

export const BodyNavigation = ({ page, openRecentPage, openCustomPage, noPOAPs }: BodyNavigationProps) => (
  <BodyControls>
    <BodyTitle disabled={noPOAPs}>POAPs</BodyTitle>
    <Navigation>
      <NavigationLink selected={page === 'recent'} onClick={openRecentPage} disabled={noPOAPs}>
        Most Recent
      </NavigationLink>
      <NavigationLink selected={page === 'custom'} onClick={openCustomPage} disabled={noPOAPs}>
        Custom Order
      </NavigationLink>
    </Navigation>
  </BodyControls>
);

const BodyControls = styled.div`
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const BodyTitle = styled.h2<{ disabled: boolean }>`
  line-height: 26px;
  font-size: 26px;
  color: black;
  ${({ disabled }) => disabled && 'opacity: 0.5;'}
`;

const Navigation = styled.nav``;

type NavigationLinkProps = {
  selected: boolean;
  disabled: boolean;
};

const NavigationLink = styled.a<NavigationLinkProps>`
  display: inline-block;
  vertical-align: top;
  line-height: 15px;
  font-size: 14px;
  ${NimiSignatureColor}
  cursor: pointer;
  margin-left: 18px;

  ${({ selected }) =>
    selected &&
    `
      border-bottom: 2px solid;
      border-image-source: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
      border-image-slice: 1;
      padding-bottom: 4px;
  `}
  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.5;
      pointer-events: none;
  `}
`;
