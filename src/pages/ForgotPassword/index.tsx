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

import logo from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import Background from '../../components/Background';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ForgotPassword: React.FC = () => {
  const { push } = useHistory();
  const formRef = useRef<FormHandles>(null);

  const [isFormInvalid, setIsFormInvalid] = useState(true);

  const handleForgotPassword = useCallback(
    async (data) => {
      try {
        const forgotPasswordSchema = Yup.object().shape({
          email: Yup.string().email().required(),
        });

        await forgotPasswordSchema.validate(data, {
          abortEarly: true,
        });

        push('/success', {
          title: 'Redefinição enviada!',
          description:
            'Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.',
          redirectTo: '/',
          buttonText: 'Voltar ao login',
        });
      } catch (err) {
        alert('ERRo');
      }
    },
    [push],
  );

  const validateForm = useCallback(async () => {
    try {
      const formData = formRef.current?.getData();

      const forgotPasswordSchema = Yup.object().shape({
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

            <Input name="email" placeholder="Email" onKeyUp={validateForm} />

            <ButtonContainer>
              <Button disabled={isFormInvalid}>Enviar</Button>
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

export default ForgotPassword;
