import React from 'react';
import { FiBriefcase, FiHome, FiUsers } from 'react-icons/fi';

import { Container, LogoArea, MenuItem } from './styles';

import logo from '../../assets/images/logo.svg';

const HeaderCompany: React.FC = () => {
  return (
    <Container>
      <LogoArea>
        <img src={logo} alt="Logo sistema" />
      </LogoArea>
      <MenuItem to="/company/landing">
        <FiHome width={20} />
        Início
      </MenuItem>
      <MenuItem to="/company/jobs">
        <FiBriefcase width={20} />
        Vagas
      </MenuItem>
      <MenuItem to="/company/applications">
        <FiUsers width={20} />
        Candidaturas
      </MenuItem>
    </Container>
  );
};

export default HeaderCompany;
