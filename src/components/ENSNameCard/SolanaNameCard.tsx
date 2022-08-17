import { useProfilePic } from '../../hooks/Bonfida/useProfilePic';

import { GenericCard } from './GenericCard';

export interface SolanaNameCardProps {
  name: string;
}

export function SolanaNameCard({ name }: SolanaNameCardProps) {
  const { result, loading } = useProfilePic(name);

  return <GenericCard loading={loading} name={name} routeData={{ image: result }} />;
}
