import { FC } from 'react';
import PurpleCircle from '../../../assets/svg/purpleCircle.svg';
import { Link } from 'react-router-dom';

import { StyledENSNameCardWrapper, ENSNameCardImage, StyledDomainName } from '../styleds';
import { useENSMetadata } from '../../../hooks/useENSMetadata';
import { Loader } from '../../Loader';

export interface ENSNameCardProps {
  name: string;
  labelName: string;
}

interface ENSDomainNameProps {
  name: string;
}

const DomainName: FC<ENSDomainNameProps> = ({ name }) => <StyledDomainName>{name}</StyledDomainName>;

export function BasicENSCard({ name }: ENSNameCardProps) {
  const { data, loading } = useENSMetadata(name);
  console.log('data', data);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Link to={`/domains/${name}`} state={data}>
          <StyledENSNameCardWrapper>
            <ENSNameCardImage alt={data ? data.image : PurpleCircle} src={data ? data.image : PurpleCircle} />
            <DomainName name={name} />
          </StyledENSNameCardWrapper>
        </Link>
      )}
    </>
  );
}
