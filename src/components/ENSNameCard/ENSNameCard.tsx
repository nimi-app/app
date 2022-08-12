import { useENSMetadata } from '../../hooks/useENSMetadata';

import { GenericCard } from './GenericCard';

export interface ENSNameCardProps {
  name: string;
  labelName: string;
}

export function ENSNameCard({ name }: ENSNameCardProps) {
  const { data, loading } = useENSMetadata(name);

  return <GenericCard loading={loading} name={name} routeData={data} />;
}
