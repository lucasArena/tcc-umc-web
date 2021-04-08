import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { BsPerson } from 'react-icons/bs';
import { BiBuilding } from 'react-icons/bi';
import { RiAdminLine } from 'react-icons/ri';

import logo from '../../assets/images/logo.svg';

import {
  Container,
  LogoContainer,
  ProfileArea,
  DropDown,
  DropDownItem,
  DropDownItemButton,
} from './styles';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { push } = useHistory();
  const { user, signOut } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);

  const handleSignOut = useCallback(() => {
    signOut();

    push('/');
  }, [push, signOut]);

  const handleMenu = useCallback(() => {
    setOpenMenu(!openMenu);
  }, [openMenu]);

  const linkProfile = useMemo(() => {
    switch (user.profile_type) {
      case 'App\\ApplicantEloquent':
        return '/profile/applicant';
      case 'App\\CompanyEloquent':
        return '/profile/company';
      case 'App\\AdminEloquent':
        return '/profile/admin';
      default:
        return '/profile/applicant';
    }
  }, [user]);

  const isCompany = useMemo(() => {
    return user.profile_type === 'App\\CompanyEloquent';
  }, [user]);

  const isApplicant = useMemo(() => {
    return user.profile_type === 'App\\ApplicantEloquent';
  }, [user]);

  const isAdmin = useMemo(() => {
    return user.profile_type === 'App\\AdminEloquent';
  }, [user]);

  return (
    <Container>
      <menu>
        <LogoContainer to="/">
          <img src={logo} alt="Logo aplicação" />
        </LogoContainer>

        <ProfileArea onClick={handleMenu}>
          <img
            src={
              user.avatar_url
                ? user.avatar_url
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD6o4MplGmPR_M3Z_mSwecQ3cKlpZzaJOyhQ&usqp=CAU'
            }
            alt={user.name}
          />

          <DropDown isOpen={openMenu}>
            <DropDownItem to={linkProfile}>
              <BsPerson size={20} color="#E6E6F0" />
              <span>Meu perfil</span>
            </DropDownItem>

            {isApplicant && (
              <DropDownItem to="/applicant/applications">
                <BiBuilding size={20} color="#E6E6F0" />
                <span>Candidaturas</span>
              </DropDownItem>
            )}

            {isCompany && (
              <DropDownItem to="/company/landing">
                <BiBuilding size={20} color="#E6E6F0" />
                <span>Área do anunciante</span>
              </DropDownItem>
            )}

            {isAdmin && (
              <DropDownItem to="/admin/packages">
                <RiAdminLine size={20} color="#E6E6F0" />
                <span>Área do admin</span>
              </DropDownItem>
            )}

            <DropDownItemButton onClick={handleSignOut}>
              <FiLogOut size={20} color="#E6E6F0" />
              <span>Sair</span>
            </DropDownItemButton>
          </DropDown>
        </ProfileArea>
      </menu>
    </Container>
  );
};

export default Header;
