import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../../../components/Modal';

interface IPackageProps {
  id: string;
  name: string;
  monthValue: number;
  yearValue: number;
  quantity: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleConfirmPurchase: (id: string) => void;
  purchasePackage: IPackageProps;
}

const PurchasePackageModal: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleConfirmPurchase,
  purchasePackage,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async () => {
    handleConfirmPurchase(purchasePackage.id);
    setIsOpen();
  }, [handleConfirmPurchase, setIsOpen, purchasePackage.id]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Confirmação compra de pacote</h1>

        <section>
          <span>Você está comprando o pacote:</span>
          <strong>{purchasePackage.name}</strong>
        </section>
        <section>
          <span>Pelo valor de</span>
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
