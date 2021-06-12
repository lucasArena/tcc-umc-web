import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
} from 'react';
import { FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Container, ProfileInfo, AvatarContainer, Form, SubmitButton } from './styles';

import warningIcon from '../../../assets/images/icons/warning.svg';

import InputGroup from '../../../components/InputGroup';
import Input from '../../../components/Input';
import InputMask from '../../../components/InputMask';

import api from '../../../services/api';

import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';
import { useLoad } from '../../../hooks/load';

import getValidationErrors from '../../../utils/getValidationErrors';

interface FormProps {
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
  profile: {
    trade_name: string;
    cnpj: string;
  };
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const { isLoading, handleLoading } = useLoad();

  const [id] = useState(user.id);
  const [userData, setUserData] = useState<FormProps>({} as FormProps);

  const handleSubmit = useCallback(
    async (data: FormProps) => {
      handleLoading(true);
      const dataFormatted = {
        name: data.name.replace(/[^a-zA-Z ]+/g, ''),
        email: data.email,
        phone: data.phone.replace(/\D/g, ''),
      };

      try {
        formRef.current?.setErrors([]);
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Email inválido')
            .required('Nome obrigatório'),
          phone: Yup.string().min(11, 'Telefone inválido')
            .required('Telefone obrigatório'),
        });

        await schema.validate(dataFormatted, {
          abortEarly: false,
        });

        const userUpdated = await api.put(`/users/${id}`, {
          name: dataFormatted.name,
          email: dataFormatted.email,
          phone: dataFormatted.phone,
          profile_type: 'App\\AdminEloquent',
        });

        updateUser(userUpdated.data);

        addToast({
          title: 'Successo',
          description: 'Usuário atualizado com sucesso',
          type: 'success',
        });
        handleLoading(false);
      } catch (err) {
        handleLoading(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          err.errors.forEach((error) => {
            addToast({
              title: 'Erro',
              description: error,
              type: 'error',
            });
          });
          return;
        }

        addToast({
          title: 'Erro',
          description: `Erro ao tentar atualizar o cadastro`,
          type: 'error',
        });
      }
    },
    [id, addToast, updateUser, handleLoading],
  );

  const handleAvatarUpdate = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const formAvatar = new FormData();

        formAvatar.append('image', e.target.files[0]);

        const response = await api.post(`/avatar/${id}`, formAvatar);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado!',
        });
      }
    },
    [id, updateUser, addToast],
  );

  useEffect(() => {
    async function handleGetUser() {
      try {
        const responseUserData = await api.get(`/users/${id}`);

        const userInfo = responseUserData.data;

        const {
          name,
          email,
          phone,
          avatar_url,
          profile: { trade_name, cnpj },
        } = userInfo;

        setUserData({
          name,
          email,
          phone,
          avatar_url,
          profile: {
            trade_name,
            cnpj,
          },
        });
      } catch (err) {
        addToast({
          title: 'Erro',
          description: 'Erro ao tentar resgatar os dados do usuário',
          type: 'error',
        });
      }
    }

    handleGetUser();
  }, [addToast, id]);

  return (
    <Container>
      <ProfileInfo>
        <AvatarContainer htmlFor="avatar">
          <input type="file" id="avatar" onChange={handleAvatarUpdate} />
          <img
            src={
              user.avatar
                ? user.avatar_url
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD6o4MplGmPR_M3Z_mSwecQ3cKlpZzaJOyhQ&usqp=CAU'
            }
            alt={user.name}
          />
          <div>
            <FiCamera />
          </div>
        </AvatarContainer>

        <h2>{user.name}</h2>
      </ProfileInfo>
      <Form onSubmit={handleSubmit} ref={formRef} initialData={userData}>
        <fieldset>
          <legend>Seus dados</legend>
          <InputGroup>
            <Input label="Nome" name="name" id="name" />
          </InputGroup>
          <InputGroup>
            <Input label="Email" name="email" id="email" width="50%" disabled />
            <InputMask
              label="Telefone"
              mask="(99) 99999-9999"
              width="50%"
              name="phone"
              placeholder="Telefone"
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
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Processando...' : 'Atualizar'}
          </SubmitButton>
        </footer>
      </Form>
    </Container>
  );
};

export default Profile;
