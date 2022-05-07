import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export function Preview(props) {
  const { watch } = useFormContext();
  const fields = useMemo(() => {
    return watch();
  }, [watch]);
  console.log(fields);

  return (
    <div>
      {Object.keys(fields).map((item, index) => {
        return (
          <div>
            <div> Field:{item}</div>
            <div> Value:{fields[index]}</div>
          </div>
        );
      })}
    </div>
  );
}
