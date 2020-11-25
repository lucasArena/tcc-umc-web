import React, { useCallback, useState, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import { Container, ProfileInfo, AvatarContainer, Form } from './styles';

import warningIcon from '../../../assets/images/icons/warning.svg';

import InputGroup from '../../../components/InputGroup';
import Input from '../../../components/Input';

import api from '../../../services/api';

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
  const { addToast } = useToast();
  const { push } = useHistory();
  const { user } = useAuth();

  const [id] = useState(user.id);
  const [userData] = useState<FormProps>({} as FormProps);

  const handleSubmit = useCallback(
    async (data: FormProps) => {
      const dataFormatted = {
        company_id: user.profile.id,
        title: data.title.replace(/[^a-zA-Z ]+/g, ''),
        description: data.description.replace(/[^a-zA-Z ]+/g, ''),
        job_type_id: data.job_type_id,
        quantity: data.quantity,
      };
      console.log(dataFormatted);
      try {
        formRef.current?.setErrors([]);
        const schema = Yup.object().shape({
          company_id: Yup.number().required('Id da empresa obrigatório'),
          title: Yup.string().required('Título obrigatório'),
          description: Yup.string().required('Descrição obrigatório'),
          job_type_id: Yup.string().required('Tipo de vaga obrigatório'),
          quantity: Yup.number().required('Quantidade obrigatório'),
        });

        await schema.validate(dataFormatted, {
          abortEarly: false,
        });

        await api.post(`/jobs`, dataFormatted);

        addToast({
          title: 'Successo',
          description: 'Vaga criada com sucesso',
          type: 'success',
        });

        push('/company/jobs');
      } catch (err) {
        addToast({
          title: 'Erro',
          description: 'Erro ao tentar criar a vaga',
          type: 'error',
        });
      }
    },
    [addToast, push, user.profile.id],
  );

  return (
    <Container>
      <ProfileInfo>
        <AvatarContainer htmlFor="avatar">
          <img
            src={
              user.avatar_url ||
              'https://avatars0.githubusercontent.com/u/33403869?s=460&u=01d807797bdea2abc57e296b5eac9a45d3785cc0&v=4'
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
              width="100%"
              options={[
                { value: '1', label: 'CLT' },
                { value: '2', label: 'PJ' },
              ]}
            />
          </InputGroup>

          <InputGroup>
            <Input label="Quantidade" name="quantity" id="quantity" />
          </InputGroup>
        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante
            <br />
            Preencha todos os dados
          </p>
          <button type="submit">Criar</button>
        </footer>
      </Form>
    </Container>
  );
};

export default Profile;
