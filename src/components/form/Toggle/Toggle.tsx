import { styled } from 'styled-components';

interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const sliderSize = '16px';
const slideWidth = '40px';
const slideHeight = '20px';

export function Toggle({ id, checked, label, onChange }: ToggleProps) {
  return (
    <OutterWrapper>
      <Switch htmlFor={id}>
        <input id={id} checked={checked} onChange={(e) => onChange(e.target.checked)} type="checkbox" />
        <div className="slider round" />
        {label ? <StyledLabel>{label}</StyledLabel> : null}
      </Switch>
    </OutterWrapper>
  );
}

const OutterWrapper = styled.div`
  display: flex;
  align-items: bottom;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const StyledLabel = styled.div`
  color: #c3cad2;
`;

const Switch = styled.label`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  user-select: none;

  &,
  &:focus,
  &:active,
  &:hover {
    outline: none;
  }

  input[type='checkbox'] {
    opacity: 0;
    position: absolute;
    top: 1000000000px;
    width: 0;
    height: 0;
  }

  .slider {
    position: relative;
    cursor: pointer;
    background-color: #ccc;
    transition: 0.1s;
    width: ${slideWidth};
    height: ${slideHeight};
  }

  .slider:before {
    position: absolute;
    content: '';
    height: ${sliderSize};
    width: ${sliderSize};
    left: 3px;
    top: 2px;
    background-color: white;
    transition: 0.1s;
  }

  input:checked + .slider {
    background: linear-gradient(291.35deg, #4368ea -25.85%, #c490dd 73.38%);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    transform: translateX(18px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
