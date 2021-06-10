import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import { Container, Top, TitleSection, Main, Item, NoResults } from './styles';

import noResultIcon from '../../assets/images/no-results.svg';

interface JobProps {
  id: number;
  title: string;
  company: {
    avatar?: string;
    avatar_url?: string;
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
        {jobs.length ? (
          jobs.map((job) => (
            <Item key={job.id} to={`/company/job/edit/${job.id}`}>
              <main>
                <img
                  src={
                    job.company.avatar
                      ? job.company.avatar_url
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD6o4MplGmPR_M3Z_mSwecQ3cKlpZzaJOyhQ&usqp=CAU'
                  }
                  alt={job.title}
                />
                <h3>{job.title}</h3>
              </main>
            </Item>
          ))
        ) : (
          <NoResults>
            <img src={noResultIcon} alt="No results found logo" />
            <h2>Não há vagas cadastradas</h2>
          </NoResults>
        )}
      </Main>
    </Container>
  );
};

export default Jobs;
