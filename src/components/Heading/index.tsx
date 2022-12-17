import styled from 'styled-components';

import { NimiSignatureColor } from '../../theme';

type HeadingProps = {
  children: string;
  type?: 'main' | 'sub';
  color?: string;
};

export function Heading({ children, type = 'main', color }: HeadingProps) {
  if (type === 'sub') return <SubHeading color={color}>{children}</SubHeading>;
  return <MainHeading color={color}>{children}</MainHeading>;
}

type StyledHeadingProps = {
  color?: string;
};

export const MainHeading = styled.h1<StyledHeadingProps>`
  line-height: 40px;
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 16px;

  ${({ color }) => (color ? `color: ${color};` : `${NimiSignatureColor}`)}
`;

export const SubHeading = styled.h2<StyledHeadingProps>`
  line-height: 24px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;

  ${({ color }) => (color ? `color: ${color};` : `${NimiSignatureColor}`)}
`;
