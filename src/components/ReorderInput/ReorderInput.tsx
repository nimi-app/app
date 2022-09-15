import styled from 'styled-components';
import { ReorderItem } from '../ReorderItem';

export function ReorderInput({ value }) {
  return (
    <ReorderItem value={value}>
      <TitleInput />
    </ReorderItem>
  );
}

const TitleInput = styled.input`
  height: 38px;
  padding: 8px 6px 8px 20px;
  line-height: 22px;
  font-size: 16px;
  font-weight: 400;
  color: #8c90a0;
  background-color: #f1f1f1;
  border-radius: 20px;
  border: none;
  outline: none;

  &:focus {
    background-color: white;
    font-size: 18px;
    font-weight: 500;
    box-shadow: 0px 5px 14px rgba(188, 180, 180, 0.2);
  }
`;
