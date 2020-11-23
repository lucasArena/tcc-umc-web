import React from 'react';

import { Container, TabTitle } from './styles';

interface TabProps {
  title: string;
  selected: boolean | false;
}

const Tab: React.FC<TabProps> = ({ children, title, selected }) => {
  return (
    <Container selected={selected}>
      <TabTitle selected>{title}</TabTitle>
      {children}
    </Container>
  );
};

export default Tab;
