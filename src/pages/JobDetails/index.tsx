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

interface UserApplications {
  id: number;
  createdAt: string;
}

interface UserPackage {
  package: {
    id: number;
    quantity: number;
  };
  active: boolean;
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
  const [userApplications, setUserApplications] = useState<UserApplications[]>(
    [],
  );
  const [userPackage, setUserPackage] = useState<UserPackage>(
    {} as UserPackage,
  );

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

  const applicationRule = useMemo(() => {
    if (job) {
      const userApplied = job.applications?.find(
        (application) => application.user.id === user.id,
      );

      if (userApplied) {
        return {
          enable: false,
          description: 'Candidatado',
        };
      }

      if (user.profile_type !== 'App\\ApplicantEloquent') {
        return {
          enable: false,
          description: 'Somente candidatos podem aplicar-se',
        };
      }

      if (user.profile.resume === '') {
        return {
          enable: false,
          description: 'Para se candidatar deve-se ter um CV cadastrado',
        };
      }

      if (!userPackage.package && userApplications.length >= 2) {
        return {
          enable: false,
          description: 'Limite de candidaturas mensais atingidas',
        };
      }

      if (
        userPackage.package &&
        userApplications.length >= userPackage.package.quantity
      ) {
        return {
          enable: false,
          description:
            'Limite de candidaturas mensais do pacote contratado atingidas',
        };
      }
    }
    return {
      enable: true,
      description: 'Candidatar-se',
    };
  }, [job, user, userApplications, userPackage.package]);

  useEffect(() => {
    async function handleGetJob() {
      const [
        responseJob,
        responseUserApplications,
        responseUserPackage,
      ] = await Promise.all([
        api.get(`/jobs/${jobId}`),
        api.get<UserApplications[]>(`/users/${user.id}/applications`),
        api.get<UserPackage[]>(`/users/${user.id}/packages`, {
          params: {
            active: 1,
          },
        }),
      ]);

      setJob(responseJob.data);
      setUserApplications(
        responseUserApplications.data.filter(
          (application: UserApplications) => {
            return (
              new Date(application.createdAt).getMonth() + 1 ===
              new Date().getMonth() + 1
            );
          },
        ),
      );

      setUserPackage(
        responseUserPackage.data.length
          ? responseUserPackage.data[0]
          : ({} as UserPackage),
      );
    }

    handleGetJob();
  }, [jobId, user.id]);

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
            <Button
              onClick={handleAplicattion}
              disabled={!applicationRule.enable}
            >
              {applicationRule.description}
            </Button>
          </Aside>
        </Content>
      </FormJobDetails>
    </Container>
  );
};

export default JobDetails;
