import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { AddFieldsModal } from '../../components/Modal/AddFieldsModal';
import { Input } from '../../components/Template/Input';
import { Preview } from '../../components/Template/Preview';
import { defaultFields, FieldsMapping, FieldType } from '../../constants';

const TemplateWrapper = styled.div`
  display: flex;
  gap: 27px;
`;

export function Template() {
  const { ensName } = useParams();
  const formMethods = useForm();
  const { register, handleSubmit } = useForm();
  const [modalState, setModalState] = useState(false);
  const [inputFields, setInputFields] = useState<FieldType[]>(defaultFields);

  const onSubmit = (data) => {
    const keysObject = Object.keys(data);
    setInputFields(defaultFields);
    keysObject.forEach((item, index) => {
      const value = FieldsMapping[index];
      if (data[item] === true) {
        setInputFields((prevState) => [...prevState, value]);
      } else {
        formMethods.unregister(value.name);
      }
    });
    setModalState(false);
  };

  return (
    <FormProvider {...formMethods}>
      <TemplateWrapper>
        <Input inputFields={inputFields} setModalState={setModalState} ensName={ensName} />
        <Preview ensName={ensName} />
      </TemplateWrapper>
      <AddFieldsModal
        handleSubmit={handleSubmit(onSubmit)}
        registerFields={register}
        setModal={setModalState}
        isOpen={modalState}
      />
    </FormProvider>
  );
}
