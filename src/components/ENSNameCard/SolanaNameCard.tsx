import { BonfidaUserData } from '../../hooks/Bonfida/useBonfidaDomainsForUser';
import { useProfilePic } from '../../hooks/Bonfida/useProfilePic';

import { GenericCard } from './GenericCard';

export interface SolanaNameCardProps {
  name: string;
  routeData: BonfidaUserData;
}

export function SolanaNameCard({ name, routeData }: SolanaNameCardProps) {
  const { result, loading } = useProfilePic(name);
  console.log('result', result);

  return <GenericCard loading={loading} name={name} routeData={{ ...routeData, image: result }} />;
}
