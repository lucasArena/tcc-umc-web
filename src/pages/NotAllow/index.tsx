import React from 'react';

import {
  Container,
  ImageBlockContainer,
  Main,
  Title,
  Content,
  ButtonGoBackToLanding,
} from './styles';

import NotAllowIcon from '../../assets/images/icons/not-allow.svg';

const NotAllow: React.FC = () => {
  return (
    <Container>
      <Content>
        <ImageBlockContainer>
          <img src={NotAllowIcon} alt="Not allow logo" />
        </ImageBlockContainer>

        <Main>
          <Title>
            <h1>Página não encontrada</h1>
            <h2>
              A página solicitada não foi encontrada! Por favor tente novamente!
            </h2>
          </Title>
          <ButtonGoBackToLanding to="/landing">
            Voltar para a página inicial
          </ButtonGoBackToLanding>
        </Main>
      </Content>
    </Container>
  );
};

export default NotAllow;
