import { ChangeEvent } from 'react';
import { styled } from 'styled-components';

import SearchIcon from '../../assets/svg/search-icon.svg';
import { Heading } from '../Heading';
import { ContentInput, InputFieldWithIcon } from '../Input';

type ControlBarProps = {
  value: string;
  searchTextChangedHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function ControlBar({ value, searchTextChangedHandler }: ControlBarProps) {
  return (
    <TopSection>
      <Heading>Your Identities</Heading>
      <StyledInput
        id="domain-search"
        isSimple={true}
        inputLogo={SearchIcon}
        content={value}
        style={{ maxWidth: '200px', background: 'none' }}
      >
        <ContentInput
          id="domain-search-input"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          isInvalidInput={false}
          onChange={searchTextChangedHandler}
          placeholder="Search"
        />
      </StyledInput>
    </TopSection>
  );
}

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StyledInput = styled(InputFieldWithIcon)`
  max-width: 200px !important;
  display: flex !important;
  align-items: flex-start;
`;
