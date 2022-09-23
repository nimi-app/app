import { FC } from 'react';
import PurpleCircle from '../../../assets/svg/purpleCircle.svg';
import { Link } from 'react-router-dom';

import { StyledENSNameCardWrapper, ENSNameCardImage, StyledDomainName } from '../styleds';
import { useENSMetadata } from '../../../hooks/useENSMetadata';
import { Loader } from '../../Loader';
import { NimiImageType } from '@nimi.io/card';

export interface ENSNameCardProps {
  name: string;
  labelName: string;
  id: string;
}

interface ENSDomainNameProps {
  name: string;
}

const DomainName: FC<ENSDomainNameProps> = ({ name }) => <StyledDomainName>{name}</StyledDomainName>;

export function BasicENSCard({ name, id }: ENSNameCardProps) {
  const { data, loading } = useENSMetadata(name);

  console.log('basic key', id);
  const imageFormatted = {
    type: NimiImageType.URL,
    url: data?.image || '',
  };
  console.log('Basic passed', { image: imageFormatted, id });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Link to={`/domains/${name}`} state={{ image: imageFormatted, id }}>
          <StyledENSNameCardWrapper>
            <ENSNameCardImage alt={data ? data.image : PurpleCircle} src={data ? data.image : PurpleCircle} />
            <DomainName name={name} />
          </StyledENSNameCardWrapper>
        </Link>
      )}
    </>
  );
}
