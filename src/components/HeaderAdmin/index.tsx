import React from 'react';

import { FiBriefcase, FiBarChart2 } from 'react-icons/fi';
import { FaMoneyBillWave } from 'react-icons/fa';
import { CgFeed } from 'react-icons/cg';

import { Container, LogoArea, MenuItem } from './styles';

import logo from '../../assets/images/logo.png';

const HeaderAdmin: React.FC = () => {
  return (
    <Container>
      <LogoArea>
        <img src={logo} alt="Logo sistema" />
      </LogoArea>
      <MenuItem to="/admin/reports" activeClassName="selected">
        <FiBarChart2 width={20} />
        Relatórios
      </MenuItem>
      <MenuItem to="/admin/packages" activeClassName="selected">
        <FiBriefcase width={20} />
        Pacotes
      </MenuItem>
      <MenuItem to="/admin/payment" activeClassName="selected">
        <FaMoneyBillWave width={20} />
        Pagamentos
      </MenuItem>
      <MenuItem to="/landing" activeClassName="selected">
        <CgFeed width={20} />
        Feed
      </MenuItem>
    </Container>
  );
};

export default HeaderAdmin;
