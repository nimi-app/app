import React, { HTMLProps, useCallback } from 'react';
import { styled } from 'styled-components';

import { Colors } from './styled';

const StyledLink = styled.a<{ color?: keyof Colors; underlined?: boolean }>`
  text-decoration: ${(props) => (props.underlined ? 'underline' : 'none')};
  cursor: pointer;
  color: ${({ theme, color }) => (color ? theme[color] : theme.text4)};
  font-weight: 500;

  :hover {
    text-decoration: ${(props) => (props.underlined ? 'underline' : 'none')};
  }

  :focus {
    outline: none;
    text-decoration: ${(props) => (props.underlined ? 'underline' : 'none')};
  }

  :active {
    text-decoration: none;
  }
`;

/**
 * Outbound link that handles firing google analytics events
 */
export function ExternalLink({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  color,
  underlined,
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & {
  href: string;
  color?: keyof Colors;
  underlined?: boolean;
}) {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // don't prevent default, don't redirect if it's a new tab
      if (target !== '_blank' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
      }
    },
    [target]
  );
  return (
    <StyledLink
      underlined={underlined}
      target={target}
      rel={rel}
      href={href}
      onClick={handleClick}
      color={color}
      {...rest}
    />
  );
}
