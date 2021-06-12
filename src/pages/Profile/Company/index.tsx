import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
} from 'react';
import { FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { cnpj as CNPJValidator } from 'cpf-cnpj-validator';
import * as Yup from 'yup';

import {
  Container,
  ProfileInfo,
  AvatarContainer,
  Form,
  SubmitButton,
} from './styles';

import warningIcon from '../../../assets/images/icons/warning.svg';

import InputGroup from '../../../components/InputGroup';
import Input from '../../../components/Input';
import InputMask from '../../../components/InputMask';

import api from '../../../services/api';

import { useLoad } from '../../../hooks/load';
import { useAuth } from '../../../hooks/auth';
import { useToast } from '../../../hooks/toast';
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
  const { isLoading, handleLoading } = useLoad();
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const [id] = useState(user.id);
  const [userData, setUserData] = useState<FormProps>({} as FormProps);

  const handleValidateCNPJ = useCallback(
    async (value: string): Promise<void> => {
      try {
        const cnpjFormatted = value.replace(/\D/g, '');
        const errorAlreadySet: any = formRef.current?.getErrors();

        if (user.profile.cnpj === cnpjFormatted) {
          delete errorAlreadySet['profile[cnpj]'];
          formRef.current?.setErrors(errorAlreadySet);
          return;
        }

        if (!cnpjFormatted || 'profile[cnpj]' in errorAlreadySet) {
          return;
        }

        await api.get(`/companies/cnpj/${cnpjFormatted}`);
      } catch (error) {
        formRef.current?.setErrors({ 'profile[cnpj]': 'CNPJ já existente' });

        handleLoading(false);
        addToast({
          title: 'CNPJ',
          description: 'CNPJ já existente',
          type: 'error',
        });
      }
    },
    [addToast, user.profile.cnpj, handleLoading],
  );

  const handleSubmit = useCallback(
    async (data: FormProps) => {
      try {
        handleLoading(true);
        formRef.current?.setErrors([]);

        const phoneFormatted = data.phone.replace(/\D/g, '');
        const cnpjFormatted = data.profile.cnpj.replace(/\D/g, '');

        const dataFormatted = {
          ...data,
          phone: phoneFormatted,
          profile: {
            ...data.profile,
            cnpj: cnpjFormatted,
          },
        };

        try {
          if (cnpjFormatted && user.profile.cnpj !== cnpjFormatted) {
            await api.get(`/companies/cnpj/${cnpjFormatted}`);
          }
        } catch (error) {
          formRef.current?.setErrors({
            'profile[cnpj]': 'CNPJ já existente',
          });

          handleLoading(false);
          addToast({
            title: 'CNPJ',
            description: 'CNPJ já existente',
            type: 'error',
          });
          return;
        }

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Email inválido')
            .required('Nome obrigatório'),
          phone: Yup.string().min(11, 'Telefone inválido')
            .required('Telefone obrigatório'),
          profile: Yup.object().shape({
            cnpj: Yup.string()
              .test(
                'cpf_validate',
                'CNPJ inválido',
                function isValidCPF(checkCNPJ) {
                  if (!checkCNPJ) {
                    return false;
                  }

                  if (!CNPJValidator.isValid(checkCNPJ)) {
                    return false;
                  }

                  return true;
                },
              )
              .required('CNPJ obrigatório'),
            trade_name: Yup.string().required('Nome fantásia obrigatório'),
          }),
        });

        await schema.validate(dataFormatted, {
          abortEarly: false,
        });

        const userUpdated = await api.put(`/users/${id}`, {
          name: dataFormatted.name,
          email: dataFormatted.email,
          phone: dataFormatted.phone,
          profile_type: 'App\\CompanyEloquent',
          profile: dataFormatted.profile,
        });

        updateUser(userUpdated.data);

        handleLoading(false);
        addToast({
          title: 'Successo',
          description: 'Usuário atualizado com sucesso',
          type: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          console.log(errors);
          formRef.current?.setErrors(errors);

          err.errors.forEach((error) => {
            addToast({
              title: 'Erro',
              description: error,
              type: 'error',
            });
          });
          handleLoading(false);
          return;
        }

        handleLoading(false);
        addToast({
          title: 'Erro',
          description: `Erro ao tentar atualizar o cadastro`,
          type: 'error',
        });
      }
    },
    [id, addToast, updateUser, handleLoading, user.profile.cnpj],
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
            <Input label="Email" name="email" id="email" width="40%" disabled />
            <InputMask
              mask="99.999.999/9999-99"
              label="CNPJ"
              name="profile[cnpj]"
              id="cnpj"
              width="30%"
              onBlur={(e) => handleValidateCNPJ(e.target.value)}
            />
            <InputMask
              label="Telefone"
              mask="(99) 99999-9999"
              width="30%"
              name="phone"
              placeholder="Telefone"
            />
          </InputGroup>

          <InputGroup>
            <Input
              label="Nome fantasia"
              name="profile[trade_name]"
              id="trade_name"
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
