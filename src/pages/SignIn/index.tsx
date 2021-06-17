import React, { useCallback, useState, useMemo, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  Container,
  Content,
  LogoContainer,
  FormContent,
  FormSignin,
  AuxiliaryActions,
  Footer,
} from './styles';

import logo from '../../assets/images/logo.png';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import showPasswordIcon from '../../assets/images/icons/show-password.svg';
import hidePasswordIcon from '../../assets/images/icons/hide-password.svg';

import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { useLoad } from '../../hooks/load';

interface CredencialsProps {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { push } = useHistory();
  const { isLoading, handleLoading } = useLoad();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const [passwordIcon, setPasswordIcon] = useState(showPasswordIcon);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(true);

  const handleSignin = useCallback(
    async (data: CredencialsProps) => {
      try {
        handleLoading(true);
        const { email, password } = data;

        const signInSchema = Yup.object().shape({
          email: Yup.string().email().required(),
          password: Yup.string().required(),
        });

        await signInSchema.validate(data, {
          abortEarly: true,
        });

        await signIn({
          email,
          password,
        });

        handleLoading(false);
        push('/landing');
      } catch (err) {
        handleLoading(false);
        addToast({
          title: 'Erro',
          description: 'Email/Senha inválida',
          type: 'error',
        });
      }
    },
    [signIn, addToast, push, handleLoading],
  );

  const handleShowPassword = useCallback(() => {
    if (showPassword) {
      setPasswordIcon(showPasswordIcon);
    } else {
      setPasswordIcon(hidePasswordIcon);
    }
    setShowPassword(!showPassword);
  }, [setShowPassword, showPassword]);

  const validateForm = useCallback(async () => {
    try {
      const formData = formRef.current?.getData();

      const signInSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      await signInSchema.validate(formData, {
        abortEarly: true,
      });

      setIsFormInvalid(false);
    } catch (err) {
      setIsFormInvalid(true);
    }
  }, []);

  const passwordType = useMemo(() => {
    if (!showPassword) {
      return 'password';
    }

    return 'text';
  }, [showPassword]);

  return (
    <Container>
      <Background>
        <LogoContainer>
          <img src={logo} alt="Logo WorkSystem" />
          <h1>Sua plataforma de trabalho online</h1>
        </LogoContainer>
      </Background>
      <Content>
        <FormContent>
          <FormSignin ref={formRef} onSubmit={handleSignin}>
            <h1>Fazer Login</h1>
            <Input name="email" placeholder="Email" onKeyUp={validateForm} />
            <Input
              type={passwordType}
              name="password"
              placeholder="Senha"
              icon={passwordIcon}
              iconAction={handleShowPassword}
              onKeyUp={validateForm}
            />

            <AuxiliaryActions>
              <div>
                <Link to="/forgot-password">Esqueci minha senha</Link>
              </div>
            </AuxiliaryActions>

            <Button disabled={isFormInvalid || isLoading}>
              {isLoading ? 'Processando...' : 'Entrar'}
            </Button>
          </FormSignin>
          <Footer>
            <section>
              Não tem conta?
              <br />
              <Link to="/signup">Cadastre-se</Link>
            </section>
            <aside>
              É de graça
              <img src={purpleHeartIcon} alt="Coração Roxo" />
            </aside>
          </Footer>
        </FormContent>
      </Content>
    </Container>
  );
};

export default SignIn;
