import { useRef } from 'react';
import { styled } from 'styled-components';

import { useDeployedPageData } from '../../api/RestAPI/hooks/useDeployedPageData';
import { useEnsMetadataImage } from '../../api/RestAPI/hooks/useEnsMetadataImage';
import purpleCircleImage from '../../assets/svg/purpleCircle.svg?url';
import { ENSDomain } from '../../models';
import { NimiSignatureColor } from '../../theme';
import { StyledLink } from '../Button/styled';

type DomainItemProps = {
  domain: ENSDomain;
};

export function DomainItem({ domain }: DomainItemProps) {
  const ref = useRef(null);

  const { data: metadata } = useEnsMetadataImage(domain?.name);
  const { data: domainData } = useDeployedPageData(domain?.name);

  return (
    <StyledLink ref={ref} to={`/domains/${domain.name}`}>
      <Container>
        <DomainProfilePhoto
          alt={`${domain.name} Image`}
          src={domainData?.nimi?.image ? domainData.nimi.image.url : metadata ? metadata : purpleCircleImage.src}
          onError={(event) => {
            const target = event.target as HTMLImageElement;

            if (target.src !== purpleCircleImage.src) target.src = purpleCircleImage.src;
          }}
        />
        <DomainName>{domain.name}</DomainName>
      </Container>
    </StyledLink>
  );
}

export const Container = styled.div`
  width: 308px;
  height: 146px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: row;
  border-radius: 25px;
  background: #fff;
  box-shadow: 0px 5px 24px rgba(138, 143, 234, 0.12);
  padding: 42px 22px;
  cursor: pointer;
  overflow: hidden;
`;

export const DomainProfilePhoto = styled.img`
  background-position: center center;
  background-size: cover;
  border-radius: 200px;
  height: 83px;
  width: 83px;
  z-index: 1;
  box-shadow: 0px 5px 24px rgba(138, 143, 234, 0.12);
  backdrop-filter: blur(20px);
`;

export const DomainName = styled.div`
  ${NimiSignatureColor};
  font-size: 24px;
  overflow: hidden;
  line-height: 26px;
  white-space: wrap;
  margin-left: 16px;
  text-align: start;
  text-overflow: ellipsis;
  line-height: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;
