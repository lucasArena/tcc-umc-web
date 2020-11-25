import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import { Container, Top, TitleSection, Main, Item } from './styles';

interface JobProps {
  id: number;
  title: string;
  company: {
    profile: {
      avatar_url?: string;
    };
  };
}

const Jobs: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobProps[]>([] as JobProps[]);

  useEffect(() => {
    async function handleGetCompanyJobs() {
      const response = await api.get<JobProps[]>(
        `/companies/${user.profile.id}/jobs`,
      );

      setJobs(response.data);
    }

    handleGetCompanyJobs();
  }, [user.profile.id]);

  return (
    <Container>
      <Top>
        <Link to="/company/job/create">Criar nova vaga</Link>
      </Top>
      <TitleSection>
        <h2>Vagas</h2>
      </TitleSection>
      <Main>
        {jobs.map((job) => (
          <Item key={job.id} to={`/company/job/edit/${job.id}`}>
            <main>
              <img src={job.company.profile.avatar_url} alt={job.title} />
              <h3>{job.title}</h3>
            </main>
          </Item>
        ))}
      </Main>
    </Container>
  );
};

export default Jobs;
