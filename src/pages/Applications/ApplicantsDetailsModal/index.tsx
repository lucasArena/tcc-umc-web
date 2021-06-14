import React from 'react';
import { FiDownload } from 'react-icons/fi';

import Modal from '../../../components/Modal';
import Button from '../../../components/Button';

import {
  ApplicantList,
  ApplicantItem,
  ApplicantInfo,
  LabelStatusApplication,
  ShowResumeButton,
  ApplicantDetails,
  ApplicantDetailsProfessional,
  ApplicantDetailsGroup,
  ApplicantActions,
} from './styles';

interface Application {
  id: number;
  applicant: {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    avatar_url: string;
    profile: {
      bio: string;
      contract: string;
      salary_expectations: string;
      born: string;
      civil_state: string;
      resume_url: string;
    };
  };
  status: {
    id: number;
    name: 'Aprovado' | 'Reprovado' | 'Pendente';
  };
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleChangeStatusApplication: (
    application_id: number,
    status_id: number,
  ) => void;
  applications: Application[];
  style: Object;
}

const ApplicantsDetailsModal: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleChangeStatusApplication,
  applications,
  style,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} style={{ height: '90vh' }}>
      <h1>Candidatos para a vaga</h1>

      <ApplicantList>
        {applications.map((application) => (
          <ApplicantItem key={application.id}>
            <ApplicantInfo>
              <header>
                <img
                  src={
                    application.applicant.avatar
                      ? application.applicant.avatar_url
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD6o4MplGmPR_M3Z_mSwecQ3cKlpZzaJOyhQ&usqp=CAU'
                  }
                  alt={application.applicant.name}
                />
                <h4>{application.applicant.name}</h4>

                <LabelStatusApplication type={application.status.name}>
                  <h5>{application.status.name}</h5>
                </LabelStatusApplication>
                <ShowResumeButton
                  to={{
                    pathname: application.applicant.profile.resume_url,
                  }}
                  target="_blank"
                >
                  <span>Abrir CV</span>
                  <FiDownload width={20} />
                </ShowResumeButton>
              </header>

              <main>
                <section>
                  <h3>Dados pessoais</h3>

                  <ApplicantDetails>
                    <div>
                      <strong>E-mail</strong>
                      <p>{application.applicant.email}</p>
                    </div>
                    <div>
                      <strong>Telefone</strong>
                      <p>{application.applicant.phone}</p>
                    </div>
                    <div>
                      <strong>Nascimento</strong>
                      <p>{application.applicant.profile.born}</p>
                    </div>
                    <div>
                      <strong>Estado civil</strong>
                      <p>{application.applicant.profile.civil_state}</p>
                    </div>
                  </ApplicantDetails>
                </section>

                <section>
                  <h3>Dados profissionais</h3>

                  <ApplicantDetailsProfessional>
                    <div>
                      <strong>Biográfia</strong>
                      <p>{application.applicant.profile.bio}</p>
                    </div>
                    <ApplicantDetailsGroup>
                      <div>
                        <strong>Tipo de contratação</strong>
                        <p>{application.applicant.profile.contract}</p>
                      </div>

                      <div>
                        <strong>Pretensão salarial</strong>
                        <p>
                          {application.applicant.profile.salary_expectations}
                        </p>
                      </div>
                    </ApplicantDetailsGroup>
                  </ApplicantDetailsProfessional>
                </section>
              </main>
            </ApplicantInfo>
            {application.status.id === 1 && (
              <ApplicantActions>
                <Button
                  type="button"
                  onClick={() => {
                    setIsOpen();
                    handleChangeStatusApplication(application.id, 2);
                  }}
                  style={{ background: '#e33d3d' }}
                >
                  Reprovar
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsOpen();
                    handleChangeStatusApplication(application.id, 3);
                  }}
                >
                  Aprovar
                </Button>
              </ApplicantActions>
            )}
          </ApplicantItem>
        ))}
      </ApplicantList>
    </Modal>
  );
};

export default ApplicantsDetailsModal;
