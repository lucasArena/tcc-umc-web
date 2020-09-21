import React, { useCallback } from 'react';

import { Container, ClassesList, ClassesListItem } from './styles';

import whatsappImg from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

interface TeacherItemProps {
  user_id: string;
  avatar: string;
  name: string;
  subject: string;
  description: string;
  whatsapp: string;
  hourPrice: number;
}
const TeacherItem: React.FC<TeacherItemProps> = ({
  user_id,
  avatar,
  name,
  subject,
  description,
  whatsapp,
  hourPrice,
}) => {
  const handleCreateConnection = useCallback(async () => {
    await api.post('/connections', {
      user_id,
    });
  }, [user_id]);

  return (
    <Container>
      <header>
        <img src={avatar} alt={name} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{description}</p>
      <ClassesList>
        <ClassesListItem disabled>
          <div>
            <span>Dia</span>
            <strong>Segunda</strong>
          </div>

          <div>
            <span>Horário</span>
            <strong>8h - 18h</strong>
          </div>
        </ClassesListItem>

        <ClassesListItem>
          <div>
            <span>Dia</span>
            <strong>Terça</strong>
          </div>

          <div>
            <span>Horário</span>
            <strong>8h - 18h</strong>
          </div>
        </ClassesListItem>

        <ClassesListItem>
          <div>
            <span>Dia</span>
            <strong>Quarta</strong>
          </div>

          <div>
            <span>Horário</span>
            <strong>8h - 18h</strong>
          </div>
        </ClassesListItem>

        <ClassesListItem>
          <div>
            <span>Dia</span>
            <strong>Quinta</strong>
          </div>

          <div>
            <span>Horário</span>
            <strong>8h - 18h</strong>
          </div>
        </ClassesListItem>
        <ClassesListItem>
          <div>
            <span>Dia</span>
            <strong>Quinta</strong>
          </div>

          <div>
            <span>Horário</span>
            <strong>8h - 18h</strong>
          </div>
        </ClassesListItem>
      </ClassesList>
      <footer>
        <p>
          Preço/hora
          <strong>
            R$
            {hourPrice}
          </strong>
        </p>
        <a
          href={`https://wa.me/${whatsapp}`}
          target="blank"
          onClick={handleCreateConnection}
        >
          <img src={whatsappImg} alt="Botão de Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </Container>
  );
};

export default TeacherItem;
