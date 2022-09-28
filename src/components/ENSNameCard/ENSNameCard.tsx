import { FC } from 'react';
import PurpleCircle from 'assets/svg/purpleCircle.svg';
import { Link, useNavigate } from 'react-router-dom';

import { StyledENSNameCardWrapper, ENSNameCardImage, StyledDomainName } from './styleds';
import { useENSMetadata } from 'hooks/useENSMetadata';
import { Loader } from 'components/Loader';

export interface ENSNameCardProps {
  name: string;
  labelName: string;
}

interface ENSDomainNameProps {
  name: string;
}

const DomainName: FC<ENSDomainNameProps> = ({ name }) => <StyledDomainName>{name}</StyledDomainName>;

export function ENSNameCard({ name }: ENSNameCardProps) {
  const navigate = useNavigate();
  const { data, loading } = useENSMetadata(name);

  const handleSubmit = () => navigate(`/domains/${name}`);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Link to={`/domains/${name}`} state={data}>
          <StyledENSNameCardWrapper onClick={handleSubmit}>
            <ENSNameCardImage alt={data ? data.image : PurpleCircle} src={data ? data.image : PurpleCircle} />
            <DomainName name={name} />
          </StyledENSNameCardWrapper>
        </Link>
      )}
    </>
  );
}
