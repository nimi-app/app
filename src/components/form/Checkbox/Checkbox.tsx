import { FC, InputHTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  position: relative;
  margin-bottom: 7px;
  display: flex;
  width: 100%;
  align-items: center;
  cursor: pointer;

  & > svg {
    margin-right: 14px;
    #background {
      fill: #e7e3ec;
    }
    #checkmark {
      display: none;
    }
  }
`;

const StyledInput = styled.input`
  display: none;
  &:checked + ${StyledLabel} {
    color: #000;
    svg {
      #background {
        fill: url(#paint0_linear_654_1308);
      }
      #checkmark {
        display: block;
      }
    }
  }
`;

export const Checkbox: FC<PropsWithChildren<Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>>> = ({
  name,
  id,
  children,
  ...restProps
}) => {
  return (
    <div>
      <StyledInput {...restProps} type="checkbox" name={name} id={id} />
      <StyledLabel htmlFor={id}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect id="background" width="28" height="28" rx="8" />
          <path
            id="checkmark"
            d="M19.0612 8.36785C19.4833 7.90035 20.192 7.87508 20.6442 8.31141C21.0964 8.74775 21.1208 9.48045 20.6988 9.94795L12.8588 18.6321C12.4493 19.0857 11.7668 19.125 11.3111 18.7212L7.39113 15.2476C6.92149 14.8314 6.8671 14.1004 7.26965 13.6149C7.6722 13.1293 8.37926 13.0731 8.8489 13.4893L11.9538 16.2406L19.0612 8.36785Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_654_1308"
              x1="3.38853"
              y1="-34.4167"
              x2="36.9102"
              y2="-21.3119"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4368EA" />
              <stop offset="1" stopColor="#C490DD" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </StyledLabel>
    </div>
  );
};
