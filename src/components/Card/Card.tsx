import styled from 'styled-components';

export interface CardProps {
  variant?: 'default' | 'blurred';
}

export const Card = styled.div<CardProps>(
  ({ variant = 'default' }) => `
  display:flex;
  flex-direction: column;
  background: ${variant === 'blurred' ? 'rgba(255, 255, 255, 0.6)' : '#fff'};
  box-shadow: 0px 5px 24px rgba(138, 143, 234, 0.12);
  backdrop-filter: blur(20px);
  border-radius: 25px;
`
);

export const CardBody = styled.div`
  padding: 42px;
  display: flex;
  flex-direction: column;
`;
