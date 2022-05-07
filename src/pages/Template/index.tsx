import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Input } from '../../components/Template/Input';
import { Preview } from '../../components/Template/Preview';

const TemplateWrapper = styled.div`
  display: flex;
`;

export function Template() {
  const { ensName } = useParams();
  const formMethods = useForm();
  const fieldArray = useFieldArray({ control: formMethods.control, name: 'DynamicInput' });

  return (
    <FormProvider {...formMethods} {...fieldArray}>
      <TemplateWrapper>
        <Input ensName={ensName} />
        <Preview />
      </TemplateWrapper>
    </FormProvider>
  );
}
