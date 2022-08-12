import { FC } from 'react';
import PurpleCircle from '../../assets/svg/purpleCircle.svg';
import { Link, useNavigate } from 'react-router-dom';

import { StyledENSNameCardWrapper, ENSNameCardImage, StyledDomainName } from './styleds';
import { Loader } from '../Loader';

export interface GenericCardProps {
  loading: boolean;
  name: string;
  routeData: any;
}

interface ENSDomainNameProps {
  name: string;
}

const DomainName: FC<ENSDomainNameProps> = ({ name }) => <StyledDomainName>{name}</StyledDomainName>;

export function GenericCard({ loading, name, routeData }: GenericCardProps) {
  const navigate = useNavigate();

  const handleSubmit = () => navigate(`/domains/${name}`);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Link to={`/domains/${name}`} state={routeData}>
          <StyledENSNameCardWrapper onClick={handleSubmit}>
            <ENSNameCardImage
              alt={routeData?.image ? routeData.image : PurpleCircle}
              src={routeData?.image ? routeData.image : PurpleCircle}
            />
            <DomainName name={name} />
          </StyledENSNameCardWrapper>
        </Link>
      )}
    </>
  );
}
