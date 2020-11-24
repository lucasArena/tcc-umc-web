import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
} from 'react';
import { FiCamera, FiUpload } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import * as Yup from 'yup';
import { PDFViewer } from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import { parseISO, isValid, format } from 'date-fns';
import {
  Container,
  ProfileInfo,
  AvatarContainer,
  Form,
  UploadResumeContainer,
} from './styles';

import warningIcon from '../../assets/images/icons/warning.svg';

import Header from '../../components/Header';

import InputGroup from '../../components/InputGroup';
import Input from '../../components/Input';
import InputFile from '../../components/InputFile';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';
import InputMask from '../../components/InputMask';
import InputMoney from '../../components/InputMoney';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface FormProps {
  name: string;
  email: string;
  avatar_url: string;
  born: string;
  cpf: string;
  country_id: string;
  bio: string;
  civil_state: string;
  salary_expectations: string;
  contract: string;
  gender: string;
  resume_url: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const [id] = useState(user.id);
  const [userData, setUserData] = useState<FormProps>({} as FormProps);

  const handleSubmit = useCallback(
    async (data: FormProps) => {
      const formattedSalaryExpectations = data.salary_expectations
        .replace(/\s/g, '')
        .replace(/\./g, '')
        .replace(/,/g, '.');

      const formattedCPF = data.cpf.replace(/[A-Za-z]\s/g, '');
      const formattedBorn = data.born.split('/').reverse().join('-');

      const dataFormatted = {
        name: data.name.replace(/[^a-zA-Z ]+/g, ''),
        email: data.email,
        bio: data.bio,
        contract: data.contract,
        cpf: formattedCPF,
        born: formattedBorn,
        salary_expectations: formattedSalaryExpectations,
        country_id: data.country_id,
        civil_state: data.civil_state,
      };

      try {
        formRef.current?.setErrors([]);
        const schema = Yup.object().shape({
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
            .test(
              'cpf_validate',
              'check_if_cpf_is_valid',
              function isValidCPF(checkCPF) {
                if (!checkCPF) {
                  return false;
                }

                if (!cpfValidator.isValid(checkCPF)) {
                  return false;
                }

                return true;
              },
            )
            .required('CPF obrigatório'),
          civil_state: Yup.string().required('Estado cívil obrigatória'),
          country_id: Yup.string().required('Nacionalidade obrigatória'),
          bio: Yup.string().required('Apresentação obrigatória'),
          salary_expectations: Yup.string().required(
            'Pretensão salarial obrigatória',
          ),
          contract: Yup.string().required('Contrato obrigatória'),
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Email inválido')
            .required('Nome obrigatório'),
        });

        await schema.validate(dataFormatted, {
          abortEarly: false,
        });

        const userUpdated = await api.put(`/users/${id}`, {
          name: dataFormatted.name,
          email: dataFormatted.email,
          country_id: dataFormatted.country_id,
          profile: {
            country_id: dataFormatted.country_id,
            bio: dataFormatted.bio,
            contract: dataFormatted.contract,
            cpf: dataFormatted.cpf,
            born: dataFormatted.born,
            salary_expectations: dataFormatted.salary_expectations,
            civil_state: dataFormatted.civil_state,
            gender: 'M',
          },
        });

        updateUser(userUpdated.data);

        addToast({
          title: 'Successo',
          description: 'Usuário atualizado com sucesso',
          type: 'success',
        });
      } catch (err) {
        addToast({
          title: 'Erro',
          description: 'Erro ao tentar atualizar o cadastro',
          type: 'error',
        });
      }
    },
    [id, addToast, updateUser],
  );

  const handleGetUser = useCallback(async () => {
    try {
      const responseUserData = await api.get(`/users/${id}`);

      const userInfo = responseUserData.data;

      const {
        name,
        email,
        avatar_url,
        profile: {
          gender,
          country_id,
          cpf,
          born,
          bio,
          civil_state,
          salary_expectations,
          contract,
          resume_url,
        },
      } = userInfo;

      setUserData({
        name,
        email,
        avatar_url,
        country_id,
        gender,
        cpf,
        born: born && format(parseISO(born), 'dd/M/Y'),
        bio,
        civil_state,
        salary_expectations,
        contract,
        resume_url,
      });
    } catch (err) {
      console.log(err);
      addToast({
        title: 'Erro',
        description: 'Erro ao tentar resgatar os dados do usuário',
        type: 'error',
      });
    }
  }, [id, addToast]);

  const handleAvatarUpdate = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const formAvatar = new FormData();

        formAvatar.append('image', e.target.files[0]);

        const response = await api.post(`/avatar/${id}`, formAvatar);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado!',
        });
      }
    },
    [id, updateUser, addToast],
  );

  const handleUpdateResume = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const resumeFormData = new FormData();

        resumeFormData.append('image', e.target.files[0]);

        const response = await api.post(`/users/${id}/resume`, resumeFormData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Currículo atualizado com sucesso',
        });
      }
    },
    [id],
  );

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <Container>
      <Header />

      <ProfileInfo>
        <AvatarContainer htmlFor="avatar">
          <input type="file" id="avatar" onChange={handleAvatarUpdate} />
          <img
            src={
              user.avatar_url ||
              'https://avatars0.githubusercontent.com/u/33403869?s=460&u=01d807797bdea2abc57e296b5eac9a45d3785cc0&v=4'
            }
            alt={user.name}
          />
          <div>
            <FiCamera />
          </div>
        </AvatarContainer>

        <h2>{user.name}</h2>
      </ProfileInfo>
      <Form onSubmit={handleSubmit} ref={formRef} initialData={userData}>
        <fieldset>
          <legend>Seus dados</legend>
          <InputGroup>
            <Input label="Nome" name="name" id="name" />
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
              name="civil_state"
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
              name="country_id"
              id="nationality"
              width="30%"
              placeholder="Selecione"
              options={[
                { value: '1', label: 'Brasil' },
                { value: '2', label: 'Estados Unidos' },
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
              width="50%"
            />

            <Select
              label="Contrato"
              id="contract"
              name="contract"
              placeholder="Selecione"
              width="50%"
              options={[
                { value: 'CLT', label: 'CLT' },
                { value: 'PJ', label: 'PJ' },
              ]}
            />
          </InputGroup>
        </fieldset>

        <fieldset>
          <legend>Curriculo</legend>
          {/* <PDFViewer> */}
          <InputGroup>
            <UploadResumeContainer>
              <label htmlFor="resume">
                <span>Upload do currículo</span>
                <FiUpload />
                <input
                  type="file"
                  id="resume"
                  accept="application/pdf,application/vnd.ms-excel"
                  onChange={handleUpdateResume}
                />
              </label>
            </UploadResumeContainer>
            {/* <InputFile
              imageAlt="Upload do currículo"
              id="resume"
              name="resume"
              description="Coloque seu currículo"
            /> */}
          </InputGroup>

          <InputGroup>
            <Document file={user.profile.resume_url}>
              <Page width={620} pageNumber={1} />
            </Document>
          </InputGroup>
          {/* </PDFViewer> */}
        </fieldset>
        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante
            <br />
            Preencha todos os dados
          </p>
          <button type="submit">Atualizar</button>
        </footer>
      </Form>
    </Container>
  );
};

export default Profile;
