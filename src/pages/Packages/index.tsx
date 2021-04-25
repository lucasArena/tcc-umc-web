import React, { useEffect, useMemo, useState } from 'react';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import getMoneyValue from '../../utils/getMoneyValue';
import PurchasePackageModal from './PucharsePackageModal';

import {
  Content,
  Title,
  Description,
  PackageList,
  PackageContainer,
  PackageButton,
} from './styles';

interface IPackageProps {
  id: string;
  name: string;
  monthValue: number;
  yearValue: number;
  quantity: string;
  disabled: boolean;
  buttonMessage: () =>
    | 'Pendente de confirmação'
    | 'Compra de outro pacote pendente'
    | 'Contratar'
    | 'Pacote já ativado';
}

interface IPaymentProps {
  id: string;
  package: IPackageProps;
  status: string;
}

interface IUserPackageProps {
  package: IPackageProps;
  active: string;
}

const Packages: React.FC = () => {
  const [packages, setPackages] = useState<IPackageProps[]>([]);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [purchasePackage, setPurchasePackage] = useState<IPackageProps>(
    {} as IPackageProps,
  );

  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    async function handleGetPackages() {
      const [
        responsePackages,
        responsePayments,
        responseUserPackages,
      ] = await Promise.all([
        api.get('/packages'),
        api.get(`/users/${user.id}/payments`, {
          params: {
            status: 'Pendent',
          },
        }),
        api.get(`/users/${user.id}/packages`),
      ]);

      const packagesData: IPackageProps[] = responsePackages.data;
      const userPaymentsData: IPaymentProps[] = responsePayments.data;
      const responseUserPackagesData: IUserPackageProps[] =
        responseUserPackages.data;

      const hasPurchasePendent = !!userPaymentsData.length;

      const packagesDataFormatted = packagesData.map((packageData) => {
        const userPaymentPendent = userPaymentsData.find((userPayment) => {
          return userPayment.package.id === packageData.id;
        });

        const userPackageActive = responseUserPackagesData.find(
          (userPackage) => {
            return (
              userPackage.package.id === packageData.id && userPackage.active
            );
          },
        );

        return {
          ...packageData,
          disabled: hasPurchasePendent || !!userPackageActive,
          buttonMessage: () => {
            if (userPaymentPendent) {
              return 'Pendente de confirmação';
            }
            if (hasPurchasePendent) {
              return 'Compra de outro pacote pendente';
            }

            if (userPackageActive) {
              return 'Pacote já ativado';
            }

            return 'Contratar';
          },
        };
      });

      setPackages(packagesDataFormatted);
    }

    handleGetPackages();
  }, [user.id]);

  function toggleModal(): void {
    setPurchaseModalOpen(!purchaseModalOpen);
  }

  function handleSelectPackage(packageData: IPackageProps): void {
    setPurchasePackage(packageData);
    setPurchaseModalOpen(!purchaseModalOpen);
  }
  async function handleConfirmPurchase(packageId: string) {
    try {
      await api.post('/payments', {
        user: {
          id: user.id,
          profile_type: user.profile_type,
        },
        package: {
          id: packageId,
        },
      });

      setPackages((oldPackages) => {
        return oldPackages.map((oldPackage) => {
          return {
            ...oldPackage,
            disabled: true,
            buttonMessage: () => {
              if (oldPackage.id === packageId) {
                return 'Pendente de confirmação';
              }

              return 'Compra de outro pacote pendente';
            },
          };
        });
      });

      addToast({
        title: 'Sucesso',
        description: 'Confirmação da compra realizada com sucesso',
        type: 'success',
      });
    } catch (error) {
      console.error(error);

      addToast({
        title: 'Erro',
        description: 'Erro ao tentar confirmar a compra do pacote',
        type: 'error',
      });
    }
  }

  return (
    <Content>
      <Title>Escolha o seu pacote</Title>
      <Description>Aumente as suas oportunidades</Description>
      <PackageList>
        <PurchasePackageModal
          isOpen={purchaseModalOpen}
          setIsOpen={toggleModal}
          handleConfirmPurchase={handleConfirmPurchase}
          purchasePackage={purchasePackage}
        />
        {packages.map((packageData) => {
          return (
            <PackageContainer key={packageData.id}>
              <h2>{packageData.name}</h2>
              <div>
                <p>
                  Limite para candidaturas:
                  {packageData.quantity}
                </p>
                <span>{getMoneyValue(packageData.monthValue)}</span>
              </div>
              <PackageButton
                disabled={packageData.disabled}
                onClick={() => handleSelectPackage(packageData)}
              >
                {packageData.buttonMessage()}
              </PackageButton>
            </PackageContainer>
          );
        })}
      </PackageList>
    </Content>
  );
};

export default Packages;
