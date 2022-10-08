import styled from 'styled-components';
import Twitter from '../../assets/svg/twitter-logo.svg';
import Lens from '../../assets/svg/lens-logo.svg';
import Nft from '../../assets/svg/nft-logo.svg';

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 50px;
  height: 50px;
  align-items: center;
  background: #f0f3fb;
  border: 4px solid #ffffff;
  border-radius: 20px;
  padding: 6px;
  cursor: pointer;
  box-shadow: 0px 14.4118px 38.4314px -9.45772px rgba(44, 43, 102, 0.14);
  &:not(:first-child) {
    margin-left: -13px;
  }
`;
const StyledImg = styled.img`
  width: 20px;
  height: 20px;
`;

interface ImportButtonProps {
  onClick: any;
  type: string;
  disabled?: boolean;
}

const Logos = {
  Twitter: Twitter,
  Lens: Lens,
  Nft: Nft,
};

export function ImporButton({ onClick, type, disabled = false }: ImportButtonProps) {
  return (
    <Button disabled={disabled} onClick={onClick}>
      <StyledImg src={Logos[type]} />
    </Button>
  );
}
