import { Nimi } from 'nimi-card';
import { useFormContext } from 'react-hook-form';
import { ReactComponent as PoapLogo } from '../../../../assets/svg/poap-logo.svg';
import { ReactComponent as TrashCan } from '../../../../assets/svg/trashcan.svg';
import { TrashCanStyle } from '../../../Input';

import { PoapButton, PoapWrapper, InnerPoapWrapper } from './styled';

/**
 * Handles the input for blockchain address
 */
export function PoapField() {
  const { setValue: setFormValue } = useFormContext<Nimi>();
  const handleDelete = () => {
    console.log('here');
    setFormValue('widgets', []);
  };
  return (
    <PoapWrapper>
      <InnerPoapWrapper>
        <PoapButton>
          <PoapLogo />
          POAPs
        </PoapButton>
        <TrashCanStyle onClick={handleDelete}>
          <TrashCan />
        </TrashCanStyle>
      </InnerPoapWrapper>
    </PoapWrapper>
  );
}
