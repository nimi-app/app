import { Nimi, nimiCard, NimiCard } from 'nimi-card';
import { useEffect, useState } from 'react';

export interface NimiPreviewCardProps {
  nimi: Nimi;
}

export function NimiPreviewCard({ nimi }: NimiPreviewCardProps) {
  const [previewNimi, setPreviewNimi] = useState<Nimi>();

  useEffect(() => {
    nimiCard
      .validate(nimi, {
        abortEarly: false,
      })
      .then((validatedNimiCard) => {
        console.log({ validatedNimiCard });
        setPreviewNimi(validatedNimiCard as Nimi);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [nimi]);

  if (!previewNimi) {
    return (
      <div>
        <p>...</p>
      </div>
    );
  }

  return <NimiCard nimi={previewNimi} />;
}
