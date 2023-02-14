import { useParams } from 'react-router-dom';

import { CreateNimiContainer } from './CreateNimiContainer';

export function CreateNimiPage() {
  const { ensName } = useParams();

  return <CreateNimiContainer ensName={ensName as string} />;
}
