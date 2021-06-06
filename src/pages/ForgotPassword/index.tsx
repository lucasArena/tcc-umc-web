import React, { useCallback, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  Container,
  Content,
  TobBar,
  LogoContainer,
  FormContent,
  FormSignup,
  ButtonContainer,
} from './styles';

import logo from '../../assets/images/logo.png';
import backIcon from '../../assets/images/icons/back.svg';

import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import Select from '../../components/Select';
import api from '../../services/api';
import { useLoad } from '../../hooks/load';

interface FormProps {
  email: string;
  profile_type: string;
}

const ForgotPassword: React.FC = () => {
  const { isLoading, handleLoading } = useLoad();
  const { push } = useHistory();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const [isFormInvalid, setIsFormInvalid] = useState(true);

  const handleForgotPassword = useCallback(
    async (data: FormProps) => {
      try {
        handleLoading(true);
        const forgotPasswordSchema = Yup.object().shape({
          profile_type: Yup.string().required('Tipo é obrigatório'),
          email: Yup.string().email().required('E-mail é obrigatório'),
        });

        await forgotPasswordSchema.validate(data, {
          abortEarly: true,
        });

        await api.post('/forgot-password', {
          user: {
            email: data.email,
            profile_type: data.profile_type,
          },
        });

        handleLoading(false);
        push('/success', {
          title: 'Redefinição enviada!',
          description:
            'Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.',
          redirectTo: '/',
          buttonText: 'Voltar ao login',
        });
      } catch (err) {
        handleLoading(false);
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Erro ao tentar enviar o e-mail de reset de senha',
        });
      }
    },
    [push, addToast, handleLoading],
  );

  const validateForm = useCallback(async () => {
    try {
      const formData = formRef.current?.getData();

      const forgotPasswordSchema = Yup.object().shape({
        profile_type: Yup.string().required(),
        email: Yup.string().email().required(),
      });

      await forgotPasswordSchema.validate(formData, {
        abortEarly: true,
      });

      setIsFormInvalid(false);
    } catch (err) {
      setIsFormInvalid(true);
    }
  }, []);

  return (
    <Container>
      <Content>
        <TobBar>
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
        </TobBar>
        <FormContent>
          <FormSignup ref={formRef} onSubmit={handleForgotPassword}>
            <section>
              <h1>Eita, esqueceu sua senha?</h1>
              <h2>Não esquenta, vamos dar um jeito nisso.</h2>
            </section>

            <Select
              name="profile_type"
              placeholder="Tipo"
              options={[
                { value: 'App\\ApplicantEloquent', label: 'Candidato' },
                { value: 'App\\CompanyEloquent', label: 'Empresa' },
              ]}
            />

            <Input name="email" placeholder="Email" onKeyUp={validateForm} />

            <ButtonContainer>
              <Button disabled={isFormInvalid || isLoading}>
                {isLoading ? 'Processando...' : 'Enviar'}
              </Button>
            </ButtonContainer>
          </FormSignup>
        </FormContent>
      </Content>
      <Background>
        <LogoContainer>
          <img src={logo} alt="Logo Proffy" />
          <h1>Sua plataforma de vagas online</h1>
        </LogoContainer>
      </Background>
    </Container>
  );
};

export default ForgotPassword;
