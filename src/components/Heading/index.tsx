import styled, { css } from 'styled-components';

import { NimiSignatureColor } from '../../theme';

type HeadingProps = {
  children: string;
  type?: 'main' | 'sub';
  color?: string;
  marginBottom?: string;
};

export function Heading({ children, type = 'main', color, marginBottom }: HeadingProps) {
  if (type === 'sub')
    return (
      <SubHeading color={color} marginBottom={marginBottom}>
        {children}
      </SubHeading>
    );
  return (
    <MainHeading color={color} marginBottom={marginBottom}>
      {children}
    </MainHeading>
  );
}

type StyledHeadingProps = {
  color?: string;
  marginBottom?: string;
};

const SharedProps = css<StyledHeadingProps>`
  ${({ color }) => (color ? `color: ${color};` : `${NimiSignatureColor}`)}
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}
`;

export const MainHeading = styled.h1`
  line-height: 40px;
  font-size: 36px;
  font-weight: 800;
  ${SharedProps}
`;

export const SubHeading = styled.h2`
  line-height: 24px;
  font-size: 20px;
  font-weight: 600;
  ${SharedProps}
`;
