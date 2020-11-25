import React, { useCallback, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import { Container, ProfileArea, Right, Logout } from './styles';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { push } = useHistory();
  const { user, signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();

    push('/');
  }, [push, signOut]);

  const linkProfile = useMemo(() => {
    return user.profile_type === 'App\\Applicant'
      ? '/profile/applicant'
      : '/profile/company';
  }, [user]);

  const isCompany = useMemo(() => {
    return user.profile_type === 'App\\Company';
  }, [user]);

  return (
    <Container>
      <menu>
        <ProfileArea to={linkProfile}>
          <img
            src={
              user.avatar_url ||
              'https://avatars0.githubusercontent.com/u/33403869?s=460&u=01d807797bdea2abc57e296b5eac9a45d3785cc0&v=4'
            }
            alt={user.name}
          />
          <span>{user.name}</span>
        </ProfileArea>

        <Right>
          {isCompany && <Link to="/company/landing">Área do anunciante</Link>}
          <Logout to="/" onClick={handleSignOut}>
            <FiPower size={20} color="#E6E6F0" />
          </Logout>
        </Right>
      </menu>
    </Container>
  );
};

export default Header;
