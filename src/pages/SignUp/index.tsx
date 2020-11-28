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

import logo from '../../assets/images/logo.png';
import showPasswordIcon from '../../assets/images/icons/show-password.svg';
import hidePasswordIcon from '../../assets/images/icons/hide-password.svg';
import backIcon from '../../assets/images/icons/back.svg';

import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { push } = useHistory();

  const [passwordIcon, setPasswordIcon] = useState(showPasswordIcon);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(true);

  const handleSignup = useCallback(
    async (data) => {
      try {
        const { type, name, email, phone, password } = data;

        const signUpSchema = Yup.object().shape({
          type: Yup.string().required('Tipo de usuário obrigatório'),
          name: Yup.string().required('Nome de usuário obrigatório'),
          phone: Yup.string().required('Telefone de usuário obrigatório'),
          email: Yup.string().email().required('E-mail de usuário obrigatório'),
          password: Yup.string().required('Senha de usuário obrigatório'),
        });

        await signUpSchema.validate(data, {
          abortEarly: true,
        });

        await api.post('/users', {
          name,
          phone,
          email,
          password,
          type,
        });

        push('/');

        addToast({
          title: 'Successo',
          description: 'Usuário criado com sucesso',
          type: 'success',
        });
      } catch (err) {
        addToast({
          title: 'Erro',
          description: 'Erro ao tentar criar o usuário',
          type: 'error',
        });
      }
    },
    [push, addToast],
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
        type: Yup.string().required('Tipo de usuário obrigatório'),
        name: Yup.string().required('Nome de usuário obrigatório'),
        phone: Yup.string().required('Telefone de usuário obrigatório'),
        email: Yup.string().email().required('E-mail de usuário obrigatório'),
        password: Yup.string().required('Senha de usuário obrigatório'),
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

            {/* <Tabs>
              <Tab selected>Sou usuário</Tab>
              <Tab selected={false}>Sou Anunciante</Tab>
            </Tabs> */}
            <Select
              name="type"
              id="type"
              width="100%"
              placeholder="Selecione"
              options={[
                { value: 'A', label: 'Candidato' },
                { value: 'C', label: 'Anunciante' },
              ]}
            />
            <Input
              width="100%"
              name="name"
              placeholder="Nome"
              onKeyUp={validateForm}
            />
            <Input
              width="100%"
              name="phone"
              placeholder="Telefone"
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
          <h1>Sua plataforma de vagas online</h1>
        </LogoContainer>
      </Background>
    </Container>
  );
};

export default SignUp;
