import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Container, Content, JobList, NoResult } from './styles';

import api from '../../services/api';
import JobItem from '../../components/JobItem';
import Header from '../../components/Header';

interface JobProps {
  id: number;
  title: string;
  description: string;
  company: {
    trade_name: string;
    profile: {
      avatar: string;
    };
  };
}

const Landing: React.FC = () => {
  const [jobs, setJobs] = useState<JobProps[]>([]);

  useEffect(() => {
    async function handleGetJobs() {
      const responseJobs = await api.get<JobProps[]>('/jobs');

      setJobs(responseJobs.data);
    }

    handleGetJobs();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <JobList>
          {jobs.length ? (
            jobs.map((job) => (
              <JobItem
                id={job.id}
                key={job.id}
                company={job.company}
                title={job.title}
                description={job.description}
              />
            ))
          ) : (
              <NoResult>
                <span>Nenhuma vaga cadastrada</span>
              </NoResult>
            )}
        </JobList>
      </Content>
    </Container>
  );
};

export default Landing;
