import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import { Container, ProfileArea, Logout } from './styles';
import { useAuth } from '../../hooks/auth';

interface HeaderProps {
  pageName?: string;
  contentStyle?: object;
  containerStyle?: object;
}

const Header: React.FC = () => {
  const { push } = useHistory();
  const { signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();

    push('/');
  }, [push, signOut]);

  return (
    <Container>
      <menu>
        <ProfileArea to="/profile">
          <img
            src="https://avatars0.githubusercontent.com/u/33403869?s=460&u=01d807797bdea2abc57e296b5eac9a45d3785cc0&v=4"
            alt="Lucas Arena"
          />
          <span>Lucas Arena</span>
        </ProfileArea>
        <Logout to="/" onClick={handleSignOut}>
          <FiPower size={20} color="#E6E6F0" />
        </Logout>
      </menu>
    </Container>
  );
};

export default Header;
