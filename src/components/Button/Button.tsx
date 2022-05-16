import { ButtonHTMLAttributes } from 'react';
import { StyledBase, StyledInnerWrapper, StyledLink } from './styled';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  href?: string;
}

export function Button({ children, to, href, ...props }: ButtonProps) {
  /**  */
  if (href) {
    return (
      <StyledBase as="a" href={href}>
        <StyledInnerWrapper>{children}</StyledInnerWrapper>
      </StyledBase>
    );
  }

  /** Internal React Router links */
  if (to) {
    return (
      <StyledLink to={to}>
        <StyledBase>
          <StyledInnerWrapper>{children}</StyledInnerWrapper>
        </StyledBase>
      </StyledLink>
    );
  }

  /** Default button */
  return (
    <StyledBase as="button" {...props}>
      <StyledInnerWrapper>{children}</StyledInnerWrapper>
    </StyledBase>
  );
}
