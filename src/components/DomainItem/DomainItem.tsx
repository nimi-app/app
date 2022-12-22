import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PurpleCircle from '../../assets/svg/purpleCircle.svg';
// import { useENSMetadata } from '../../hooks/useENSMetadata';
import { useNimiData } from '../../hooks/useNimiData';
import { ENSDomain } from '../../models';
import { NimiSignatureColor } from '../../theme';

type DomainItemProps = {
  domain: ENSDomain;
};

export function DomainItem({ domain }: DomainItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  // TODO: MIRKO CHECK IF useENSMetadata HOOK IS NECESSARY OVER HERE AND AT ALL
  // const { data: metadata, loading: metadataLoading } = useENSMetadata(domain.name!);
  const { data: domainData } = useNimiData(domain?.name, isInView);

  return (
    <Link ref={ref} to={`/domains/${domain.name}`} state={domainData}>
      <Container>
        <DomainProfilePhoto
          alt={`${domain.name} Image`}
          src={domainData?.nimi?.image ? domainData.nimi.image.url : PurpleCircle}
          onError={(event) => {
            const target = event.target as HTMLImageElement;

            if (target.src !== PurpleCircle) target.src = PurpleCircle;
          }}
        />
        <DomainName>{domain.name}</DomainName>
      </Container>
    </Link>
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
