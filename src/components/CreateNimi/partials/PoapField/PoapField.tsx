import { Nimi } from '@nimi.io/card';
import { useFormContext } from 'react-hook-form';
import { ReactComponent as PoapLogo } from '../../../../assets/svg/poap-logo.svg';

import { PoapButton, PoapWrapper, InnerPoapWrapper } from './styled';
import { InputButton } from '../../../InputButton';

/**
 * Shows poap section with the delete button
 */
export function PoapField({ onClick }: { onClick: () => void }) {
  const { setValue: setFormValue } = useFormContext<Nimi>();
  const handleDelete = (e) => {
    e.stopPropagation();
    setFormValue('widgets', []);
  };

  return (
    <PoapWrapper onClick={onClick}>
      <InnerPoapWrapper>
        <PoapButton>
          <PoapLogo />
          POAPs
        </PoapButton>
        <InputButton variant="sliders" displayInlineFlex marginRight="4px" onClick={() => console.log(123)} />
        <InputButton variant="trash-can" displayInlineFlex onClick={() => console.log(123)} />
      </InnerPoapWrapper>
    </PoapWrapper>
  );
}
