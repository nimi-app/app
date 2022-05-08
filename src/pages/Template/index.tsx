import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { AddFieldsModal } from '../../components/Modal/AddFieldsModal';
import { Input } from '../../components/Template/Input';
import { Preview } from '../../components/Template/Preview';

const TemplateWrapper = styled.div`
  display: flex;
`;

export function Template() {
  const { ensName } = useParams();
  const formMethods = useForm();
  const { register, handleSubmit } = useForm();
  const [modalState, setModalState] = useState(true);

  return (
    <FormProvider {...formMethods}>
      <TemplateWrapper>
        <Input setModalState={setModalState} ensName={ensName} />
        <Preview />
      </TemplateWrapper>
      <AddFieldsModal
        handleSubmit={handleSubmit}
        registerFields={register}
        setModal={setModalState}
        isOpen={modalState}
      />
    </FormProvider>
  );
}
