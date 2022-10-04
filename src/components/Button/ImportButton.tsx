import styled from 'styled-components';
import Twitter from '../../assets/svg/twitter-logo.svg';
import Lens from '../../assets/svg/lens-logo.svg';
import Nft from '../../assets/svg/nft-logo.svg';
import Linktree from '../../assets/svg/linktree.svg';

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #f0f3fb;
  border: 4.80392px solid #ffffff;
  border-radius: 12.6103px;
  gap: 4px;
  padding: 8px 10px;
  letter-spacing: 0.01em;
  font-weight: 500;
  font-size: 14px;
  color: #4589ef;
  cursor: pointer;
  box-shadow: 0px 14.4118px 38.4314px -9.45772px rgba(44, 43, 102, 0.14);
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
  Linktree: Linktree,
};

export function ImporButton({ onClick, type, disabled = false }: ImportButtonProps) {
  return (
    <Button disabled={disabled} onClick={onClick}>
      <img src={Logos[type]} />
      {type}
    </Button>
  );
}
