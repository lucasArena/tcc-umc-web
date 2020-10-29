import React, { useCallback, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { cpf } from 'cpf-cnpj-validator';
import * as Yup from 'yup';

import { parseISO, isValid } from 'date-fns';
import {
  Container,
  ProfileInfo,
  AvatarContainer,
  Form,
  InputGroup,
} from './styles';

import warningIcon from '../../assets/images/icons/warning.svg';
import backgroundThings from '../../assets/images/background-things.svg';

import Header from '../../components/Header';

import Input from '../../components/Input';
import InputFile from '../../components/InputFile';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import InputMask from '../../components/InputMask';
import InputMoney from '../../components/InputMoney';
import getValidationErrors from '../../utils/getValidationErrors';

interface FormProps {
  name: string;
  surname: string;
  email: string;
  born: string;
  cpf: string;
  nationality: string;
  bio: string;
  salary_expectations: string;
  contract: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { push } = useHistory();

  const handleSubmit = useCallback(async (data: FormProps) => {
    const formattedSalaryExpectations = data.salary_expectations
      .replace(/\s/g, '')
      .replace(/\./g, '')
      .replace(/,/g, '.');

    const formattedCPF = data.cpf.replace(/\D/g, '');
    const formattedBorn = data.born.split('/').reverse().join('-');

    const dataFormatted = {
      name: data.name.replace(/\s/g, ''),
      surname: data.name.replace(/\s/g, ''),
      email: data.name.replace(/\s/g, ''),
      bio: data.name.replace(/\s/g, ''),
      contract: data.name.replace(/\s/g, ''),
      cpf: formattedCPF,
      born: formattedBorn,
      salary_expectations: formattedSalaryExpectations,
    };

    try {
      formRef.current?.setErrors([]);
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        surname: Yup.string().required('Sobrenome obrigatório'),
        email: Yup.string()
          .email('Email inválido')
          .required('Nome obrigatório'),
        // born: Yup.string().required('Data de nascimento obrigatória'),
        born: Yup.string().test(
          'born_date',
          'born_date_must_be_a_valid_date',
          function testDateValid(bornDate) {
            if (!bornDate) {
              return false;
            }

            const isValidDate = parseISO(bornDate);

            if (!isValid(isValidDate)) {
              return false;
            }

            return true;
          },
        ),
        cpf: Yup.string()
          .test('cpf_validate', 'check_if_cpf_is_valid', function isValidCPF(
            checkCPF,
          ) {
            if (!checkCPF) {
              return false;
            }

            if (!cpf.isValid(checkCPF)) {
              return false;
            }

            return true;
          })
          .required('CPF obrigatório'),
        civil_status: Yup.string().required('Estado cívil obrigatória'),
        nationality: Yup.string().required('Nacionalidade obrigatória'),
        bio: Yup.string().required('Apresentação obrigatória'),
        salary_expectations: Yup.string().required(
          'Pretensão salarial obrigatória',
        ),
        contract: Yup.string().required('Contrato obrigatória'),
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
  }, []);

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
            <Input label="Email" name="email" id="email" width="75%" />
            <InputMask
              mask="99/99/9999"
              label="Data de nascimento"
              name="born"
              id="born"
              width="25%"
            />
          </InputGroup>

          <InputGroup>
            <InputMask
              mask="999.999.999-99"
              label="CPF"
              name="cpf"
              id="cpf"
              width="40%"
            />
            <Select
              label="Estado civil"
              name="civil_status"
              id="civil_status"
              width="30%"
              placeholder="Selecione"
              options={[
                { value: 'Solteiro', label: 'Solteiro' },
                { value: 'Casado', label: 'Casado' },
                { value: 'Divorciado', label: 'Divorciado' },
                {
                  value: 'Separado judicialmente',
                  label: 'Separado judicialmente',
                },
                { value: 'Viúvo', label: 'Viúvo' },
              ]}
            />

            <Select
              label="Nacionalidade"
              name="nationality"
              id="nationality"
              width="30%"
              placeholder="Selecione"
              options={[
                { value: 'Brasil', label: 'Brasil' },
                { value: 'Estados Unidos', label: 'Estados Unidos' },
              ]}
            />
          </InputGroup>
        </fieldset>

        <fieldset>
          <legend>Informações para empresas</legend>
          <Textarea label="Apresentação" id="bio" name="bio" />

          <InputGroup>
            <InputMoney
              prefix="R$"
              label="Pretensão salarial"
              id="salary_expectations"
              name="salary_expectations"
            />

            <Select
              label="Contrato"
              id="contract"
              name="contract"
              placeholder="Selecione"
              options={[
                { value: 'CLT', label: 'CLT' },
                { value: 'PJ', label: 'PJ' },
              ]}
            />
            <InputFile
              imageAlt="Upload do currículo"
              id="resume"
              name="resume"
              description="Coloque seu currículo"
            />
          </InputGroup>
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
