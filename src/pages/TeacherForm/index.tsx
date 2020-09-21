import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import {
  Container,
  HeaderContent,
  Form,
  InputGroup,
  UserInfo,
  ScheduleArea,
  DeleteScheduleArea,
} from './styles';

import warningIcon from '../../assets/images/icons/warning.svg';
import rocketIcon from '../../assets/images/icons/rocket.svg';

import Header from '../../components/Header';

import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import InputMask from '../../components/InputMask';
import InputMoney from '../../components/InputMoney';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

interface ScheduleProps {
  days: { value: string; label: string }[];
  week_day: string;
  from: Date;
  to: Date;
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

const TeacherForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [notUsedDays] = useState([
    { value: '0', label: 'Domingo' },
    { value: '1', label: 'Segunda-feira' },
    { value: '2', label: 'Terça-feira' },
    { value: '3', label: 'Quarta-feira' },
    { value: '4', label: 'Quinta-feira' },
    { value: '5', label: 'Sexta-feira' },
    { value: '6', label: 'Sabádo' },
  ]);
  const history = useHistory();

  const [scheduleClasses, setScheduleClasses] = useState<ScheduleProps[]>([
    { days: notUsedDays, week_day: '', from: new Date(), to: new Date() },
  ]);

  const addNewScheduleItem = useCallback(() => {
    const formData = formRef.current?.getData() as FormProps;
    const usedDaysArray = formData.schedule.map(
      (scheduleItem) => scheduleItem.week_day,
    );

    const availableWeekDays = notUsedDays.filter(
      (day) => !usedDaysArray.includes(day.value),
    );

    setScheduleClasses((oldScheduleClasses) => [
      ...oldScheduleClasses,
      {
        days: availableWeekDays,
        week_day: '',
        from: new Date(),
        to: new Date(),
      },
    ]);
  }, [notUsedDays]);

  const handleRemoveSchedule = useCallback(
    (scheduleClass: ScheduleProps, index: number) => {
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

  const handleSubmit = useCallback(async (data: FormProps) => {
    try {
      formRef.current?.setErrors([]);
      const formattedCost = data.cost.replace(/\./g, '').replace(/,/g, '.');
      const formattedWhatsapp = data.whatsapp.replace(/\D/g, '');
      const formattedData = {
        ...data,
        cost: formattedCost,
        whatsapp: formattedWhatsapp,
      };

      const schema = Yup.object().shape({
        whatsapp: Yup.string().required('Número do whatsapp obrigatório'),
        bio: Yup.string().required('Biografia obrigatória'),
        subject: Yup.string().required('Matéria obrigatória'),
        cost: Yup.string().required('Custo obrigatório'),
        schedule: Yup.array().of(
          Yup.object().shape({
            week_day: Yup.number().required('Dia da semana obrigatório'),
            from: Yup.string()
              .test(
                'start_time_test',
                'End time must be before start time',
                function testStartTime(fromField) {
                  const startHour = fromField;
                  if (startHour) {
                    return startHour < this.parent.to;
                  }

                  return false;
                },
              )
              .required('Horário de início obrigatório'),
            to: Yup.string().required('Horário de encerramento obrigatório'),
          }),
        ),
      });

      await schema.validate(formattedData, {
        abortEarly: false,
      });

      // await api.post('/classes', {
      //   ...data,
      // });
      // history.push('/success', {
      //   title: 'Cadastro salvo!',
      //   description:
      //     'Tudo certo, seu cadastro está na nossa lista de professores. Agora é só ficar de olho no seu WhatsApp.',
      //   redirectTo: '/landing',
      //   buttonText: 'Acessar',
      // });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Header
        pageName="Dar aulas"
        containerStyle={{
          height: '360px',
        }}
      >
        <HeaderContent>
          <strong>Que incrível que você quer dar aula</strong>
          <p>O primeiro passo é preencher esse formulário de inscrição</p>
          <aside>
            <img src={rocketIcon} alt="Imagem auxiliar" />
            <span>
              <span>Preparare-se!</span>
              <br />
              <span>vai ser o máximo.</span>
            </span>
          </aside>
        </HeaderContent>
      </Header>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <fieldset>
          <legend>Seus dados</legend>

          <InputGroup>
            <UserInfo>
              <img
                src="https://avatars0.githubusercontent.com/u/33403869?s=460&u=01d807797bdea2abc57e296b5eac9a45d3785cc0&v=4"
                alt="Lucas Arena"
              />
              <span>Lucas Arena</span>
            </UserInfo>
            <InputMask
              mask="(99) 99999-9999"
              width="35%"
              label="WhatsApp"
              name="whatsapp"
              id="whatsapp"
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
              options={[
                { value: 'Química', label: 'Química' },
                { value: 'Matématica', label: 'Matématica' },
                { value: 'Física', label: 'Física' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'História', label: 'História' },
              ]}
            />
            <InputMoney
              label="Custo da sua hora por aula"
              name="cost"
              id="cost"
              width="50%"
              placeholder="0,00"
              prefix="R$"
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
                <ScheduleArea key={scheduleClass.week_day}>
                  <Select
                    label="Dia da semana"
                    placeholder="Selecione o dia"
                    name={`schedule[${index}][week_day]`}
                    options={scheduleClass.days}
                  />
                  <InputMask
                    label="Das"
                    name={`schedule[${index}][from]`}
                    mask={[
                      /^([0-1])/,
                      /[0-9]|2[0-4]/,
                      ':',
                      /([0-5])/,
                      /([0-9])$/,
                    ]}
                  />
                  <InputMask
                    label="Até"
                    name={`schedule[${index}][to]`}
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
                    onClick={() => handleRemoveSchedule(scheduleClass, index)}
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

export default TeacherForm;
