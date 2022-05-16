import { useFormContext } from 'react-hook-form';

export function Preview() {
  const { watch } = useFormContext();

  const arrayOfFormFields = watch();

  return (
    <div>
      {Object.keys(arrayOfFormFields).map((item) => {
        return (
          <div>
            <div> Field:{item}</div>
            <div> Value:{arrayOfFormFields[item]}</div>
          </div>
        );
      })}
    </div>
  );
}
