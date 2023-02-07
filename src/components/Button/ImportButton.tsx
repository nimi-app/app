import { motion } from 'framer-motion';
import { styled } from 'styled-components';

import LensLogoImage from '../../assets/svg/lens-logo.svg';
import LinktreeLogoImage from '../../assets/svg/linktree.svg';
import NFTImage from '../../assets/svg/nft-logo.svg';
import TwitterLogoImage from '../../assets/svg/twitter-logo.svg';

interface ImportButtonProps {
  onClick: any;
  type: ImportButtonType;
  disabled?: boolean;
}

export enum ImportButtonType {
  Twitter = 'Twitter',
  Lens = 'Lens',
  Nft = 'Nft',
  Linktree = 'Linktree',
}

const Logos: {
  [key in ImportButtonType]: string;
} = {
  [ImportButtonType.Twitter]: TwitterLogoImage,
  [ImportButtonType.Lens]: LensLogoImage,
  [ImportButtonType.Nft]: NFTImage,
  [ImportButtonType.Linktree]: LinktreeLogoImage,
};

export function ImportButton({ onClick, type, disabled = false }: ImportButtonProps) {
  return (
    <Button
      initial={false}
      whileHover={{ scale: 1.1, transition: { duration: 0.05 } }}
      whileTap={{ scale: 0.9 }}
      disabled={disabled}
      onClick={onClick}
    >
      <StyledImg src={Logos[type]} />
    </Button>
  );
}

const Button = styled(motion.button)`
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
