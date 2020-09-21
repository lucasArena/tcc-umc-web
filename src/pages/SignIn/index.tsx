import React, { useCallback, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
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

import logo from '../../assets/images/logo.svg';

import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import showPasswordIcon from '../../assets/images/icons/show-password.svg';
import hidePasswordIcon from '../../assets/images/icons/hide-password.svg';

import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';

import api from '../../services/api';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [passwordIcon, setPasswordIcon] = useState(showPasswordIcon);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(true);

  const handleSignin = useCallback(async (data) => {
    try {
      const signInSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      await signInSchema.validate(data, {
        abortEarly: true,
      });
    } catch (err) {
      alert('ERRo');
    }
  }, []);

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
          <img src={logo} alt="Logo Proffy" />
          <h1>Sua plataforma de estudo online</h1>
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
                <Checkbox
                  type="checkbox"
                  id="remember-credencials"
                  name="remeber-credencials"
                />
                <label htmlFor="remember-credencials">Lembrar-me</label>
              </div>
              <div>
                <Link to="/forgot-password">Esqueci minha senha</Link>
              </div>
            </AuxiliaryActions>

            <Button disabled={isFormInvalid}>Entrar</Button>
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
