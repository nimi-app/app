import { Nimi } from '@nimi.io/card';
import Link from 'next/link';
import { FC } from 'react';

import PurpleCircle from '../../../assets/svg/purpleCircle.svg';
import { ENSNameCardImage, StyledDomainName, StyledENSNameCardWrapper } from '../styleds';

export interface ENSNameCardProps {
  data: Nimi;
  id: string;
}

interface ENSDomainNameProps {
  name: string;
}

const DomainName: FC<ENSDomainNameProps> = ({ name }) => <StyledDomainName>{name}</StyledDomainName>;

export function PopulatedENSCard({ data, id }: ENSNameCardProps) {
  data['id'] = id;

  return (
    <Link href={`/domains/${data.ensName}`} state={data}>
      <StyledENSNameCardWrapper>
        <ENSNameCardImage alt={data.ensAddress} src={data.image ? data.image.url : PurpleCircle} />
        <DomainName name={data.ensName} />
      </StyledENSNameCardWrapper>
    </Link>
  );
}
