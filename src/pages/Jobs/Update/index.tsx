import React, { useCallback, useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import { useHistory, useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
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
  const { jobId } = useParams();
  const { user } = useAuth();

  const [job, setJob] = useState<FormProps>({} as FormProps);

  const handleSubmit = useCallback(
    async (data: FormProps) => {
      const dataFormatted = {
        company_id: user.profile.id,
        title: data.title,
        description: data.description,
        job_type_id: data.job_type_id,
        quantity: data.quantity,
      };

      try {
        formRef.current?.setErrors([]);
        const schema = Yup.object().shape({
          company_id: Yup.number().required('Id da empresa obrigatório'),
          title: Yup.string().required('Título obrigatório'),
          description: Yup.string().required('Descrição obrigatório'),
          job_type_id: Yup.string().required('Tipo de vaga obrigatório'),
        });

        await schema.validate(dataFormatted, {
          abortEarly: false,
        });

        await api.put(`/jobs/${jobId}`, dataFormatted);

        addToast({
          title: 'Successo',
          description: 'Vaga alterada com sucesso',
          type: 'success',
        });

        push('/company/jobs');
      } catch (err) {
        console.log(err);
        addToast({
          title: 'Erro',
          description: 'Erro ao tentar criar a vaga',
          type: 'error',
        });
      }
    },
    [addToast, push, user.profile.id, jobId],
  );

  useEffect(() => {
    async function handleGetJob() {
      const response = await api.get<FormProps>(`/jobs/${jobId}`);

      setJob(response.data);
    }

    handleGetJob();
  }, [jobId]);

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
      <Form onSubmit={handleSubmit} ref={formRef} initialData={job}>
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
