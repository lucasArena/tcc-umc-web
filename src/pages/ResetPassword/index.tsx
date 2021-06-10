import React, { useCallback, useState, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
import api from '../../services/api';
import { useLoad } from '../../hooks/load';

interface FormProps {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const { push } = useHistory();
  const { isLoading, handleLoading } = useLoad();
  const { addToast } = useToast();
  const location = useLocation();
  const formRef = useRef<FormHandles>(null);

  const [isFormInvalid, setIsFormInvalid] = useState(true);

  const handleResetPassword = useCallback(
    async (data: FormProps) => {
      try {
        handleLoading(true);
        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');
        const resetPasswordSchema = Yup.object().shape({
          password: Yup.string().required(),
          password_confirmation: Yup.string().required(),
          token: Yup.string().required(),
        });

        await resetPasswordSchema.validate(
          {
            password,
            password_confirmation,
            token,
          },
          {
            abortEarly: true,
          },
        );

        await api.post('/reset-password', {
          password,
          token,
        });

        handleLoading(false);
        push('/success', {
          title: 'Redefinição de senha realizada com sucesso',
          description: 'Boa, agora é só se logar novamente com a nova senha.',
          redirectTo: '/',
          buttonText: 'Voltar ao login',
        });
      } catch (err) {
        handleLoading(false);

        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Erro ao tentar resetar a senha',
        });
      }
    },
    [push, addToast, location.search, handleLoading],
  );

  const validateForm = useCallback(async () => {
    try {
      const formData = formRef.current?.getData();

      const resetPasswordSchema = Yup.object().shape({
        password: Yup.string().required(),
        password_confirmation: Yup.string().required(),
      });

      await resetPasswordSchema.validate(formData, {
        abortEarly: true,
      });

      setIsFormInvalid(false);
    } catch (err) {
      setIsFormInvalid(true);
    }
  }, []);

  return (
    <Container>
      <Background>
        <LogoContainer>
          <img src={logo} alt="Logo Proffy" />
          <h1>Sua plataforma de vagas online</h1>
        </LogoContainer>
      </Background>
      <Content>
        <TobBar>
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
        </TobBar>
        <FormContent>
          <FormSignup ref={formRef} onSubmit={handleResetPassword}>
            <section>
              <h1>Bora resetar a senha?</h1>
              <h2>Vamos lá, só colocar a nova senha que deseja.</h2>
            </section>

            <Input
              type="password"
              name="password"
              placeholder="Senha"
              onKeyUp={validateForm}
            />
            <Input
              type="password"
              name="password_confirmation"
              placeholder="Confirmação de senha"
              onKeyUp={validateForm}
            />

            <ButtonContainer>
              <Button disabled={isFormInvalid || isLoading}>
                {isLoading ? 'Processando...' : 'Resetar'}
              </Button>
            </ButtonContainer>
          </FormSignup>
        </FormContent>
      </Content>
    </Container>
  );
};

export default ResetPassword;
