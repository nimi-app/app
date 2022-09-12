import { FC } from 'react';
import PurpleCircle from '../../../assets/svg/purpleCircle.svg';
// import { Link, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { StyledENSNameCardWrapper, ENSNameCardImage, StyledDomainName } from '../styleds';
import { Nimi } from 'nimi-card';

export interface ENSNameCardProps {
  data: Nimi;
}

interface ENSDomainNameProps {
  name: string;
}

const DomainName: FC<ENSDomainNameProps> = ({ name }) => <StyledDomainName>{name}</StyledDomainName>;

export function PopulatedENSCard({ data }: ENSNameCardProps) {
  return (
    <Link to={`/domains/${data.ensName}`} state={data}>
      <StyledENSNameCardWrapper>
        <ENSNameCardImage alt={data.ensAddress} src={data.image ? data.image.url : PurpleCircle} />
        <DomainName name={data.ensName} />
      </StyledENSNameCardWrapper>
    </Link>
  );
}
