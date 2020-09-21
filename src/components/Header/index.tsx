import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  Container,
  PageHeader,
  TopbarContainer,
  HeaderContent,
} from './styles';

import backIcon from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';

interface HeaderProps {
  pageName?: string;
  contentStyle?: object;
  containerStyle?: object;
}

const Header: React.FC<HeaderProps> = ({
  pageName,
  contentStyle,
  containerStyle,
  children,
}) => {
  const { goBack } = useHistory();

  return (
    <Container>
      <PageHeader style={containerStyle}>
        <TopbarContainer>
          <button type="button" onClick={goBack}>
            <img src={backIcon} alt="Voltar" />
          </button>
          <h1>{pageName}</h1>
          <Link to="/landing">
            <img src={logoImg} alt="Proffy" />
          </Link>
        </TopbarContainer>

        <HeaderContent style={contentStyle}>{children}</HeaderContent>
      </PageHeader>
    </Container>
  );
};

export default Header;
