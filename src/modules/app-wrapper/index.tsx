import { ReactNode } from 'react';
import { StyledAppWrapper, StyledBodyWrapper, StyledHeaderWrapper } from './styled';

export interface AppWrapperProps {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}

export function AppWrapper({ header, footer, children }: AppWrapperProps) {
  return (
    <StyledAppWrapper id="app-wrapper">
      <StyledHeaderWrapper>{header}</StyledHeaderWrapper>
      <StyledBodyWrapper>{children}</StyledBodyWrapper>
      {footer}
    </StyledAppWrapper>
  );
}
