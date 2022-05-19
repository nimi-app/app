import styled from 'styled-components';

import checkmark from '../../../../assets/svg/checkmark.svg';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;
export const StyledLabel = styled.label`
  margin-left: 14px;
  color: #8a94a6;
  font-weight: 500;
  font-size: 18px;
  line-height: 29px;
`;
export const StyledCheckbox = styled.input`
  border-radius: 8px;
  width: 28px;
  height: 28px;
  background-image: url(${checkmark});
  background-color: linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%);
`;
