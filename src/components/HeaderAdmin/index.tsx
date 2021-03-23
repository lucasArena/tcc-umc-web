import React from 'react';

import { FiBriefcase, FiHome, FiUsers } from 'react-icons/fi';
import { CgFeed } from 'react-icons/cg';

import { Container, LogoArea, MenuItem } from './styles';

import logo from '../../assets/images/logo.png';

const HeaderCompany: React.FC = () => {
  return (
    <Container>
      <LogoArea>
        <img src={logo} alt="Logo sistema" />
      </LogoArea>
      <MenuItem to="/company/landing" activeClassName="selected">
        <FiHome width={20} />
        Início
      </MenuItem>
      <MenuItem to="/company/jobs" activeClassName="selected">
        <FiBriefcase width={20} />
        Vagas
      </MenuItem>
      <MenuItem to="/company/applications" activeClassName="selected">
        <FiUsers width={20} />
        Candidaturas
      </MenuItem>
      <MenuItem to="/landing" activeClassName="selected">
        <CgFeed width={20} />
        Feed
      </MenuItem>
    </Container>
  );
};

export default HeaderCompany;
