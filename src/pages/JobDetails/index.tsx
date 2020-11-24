import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { parseISO, format } from 'date-fns';

import Header from '../../components/Header';
import Button from '../../components/Button';

import {
  Container,
  ProfileInfo,
  AvatarContainer,
  FormJobDetails,
  Content,
  Main,
  Aside,
} from './styles';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface Props {
  jobId: string;
}

interface JobProps {
  id: number;
  title: string;
  description: string;
  created_at: string;
  company: {
    trade_name: string;
    profile: {
      avatar_url?: string;
    };
  };
  job_types: {
    name: string;
  };
}

const JobDetails: React.FC = () => {
  const { state } = useLocation<Props>();
  const { user } = useAuth();
  const { push } = useHistory();
  const { addToast } = useToast();

  const [jobId] = useState<String>(state.jobId);
  const [job, setJob] = useState<JobProps>(() => {
    return {
      id: 0,
      title: '',
      description: '',
      created_at: '',
      company: {
        trade_name: '',
        profile: {
          avatar_url: undefined,
        },
      },
      job_types: {
        name: '',
      },
    };
  });

  const handleAplicattion = useCallback(async () => {
    try {
      await api.post('/applications', {
        user_id: user.id,
        job_id: job.id,
      });

      addToast({
        title: 'Sucesso',
        description: 'Candidatura efetuada com sucesso',
        type: 'success',
      });

      push('/landing');
    } catch {
      addToast({
        title: 'Erro',
        description: 'Erro ao tentar realizar a candidatura',
        type: 'error',
      });
    }
  }, [user.id, job.id, push, addToast]);

  const createdDateJobFormatted = useMemo(() => {
    if (!job.created_at) {
      return '';
    }

    const dateFormatted = format(parseISO(job.created_at), 'dd/M/Y');

    return dateFormatted;
  }, [job.created_at]);

  useEffect(() => {
    async function handleGetJob() {
      const responseJob = await api.get(`/jobs/${jobId}`);

      setJob(responseJob.data);
    }

    handleGetJob();
  }, [jobId]);

  return (
    <Container>
      <Header />
      <ProfileInfo>
        <AvatarContainer>
          <img
            src={
              (job.company &&
                job.company.profile &&
                job.company.profile.avatar_url) ||
              'https://images6.fanpop.com/image/photos/38200000/Spongebob-Icon-spongebob-squarepants-38211111-200-200.jpg'
            }
            alt="Lucas Arena"
          />
        </AvatarContainer>

        <h2>{job.company.trade_name}</h2>
      </ProfileInfo>
      <FormJobDetails>
        <fieldset>
          <legend>Mais sobre a vaga</legend>
          <span>{`Publicada em ${createdDateJobFormatted}`}</span>
        </fieldset>

        <Content>
          <Main>
            <h2>{job.title}</h2>
            <span>{job.description}</span>
            <div>
              <section>
                <strong>Tipo de vaga: </strong>
                <span>{job.job_types.name}</span>
              </section>
            </div>
          </Main>
          <Aside>
            <Button onClick={handleAplicattion} disabled={false}>
              Candidatar-se
            </Button>
          </Aside>
        </Content>
      </FormJobDetails>
    </Container>
  );
};

export default JobDetails;
