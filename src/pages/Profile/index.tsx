import React, { useCallback, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  Container,
  ProfileInfo,
  AvatarContainer,
  Form,
  InputGroup,
  ScheduleArea,
  DeleteScheduleArea,
} from './styles';

import warningIcon from '../../assets/images/icons/warning.svg';
import backgroundThings from '../../assets/images/background-things.svg';

import Header from '../../components/Header';

import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import InputMask from '../../components/InputMask';
import InputMoney from '../../components/InputMoney';
import getValidationErrors from '../../utils/getValidationErrors';

interface ScheduleProps {
  week_day: string;
  from: string;
  to: string;
  options: { value: string; label: string }[];
}

interface FormProps {
  name: string;
  bio: string;
  whatsapp: string;
  avatar: string;
  cost: string;
  subject: string;
  schedule: ScheduleProps[];
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { push } = useHistory();

  const [days] = useState([
    { value: '0', label: 'Domingo' },
    { value: '1', label: 'Segunda-feira' },
    { value: '2', label: 'Terça-feira' },
    { value: '3', label: 'Quarta-feira' },
    { value: '4', label: 'Quinta-feira' },
    { value: '5', label: 'Sexta-feira' },
    { value: '6', label: 'Sabádo' },
  ]);
  const [scheduleClasses, setScheduleClasses] = useState<ScheduleProps[]>([
    { options: days, week_day: '', from: '', to: '' },
  ]);

  const addNewScheduleItem = useCallback(() => {
    const { schedule } = formRef.current?.getData() as FormProps;
    const usedDaysArray = schedule.map((dayItem) => dayItem.week_day);
    const notUsedDays = days.filter(
      (day) => !usedDaysArray.includes(day.value),
    );

    setScheduleClasses((oldScheduleClasses) => [
      ...oldScheduleClasses,
      { options: notUsedDays, week_day: '', from: '', to: '' },
    ]);
  }, [days]);

  const handleRemoveSchedule = useCallback(
    (index: number) => {
      const scheduleRemoved = scheduleClasses.filter(
        (_, scheduleItemIndex) => scheduleItemIndex !== index,
      );

      if (!scheduleRemoved.length) {
        return;
      }

      setScheduleClasses(scheduleRemoved);
    },
    [scheduleClasses],
  );

  const handleSubmit = useCallback(
    async (data: FormProps) => {
      const formattedCost = data.cost.replace(/\./g, '').replace(/\,/g, '.');
      const formattedWhatsapp = data.whatsapp.replace(/\D/g, '');
      const dataFormatted = {
        ...data,
        cost: formattedCost,
        whatsapp: formattedWhatsapp,
      };

      try {
        formRef.current?.setErrors([]);
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          surname: Yup.string().required('Sobrenome obrigatório'),
          email: Yup.string()
            .email('Email inválido')
            .required('Nome obrigatório'),
          whatsapp: Yup.string()
            .min(11, 'Whatsapp inválido')
            .required('Whatsapp obrigatório'),
          bio: Yup.string().required('Whatsapp obrigatório'),
          subject: Yup.string().required('Matéria obrigatório'),
          cost: Yup.number().required('Custo obrigátorio'),
          schedule: Yup.array().of(
            Yup.object().shape({
              week_day: Yup.string().required('Dia da semana obrigatório'),
              from: Yup.string()
                .test(
                  'start_time_test',
                  'starttime_must_be_greater_than_end_time_',
                  function testStartTime(startTimeValue) {
                    const { to: endTimeValue } = this.parent;

                    if (startTimeValue) {
                      return endTimeValue > startTimeValue;
                    }

                    return false;
                  },
                )
                .required('Horário de início obrigatório'),
              to: Yup.string().required('Horário de fim obrigatório'),
            }),
          ),
        });

        await schema.validate(dataFormatted, {
          abortEarly: false,
        });
        console.log(dataFormatted);
        // await api.post('/classes', {
        //   ...dataFormatted,
        // });
        // push('/landing');
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    },
    [push],
  );

  return (
    <Container>
      <Header
        pageName="Meu perfil"
        containerStyle={{
          height: '535px',
          backgroundImage: `url(${backgroundThings})`,
          backgroundSize: 'contain',
        }}
      >
        <ProfileInfo>
          <AvatarContainer htmlFor="avatar">
            <img
              src="https://avatars0.githubusercontent.com/u/33403869?s=460&u=01d807797bdea2abc57e296b5eac9a45d3785cc0&v=4"
              alt="Lucas Arena"
            />
            <div>
              <FiCamera />
            </div>
            <input type="file" id="avatar" />
          </AvatarContainer>

          <h2>Lucas Arena</h2>
          <span>Programação</span>
        </ProfileInfo>
      </Header>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <fieldset>
          <legend>Seus dados</legend>
          <InputGroup>
            <Input label="Nome" name="name" id="name" />
            <Input label="Sobrenome" name="surname" id="surname" />
          </InputGroup>
          <InputGroup>
            <Input label="Email" name="email" id="email" width="65%" />
            <InputMask
              mask="(99) 99999-9999"
              label="WhatsApp"
              name="whatsapp"
              id="whatsapp"
              width="35%"
            />
          </InputGroup>

          <Textarea label="Biografia" name="bio" id="bio" />
        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>

          <InputGroup>
            <Select
              label="Matéria"
              placeholder="Matéria"
              name="subject"
              id="subject"
              width="65%"
              options={days}
            />
            <InputMoney
              placeholder="0,00"
              label="Custo da sua hora por aula"
              name="cost"
              prefix="R$"
              id="cost"
              width="35%"
            />
          </InputGroup>
        </fieldset>

        <fieldset>
          <legend>
            Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}>
              + Novo horário
            </button>
          </legend>

          {scheduleClasses.map((scheduleClass, index) => {
            return (
              <div key={index}>
                <ScheduleArea>
                  <Select
                    label="Dia da semana"
                    placeholder="Selecione o dia desejado"
                    name={`schedule[${index}][week_day]`}
                    options={scheduleClass.options}
                  />
                  <InputMask
                    name={`schedule[${index}][from]`}
                    label="Das"
                    mask={[
                      /^([0-1])/,
                      /[0-9]|2[0-4]/,
                      ':',
                      /([0-5])/,
                      /([0-9])$/,
                    ]}
                  />
                  <InputMask
                    name={`schedule[${index}][to]`}
                    label="Até"
                    mask={[
                      /^([0-1])/,
                      /[0-9]|2[0-4]/,
                      ':',
                      /([0-5])/,
                      /([0-9])$/,
                    ]}
                  />
                </ScheduleArea>
                <DeleteScheduleArea>
                  <hr />
                  <button
                    type="button"
                    onClick={() => handleRemoveSchedule(index)}
                  >
                    Excluir horário
                  </button>
                  <hr />
                </DeleteScheduleArea>
              </div>
            );
          })}
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante
            <br />
            Preencha todos os dados
          </p>
          <button type="submit">Salvar cadastro</button>
        </footer>
      </Form>
    </Container>
  );
};

export default Profile;
