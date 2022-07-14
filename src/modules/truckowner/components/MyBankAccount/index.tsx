import React from 'react';
import { observer } from 'mobx-react-lite';
import BankAccountForm from '@/modules/truckowner/components/BankAccountForm';
import { NewBankAccountRequestDto } from '@/modules/truckowner/truckowner.dto';

interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  mode: string;
  handleSubmitForm: any;
  initialValues: NewBankAccountRequestDto;
}

const TruckOwnerBankAccount = (props: ComponentProps) => {
  return (
    <>
      <BankAccountForm {...props} />
    </>
  );
};

export default observer(TruckOwnerBankAccount);
