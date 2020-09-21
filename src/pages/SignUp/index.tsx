import React, { useCallback, useState, useMemo, useRef } from 'react';
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

import logo from '../../assets/images/logo.svg';
import showPasswordIcon from '../../assets/images/icons/show-password.svg';
import hidePasswordIcon from '../../assets/images/icons/hide-password.svg';
import backIcon from '../../assets/images/icons/back.svg';

import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { push } = useHistory();

  const [passwordIcon, setPasswordIcon] = useState(showPasswordIcon);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(true);

  const handleSignup = useCallback(
    async (data) => {
      try {
        const signUpSchema = Yup.object().shape({
          email: Yup.string().email().required(),
          password: Yup.string().required(),
        });

        await signUpSchema.validate(data, {
          abortEarly: true,
        });

        push('/success', {
          title: 'Cadastro concluído',
          description:
            'Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência.',
          redirectTo: '/',
          buttonText: 'Fazer login',
        });
      } catch (err) {
        alert('ERRo');
      }
    },
    [push],
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

      const signUpSchema = Yup.object().shape({
        name: Yup.string().required(),
        surname: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      await signUpSchema.validate(formData, {
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
      <Content>
        <TobBar>
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
        </TobBar>
        <FormContent>
          <FormSignup ref={formRef} onSubmit={handleSignup}>
            <section>
              <h1>Cadastro</h1>
              <h2>Preencha os dados abaixo para começar.</h2>
            </section>
            <Input
              width="100%"
              name="name"
              placeholder="Nome"
              onKeyUp={validateForm}
            />
            <Input
              width="100%"
              name="surname"
              placeholder="Sobrenome"
              onKeyUp={validateForm}
            />
            <Input
              width="100%"
              name="email"
              placeholder="Email"
              onKeyUp={validateForm}
            />
            <Input
              type={passwordType}
              name="password"
              placeholder="Senha"
              icon={passwordIcon}
              iconAction={handleShowPassword}
              onKeyUp={validateForm}
            />
            <ButtonContainer>
              <Button disabled={isFormInvalid}>Concluir cadastro</Button>
            </ButtonContainer>
          </FormSignup>
        </FormContent>
      </Content>
      <Background>
        <LogoContainer>
          <img src={logo} alt="Logo Proffy" />
          <h1>Sua plataforma de estudo online</h1>
        </LogoContainer>
      </Background>
    </Container>
  );
};

export default SignUp;
