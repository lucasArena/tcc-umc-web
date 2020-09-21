import React, { useCallback, useState } from 'react';

import {
  Container,
  HeaderContent,
  Form,
  ListTeacher,
  NoResult,
} from './styles';

import smileIcon from '../../assets/images/icons/smile.svg';

import Header from '../../components/Header';
import TeacherItem from '../../components/TeacherItem';
import InputMask from '../../components/InputMask';
import Select from '../../components/Select';
import api from '../../services/api';

interface TeacherProps {
  id: string;
  user: {
    id: string;
    name: string;
    bio: string;
    avatar: string;
    whatsapp: string;
  };
  cost: number;
  subject: string;
}

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherProps[]>([]);

  const handleFilter = useCallback(async (dataFilters) => {
    const responseTeachers = await api.get('/classes', {
      params: {
        ...dataFilters,
      },
    });

    setTeachers(responseTeachers.data);
  }, []);

  return (
    <Container>
      <Header
        pageName="Estudar"
        contentStyle={{
          minHeight: '250px',
          justifyContent: 'center',
        }}
      >
        <HeaderContent>
          <strong>Estes são os proffys disponíveis</strong>
          <aside>
            <img src={smileIcon} alt="Vai ser um máximo" />
            <span>
              <span>Preparare-se!</span>
              <br />
              <span>vai ser o máximo.</span>
            </span>
          </aside>
        </HeaderContent>
        <Form onSubmit={handleFilter}>
          <Select
            label="Matéria"
            id="subject"
            name="subject"
            placeholder="Selecione"
            options={[
              { value: 'Química', label: 'Química' },
              { value: 'Matématica', label: 'Matématica' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
            ]}
          />
          <Select
            label="Dia da semana"
            id="week_day"
            name="week_day"
            placeholder="Selecione"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sabádo' },
            ]}
          />
          <InputMask
            label="Hora"
            name="time"
            id="time"
            mask={[/^([0-1])/, /[0-9]|2[0-4]/, ':', /([0-5])/, /([0-9])$/]}
          />
          <button type="submit">Buscar</button>
        </Form>
      </Header>

      <ListTeacher>
        {teachers.length ? (
          teachers.map((teacher) => (
            <TeacherItem
              key={teacher.id}
              user_id={teacher.user.id}
              avatar={teacher.user.avatar}
              name={teacher.user.name}
              subject={teacher.subject}
              description={teacher.user.bio}
              hourPrice={teacher.cost}
              whatsapp={teacher.user.whatsapp}
            />
          ))
        ) : (
            <NoResult>
              <span>Nenhum professor encontrado com sua pesquisa.</span>
            </NoResult>
          )}
      </ListTeacher>
    </Container>
  );
};

export default TeacherList;
