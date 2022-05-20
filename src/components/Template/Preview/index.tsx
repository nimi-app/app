import { useFormContext } from 'react-hook-form';

export function Preview() {
  const { watch } = useFormContext();

  const arrayOfFormFields = watch();

  return (
    <div>
      {Object.keys(arrayOfFormFields).map((item, index) => {
        return (
          <div key={index}>
            <div> Field:{item}</div>
            <div> Value:{arrayOfFormFields[item]}</div>
          </div>
        );
      })}
    </div>
  );
}
