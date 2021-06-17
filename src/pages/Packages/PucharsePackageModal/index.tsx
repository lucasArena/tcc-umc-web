import React, { useRef, useCallback, useMemo } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form, DowngradeWarning, BankAccountDetails } from './styles';
import Modal from '../../../components/Modal';
import getMoneyValue from '../../../utils/getMoneyValue';
// import { User } from '../../../hooks/auth';

interface IPackageProps {
  id: string;
  name: string;
  monthValue: number;
  yearValue: number;
  quantity: string;
}

interface IPackageProps {
  id: string;
  quantity: string;
}
interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleConfirmPurchase: (id: string) => void;
  purchasePackage: IPackageProps;
  userPackage: any;
}

const PurchasePackageModal: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleConfirmPurchase,
  purchasePackage,
  userPackage,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async () => {
    handleConfirmPurchase(purchasePackage.id);
    setIsOpen();
  }, [handleConfirmPurchase, setIsOpen, purchasePackage.id]);

  const packageValue = useMemo(() => {
    return (
      purchasePackage.monthValue && getMoneyValue(purchasePackage.monthValue)
    );
  }, [purchasePackage]);

  const downGradePackage = useMemo(() => {
    const userhasPackage = userPackage.id;
    return userhasPackage && userPackage.quantity > purchasePackage.quantity;
  }, [purchasePackage, userPackage]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} style={{ height: '55vh' }}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Confirmação compra de pacote</h1>

        {!!downGradePackage && (
          <DowngradeWarning>
            ATENÇÃO! Você pacote com menos quantidade de vagas!
          </DowngradeWarning>
        )}
        <section>
          <span>Você está comprando o pacote:</span>
          <strong>{purchasePackage.name}</strong>
        </section>

        <BankAccountDetails>
          <h3>Dados para realizar pagamento</h3>
          <section>
            <div>
              <span>
                <strong>Banco: </strong>
                <span>BANCO INTER - 077</span>
              </span>
            </div>
          </section>
          <section>
            <div>
              <span>
                <strong>Âgencia:</strong>
                <span>4334198-5</span>
              </span>
              <span>
                <strong>Conta:</strong>
                <span>0001</span>
              </span>
            </div>
          </section>
          <section>
            <div>
              <span>
                <strong>Nome:</strong>
                <span>Work Systems MEI</span>
              </span>
              <span>
                <strong>CNPJ:</strong>
                <span>35.476.252/0001-76</span>
              </span>
            </div>
          </section>
        </BankAccountDetails>
        <section>
          <span>
            <strong>Valor total: </strong>
            <span> {packageValue} </span>
          </span>
          <strong />
        </section>

        <button type="submit">
          <p className="text">Confirmar compra</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default PurchasePackageModal;
