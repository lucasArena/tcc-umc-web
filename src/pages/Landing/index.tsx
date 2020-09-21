import React, { useState, useEffect } from 'react';
import { FiPower } from 'react-icons/fi';

import {
  Container,
  TopBar,
  ProfileArea,
  Logout,
  Content,
  LogoContainer,
  HeroImage,
  Footer,
  WelcomeMessage,
  ButtonsContainer,
  ButtonTypeChoose,
  TotalConnections,
} from './styles';

import logo from '../../assets/images/logo.svg';
import landing from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import api from '../../services/api';

interface IConnectionsResponse {
  total: number;
}

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    async function getTotalConnections() {
      const connectionsResponse = await api.get<IConnectionsResponse>(
        '/connections',
      );

      const { total } = connectionsResponse.data;

      setTotalConnections(total);
    }
    getTotalConnections();
  }, []);

  return (
    <Container>
      <TopBar>
        <ProfileArea to="/profile">
          <img
            src="https://avatars0.githubusercontent.com/u/33403869?s=460&u=01d807797bdea2abc57e296b5eac9a45d3785cc0&v=4"
            alt="Lucas Arena"
          />
          <span>Lucas Arena</span>
        </ProfileArea>
        <Logout to="/">
          <FiPower size={20} color="#FFF" />
        </Logout>
      </TopBar>
      <Content>
        <LogoContainer>
          <img src={logo} alt="Logo Proffy" />
          <h1>Sua plataforma de estudo online</h1>
        </LogoContainer>

        <HeroImage
          src={landing}
          alt="Plataforma de estudos"
          className="hero-image"
        />
      </Content>
      <Footer>
        <section>
          <WelcomeMessage>
            Seja bem-vindo
            <br />
            <strong>O que deseja fazer?</strong>
          </WelcomeMessage>
          <ButtonsContainer>
            <ButtonTypeChoose to="/teacher/list" classtype="study">
              <img src={studyIcon} alt="Estudar" />
              Estudar
            </ButtonTypeChoose>
            <ButtonTypeChoose to="/teacher/form" classtype="giveClasses">
              <img src={giveClassesIcon} alt="Dar aula" />
              Dar Aula
            </ButtonTypeChoose>
          </ButtonsContainer>
          <TotalConnections>
            {`Total de ${totalConnections} conexões realizadas`}
            <br />
            já realizadas
            <img src={purpleHeartIcon} alt="Coração roxo" />
          </TotalConnections>
        </section>
      </Footer>
    </Container>
  );
};

export default Landing;
