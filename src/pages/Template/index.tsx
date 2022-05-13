import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { AddFieldsModal } from '../../components/Modal/AddFieldsModal';
import { Input } from '../../components/Template/Input';
import { Preview } from '../../components/Template/Preview';
import { defaultFields, Fields, FieldsMapping, FieldType } from '../../constants';

const TemplateWrapper = styled.div`
  display: flex;
`;

export function Template() {
  const { ensName } = useParams();
  const formMethods = useForm();
  const { register, handleSubmit } = useForm();
  const [modalState, setModalState] = useState(true);
  const [inputFields, setInpitFields] = useState<FieldType[]>(defaultFields);

  const onSubmit = (data) => {
    console.log('sbumitdata', data);

    formMethods.reset();
    const keysObject = Object.keys(data);
    setInpitFields(defaultFields);
    keysObject.forEach((item, index) => {
      console.log(data[item], 'boolean');
      console.log('idnex', index);
      console.log('data', data);
      if (data[item] === true) {
        const value = FieldsMapping[index];
        console.log('value ', value);
        setInpitFields((prevState) => [...prevState, value]);
      }
    });
    // const keys = Object.keys(data);
    // console.log(keys);

    setModalState(false);
  };
  useEffect(() => {
    console.log('inputFieldsWOkrs?', inputFields);
  }, [inputFields]);

  return (
    <FormProvider {...formMethods}>
      <TemplateWrapper>
        <Input inputFields={inputFields} setModalState={setModalState} ensName={ensName} />
        <Preview />
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
