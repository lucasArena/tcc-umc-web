import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Top,
  TitleSection,
  Main,
  Header,
  Body,
  Row,
} from './styles';

interface JobInformationProps {
  id: number;
  title: string;
  applications: number;
  available: number;
  approved: number;
}

interface ApplicationProps {
  id: number;
  title: string;
  quantity: number;
  available: number;
  applications: {
    status: {
      id: number;
    };
  }[];
}

const CompanyLanding: React.FC = () => {
  const { user } = useAuth();

  const [jobs, setJobs] = useState<JobInformationProps[]>([]);
  useEffect(() => {
    async function getJobsInformation() {
      const response = await api.get<ApplicationProps[]>(
        `/companies/${user.profile.id}/jobs`,
      );

      const jobsInformationFormatted = response.data.map((jobInfo) => {
        const { id, title, quantity, available, applications } = jobInfo;

        return {
          id,
          title,
          quantity,
          available,
          applications: applications.length,
          approved: applications.reduce((applicationsApproved, current) => {
            return current.status.id === 3
              ? applicationsApproved + 1
              : applicationsApproved;
          }, 0),
        };
      });

      setJobs(jobsInformationFormatted);
    }

    getJobsInformation();
  }, [user]);

  return (
    <Container>
      <Top />
      <TitleSection>
        <h2>Inicio</h2>
      </TitleSection>

      <Main>
        <Header>
          <div>Vaga</div>
          <div>Candidaturas</div>
          <div>Disponiveis</div>
          <div>Aprovados</div>
        </Header>
        <Body>
          {jobs.map((job) => (
            <Row key={job.id}>
              <div>{job.title}</div>
              <div>{job.applications}</div>
              <div>{job.available}</div>
              <div>{job.approved}</div>
            </Row>
          ))}
        </Body>
      </Main>
    </Container>
  );
};

export default CompanyLanding;
