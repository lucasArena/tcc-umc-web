import React, { useCallback, useState, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import { Container, ProfileInfo, AvatarContainer, Form } from './styles';

import warningIcon from '../../../assets/images/icons/warning.svg';

import InputGroup from '../../../components/InputGroup';
import Input from '../../../components/Input';

import api from '../../../services/api';

import { useLoad } from '../../../hooks/load';
import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';
import Textarea from '../../../components/TextArea';
import Select from '../../../components/Select';

interface FormProps {
  title: string;
  description: string;
  job_type_id: number;
  quantity: number;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { isLoading, handleLoading } = useLoad();
  const { addToast } = useToast();
  const { push } = useHistory();
  const { user } = useAuth();

  const [userData] = useState<FormProps>({} as FormProps);

  const handleSubmit = useCallback(
    async (data: FormProps) => {
      const dataFormatted = {
        company: {
          id: user.profile.id,
          profile_type: user.profile_type,
        },
        type: {
          id: data.job_type_id,
        },
        title: data.title,
        description: data.description,
        quantity: data.quantity,
      };

      try {
        handleLoading(true);
        formRef.current?.setErrors([]);
        const schema = Yup.object().shape({
          company: Yup.object().shape({
            id: Yup.number().required('Id da empresa obrigatório'),
          }),
          type: Yup.object().shape({
            id: Yup.string().required('Tipo de vaga obrigatório'),
          }),
          title: Yup.string().required('Título obrigatório'),
          description: Yup.string().required('Descrição obrigatório'),
          quantity: Yup.number().required('Quantidade obrigatório'),
        });

        await schema.validate(dataFormatted, {
          abortEarly: false,
        });

        await api.post(`/jobs`, dataFormatted);

        handleLoading(false);
        addToast({
          title: 'Successo',
          description: 'Vaga criada com sucesso',
          type: 'success',
        });

        push('/company/jobs');
      } catch (err) {
        console.log(err);

        handleLoading(false);
        addToast({
          title: 'Erro',
          description: 'Erro ao tentar criar a vaga',
          type: 'error',
        });
      }
    },
    [addToast, push, user.profile.id, user.profile_type, handleLoading],
  );

  return (
    <Container>
      <ProfileInfo>
        <AvatarContainer htmlFor="avatar">
          <img
            src={
              (user.avatar && user.avatar_url) ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD6o4MplGmPR_M3Z_mSwecQ3cKlpZzaJOyhQ&usqp=CAU'
            }
            alt={user.name}
          />
        </AvatarContainer>

        <h2>{user.name}</h2>
      </ProfileInfo>
      <Form onSubmit={handleSubmit} ref={formRef} initialData={userData}>
        <fieldset>
          <legend>Dados da vaga</legend>
          <InputGroup>
            <Input label="Título" name="title" id="title" />
          </InputGroup>
          <InputGroup>
            <Textarea label="Descrição" name="description" id="description" />
          </InputGroup>
          <InputGroup>
            <Select
              label="Tipo de vaga"
              id="job_type_id"
              name="job_type_id"
              placeholder="Selecione"
              width="50%"
              options={[
                { value: '1', label: 'CLT' },
                { value: '2', label: 'PJ' },
                { value: '3', label: 'Freelance' },
                { value: '4', label: 'Temporario' },
              ]}
            />
            <Input
              label="Quantidade"
              name="quantity"
              id="quantity"
              width="50%"
            />
          </InputGroup>
        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante
            <br />
            Preencha todos os dados
          </p>
          <button type="submit">
            {isLoading ? 'Processando...' : 'Editar'}
          </button>
        </footer>
      </Form>
    </Container>
  );
};

export default Profile;
