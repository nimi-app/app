import styled, { css } from 'styled-components';
import { ReorderItem } from '../ReorderItem';
import { NimiLinkBaseDetails } from '@nimi.io/card';

import { ReactComponent as XSVG } from '../../assets/svg/cross.svg';

type ReorderInput = {
  value: NimiLinkBaseDetails;
  updateLink: (linkId: string, key: string, value: string) => void;
};

export function ReorderInput({ value, updateLink }) {
  const { type, title, content } = value;

  return (
    <ReorderItem value={value}>
      <InputContainer>
        <TitleInput
          value={title}
          onChange={(event) => updateLink(value.id, 'title', event.target.value)}
          spellCheck={false}
        />
        {title && <ClearButton onClick={() => updateLink(value.id, 'title', '')} />}
      </InputContainer>
      <InputContainer>
        <ContentInput
          value={content}
          onChange={(event) => updateLink(value.id, 'content', event.target.value)}
          spellCheck={false}
        />
      </InputContainer>
    </ReorderItem>
  );
}

const SharedInputStyles = css`
  width: 100%;
  line-height: 22px;
  font-size: 16px;
  font-weight: 400;
  color: #8c90a0;
  border-radius: 20px;
  border: none;
  outline: none;

  &:focus {
    background-color: white;
    font-size: 18px;
    font-weight: 500;
    border: double 2px transparent;
    background-image: linear-gradient(white, white), linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    box-shadow: 0px 5px 14px rgba(188, 180, 180, 0.2);

    & + svg {
      display: block;
    }
  }
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

const TitleInput = styled.input`
  height: 38px;
  position: relative;
  padding: 8px 6px 8px 20px;
  ${SharedInputStyles}
  background-color: #f1f1f1;
`;

const ContentInput = styled.input`
  height: 50px;
  padding: 8px 6px 8px 20px;
  ${SharedInputStyles}
  background-color: white;
  margin-top: 10px;
`;

const ClearButton = styled(XSVG)`
  display: none;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  cursor: pointer;

  &:hover path {
    fill: #8c90a0;
  }
`;
