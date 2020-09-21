import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Container, Content } from './styles';

import successSubmitIcon from '../../assets/images/icons/green-check.svg';

interface SuccessProps {
  title: string;
  description: string;
  redirectTo: string;
  buttonText: string;
}

const SuccessSubmit: React.FC = () => {
  const { state } = useLocation<SuccessProps>();

  return (
    <Container>
      <Content>
        <img src={successSubmitIcon} alt="Formulário enviado com sucesso" />
        <h1>{state.title}</h1>
        <h3>{state.description}</h3>

        <Link to={state.redirectTo}>{state.buttonText}</Link>
      </Content>
    </Container>
  );
};

export default SuccessSubmit;
