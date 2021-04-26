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

interface FormProps {
  email: string;
  profile_type: string;
}

const ResetPassword: React.FC = () => {
  const { push } = useHistory();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const [isFormInvalid, setIsFormInvalid] = useState(true);

  const handleResetPassword = useCallback(
    async (data: FormProps) => {
      try {
        const resetPasswordSchema = Yup.object().shape({
          password: Yup.string().required(),
          password_confirmatrion: Yup.string().required(),
        });

        await resetPasswordSchema.validate(data, {
          abortEarly: true,
        });

        await api.post('/forgot', {
          user: {
            email: data.email,
            profile_type: data.profile_type,
          },
        });

        push('/success', {
          title: 'Redefinição de senha realizada com sucesso',
          description: 'Boa, agora é só se logar novamente com a nova senha.',
          redirectTo: '/',
          buttonText: 'Voltar ao login',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Erro ao tentar resetar a senha',
        });
      }
    },
    [push, addToast],
  );

  const validateForm = useCallback(async () => {
    try {
      const formData = formRef.current?.getData();

      const resetPasswordSchema = Yup.object().shape({
        password: Yup.string().required(),
        password_confirmatrion: Yup.string().required(),
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

            <Input name="password" placeholder="Senha" onKeyUp={validateForm} />
            <Input
              name="password_confirmation"
              placeholder="Confirmação de senha"
              onKeyUp={validateForm}
            />

            <ButtonContainer>
              <Button disabled={isFormInvalid}>Resetar</Button>
            </ButtonContainer>
          </FormSignup>
        </FormContent>
      </Content>
    </Container>
  );
};

export default ResetPassword;
