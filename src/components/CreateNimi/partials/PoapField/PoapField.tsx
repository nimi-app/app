import POAPLogo from '../../../../assets/svg/poap-logo.svg';
import { InputButton } from '../../../InputButton';
import { InnerPoapWrapper, PoapButton, PoapWrapper } from './styled';

type POAPFieldProps = {
  onConfigure: (event: MouseEvent) => void;
  onRemove: (event: MouseEvent) => void;
};

export function PoapField({ onConfigure, onRemove }: POAPFieldProps) {
  return (
    <PoapWrapper>
      <InnerPoapWrapper>
        <PoapButton>
          <POAPLogo />
          POAPs
        </PoapButton>
        <InputButton displayInlineFlex={true} variant="sliders" marginRight="4px" onClick={onConfigure} />
        <InputButton displayInlineFlex={true} variant="trash-can" onClick={onRemove} />
      </InnerPoapWrapper>
    </PoapWrapper>
  );
}
