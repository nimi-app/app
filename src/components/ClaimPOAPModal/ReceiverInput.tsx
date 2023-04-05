import { atomWithStorage } from 'jotai/utils';
import { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';

/**
 * Holds the auto claim setting in local storage
 */
export const autoClaimPOAPAtom = atomWithStorage<boolean>('nimiPOAPAutoClaim', false);
/**
 * Holds the recent receiver address in local storage
 */
export const autoClaimPOAPRecentReceiverAtom = atomWithStorage<string>('nimiPOAPRecentReceiver', '');
/**
 * Holds the list of recievers in local storage
 */
export const autoClaimPOAPRecentReceiverListAtom = atomWithStorage<ReceiverOption[]>('nimiPOAPRecentReceiverList', []);

interface ReceiverOption {
  readonly label: string;
  readonly value: string;
}

/**
 * Holds the list of recievers in local storage
 */
const localStorageKey = 'nimiPOAPRecentReceiverList';

/**
 * Returns the list of recievers from local storage or an empty array if none is found
 * @returns
 */
function getLocalStorageOptionList(): ReceiverOption[] {
  const recieverList = localStorage.getItem(localStorageKey);
  if (!recieverList) return [];
  try {
    return JSON.parse(recieverList); // consider that users can tamper with local storage
  } catch (error) {
    return [];
  }
}

function setLocalStorageOptionList(options: ReceiverOption[]) {
  localStorage.setItem(localStorageKey, JSON.stringify(options));
}

/**
 * Saves the value to local storage
 * @param value
 */
export function saveOptionValueToLocalStorage(value: string) {
  const nextOption = createOption(value);
  const nextOptionFound = getLocalStorageOptionList().find((option) => option.value === nextOption.value);

  // If the option is already in the list, do nothing
  if (nextOptionFound) {
    return;
  }

  const nextOptions = [nextOption, ...getLocalStorageOptionList()]; // recent first
  setLocalStorageOptionList(nextOptions);
}

interface ReceiverInputProps {
  onChange: (value: string) => void;
  dark?: boolean;
}

function createOption(name: string) {
  name = name.trim().toLowerCase();
  return {
    name,
    label: name,
    value: name,
  };
}

/**
 *
 */
export function ReceiverInput({ onChange, dark }: ReceiverInputProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(getLocalStorageOptionList());
  const [value, setValue] = useState<ReceiverOption | null>(options.length > 0 ? options[0] : null);

  const handleCreate = (inputValue: string) => {
    const nextOption = createOption(inputValue);
    const nextOptionFound = options.find((option) => option.value === nextOption.value);

    if (nextOptionFound) {
      setValue(nextOptionFound);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      const nextOptions = [newOption, ...options]; // recent first
      setOptions(nextOptions);
      setValue(newOption);
      // Save a copy of the list in local storage
      setLocalStorageOptionList(nextOptions);
    }, 1000);
  };

  const components: Parameters<typeof AsyncCreatableSelect<ReceiverOption, false>>['0']['components'] = {
    IndicatorSeparator: () => null,
  };

  // Hide menu when there are no options
  if (options.length < 2) {
    components.Menu = function Menu() {
      return null;
    };
    components.NoOptionsMessage = function NoOptionsMessage() {
      return null;
    };
    components.DropdownIndicator = function DropdownIndicator() {
      return null;
    };
  }

  return (
    <AsyncCreatableSelect<ReceiverOption, false>
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={(newValue) => {
        setValue(newValue);
        setInputValue(newValue?.value || '');
        // Notify parent
        onChange(newValue?.value || '');
      }}
      onInputChange={(inputValue, { action }) => {
        if (action === 'menu-close' || action === 'input-blur' || action === 'set-value') {
          return;
        } else {
          // this.setState({ searchValue: e });
          console.log({ inputValue });
          onChange(inputValue);
          setInputValue(inputValue);
        }
      }}
      inputValue={inputValue}
      defaultOptions={options}
      options={options}
      onCreateOption={handleCreate}
      value={value}
      components={components}
      styles={{
        container: (provided, state) => ({
          ...provided,
          minWidth: '80px',
          borderRadius: '8px',
          ...getContainerStyles(state.isFocused, dark),
        }),
        control: (provided) => ({
          ...provided,
          background: '#fff',
          cursor: 'pointer',
          width: '100%',
          padding: '8px 8px',
          borderRadius: '8px',
          boxShadow: 'none',
          border: 'none !important', // border is set in container
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: 0,
        }),
        menu: (provided) => ({
          ...provided,
          overflow: 'hidden',
          zIndex: 10,
        }),
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? '#fff' : '#000',
          cursor: 'pointer',
          fontWeight: 'bold',
        }),
        menuList: (provided) => ({
          ...provided,
          maxHeight: '90px',
        }),
      }}
      placeholder="ENS or address"
      formatCreateLabel={(inputValue) => `Claim to ${inputValue}`}
    />
  );
}

const controlHoverAndFocus = {
  light: {
    color: '#374151',
    background: '#f9fafb',
    border: '1px solid transparent',
    backgroundImage: `linear-gradient(white, white), linear-gradient(111.35deg, #4368ea -25.85%, #c490dd 73.38%)`,
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  },
  dark: {
    color: '#fff',
    background: '#374151cf',
    border: '1px solid #4B5563cf',
  },
};

function getContainerStyles(isFocused: boolean, isDark?: boolean) {
  if (isDark) {
    return {
      background: '#374151',
      border: '1px solid #4B5563',
      color: '#ffffffcf',
      ...(isFocused ? controlHoverAndFocus.dark : {}),
      '&:hover': {
        ...controlHoverAndFocus.dark,
      },
      '&:focus': {
        ...controlHoverAndFocus.dark,
      },
    };
  }

  return {
    background: '#f9fafb',
    border: '1px solid #d1d5db',
    color: '#374151',
    ...(isFocused ? controlHoverAndFocus.light : {}),
    '&:hover': {
      ...controlHoverAndFocus.light,
    },
    '&:focus': {
      ...controlHoverAndFocus.light,
    },
  };
}
