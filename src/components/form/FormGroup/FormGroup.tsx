import styled from 'styled-components';

const gap = 28;
export const FormWrapper = styled.form`
  display: flex;
  gap: ${gap}px;
  flex-wrap: wrap;
`;
export const FormGroup = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
`;
export const LinkFormGroup = styled.div`
  width: 100%;
  display: flex;
  background: #f1f1f1;
  flex-direction: row;
  padding: 15px;
  border-radius: 12px;
  align-items: center;
  gap: 12px;
`;
