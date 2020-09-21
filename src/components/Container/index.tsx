import React from 'react';

import { ContainerGlobal } from './styles';

const Container: React.FC = ({ children }) => {
  return <ContainerGlobal>{children}</ContainerGlobal>;
};

export default Container;
