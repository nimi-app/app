import styled from 'styled-components';

import { NFTAsset } from '../../NFTSelector.types';

export interface AssetCardProps {
  asset: NFTAsset;
  isSelected?: boolean;
  onClick: () => void;
}

const StyledAssetCard = styled.div<{ isSelected?: boolean }>`
  border: 1px solid #ddd;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
  height: 100%; /** Make sure the card is always the same height */
  ${({ isSelected }) => isSelected && 'border: 1px solid #000;'}
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const StyledCardImage = styled.img`
  max-width: 100%;
`;

export function AssetCard({ onClick, asset, isSelected }: AssetCardProps) {
  return (
    <StyledAssetCard onClick={onClick} isSelected={isSelected}>
      <StyledCardImage src={asset.image_preview_url} alt={asset.name} />
      <StyledInnerWrapper>
        <h3>{asset.name}</h3>
      </StyledInnerWrapper>
    </StyledAssetCard>
  );
}
