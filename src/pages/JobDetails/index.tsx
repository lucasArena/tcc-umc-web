import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { parseISO, format } from 'date-fns';

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
    avatar_url?: string;
    profile: {
      trade_name: string;
    };
  };
  type: {
    name: string;
  };
  applications?: {
    user: {
      id: number;
    };
  }[];
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
        avatar_url: undefined,
        profile: {
          trade_name: '',
        },
      },
      type: {
        name: '',
      },
      applications: [],
    };
  });

  const handleAplicattion = useCallback(async () => {
    try {
      await api.post('/applications', {
        user: {
          id: user.id,
        },
        job: {
          id: job.id,
        },
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

  const applicationCreated = useMemo(() => {
    if (job) {
      const userApplication = job.applications?.find(
        (application) => application.user.id === user.id,
      );

      return !!userApplication;
    }
    return false;
  }, [job, user]);

  useEffect(() => {
    async function handleGetJob() {
      const responseJob = await api.get(`/jobs/${jobId}`);

      setJob(responseJob.data);
    }

    handleGetJob();
  }, [jobId]);

  return (
    <Container>
      <ProfileInfo>
        <AvatarContainer>
          <img
            src={
              (job.company && job.company.avatar_url) ||
              'https://images6.fanpop.com/image/photos/38200000/Spongebob-Icon-spongebob-squarepants-38211111-200-200.jpg'
            }
            alt="Lucas Arena"
          />
        </AvatarContainer>

        <h2>{job.company.profile.trade_name}</h2>
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
                <span>{job.type.name}</span>
              </section>
            </div>
          </Main>
          <Aside>
            <Button onClick={handleAplicattion} disabled={applicationCreated}>
              {applicationCreated ? 'Candidatado' : 'Candidatar-se'}
            </Button>
          </Aside>
        </Content>
      </FormJobDetails>
    </Container>
  );
};

export default JobDetails;
