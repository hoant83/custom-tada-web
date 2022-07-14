import React from 'react';
import { observer } from 'mobx-react-lite';
import CompanyForm from '@/modules/truckowner/components/CompanyForm';
import { NewCompanyRequestDto } from '@/modules/truckowner/truckowner.dto';

interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  mode: string;
  handleSubmitForm: any;
  initialValues: NewCompanyRequestDto;
  handleUploadBusinessLicense: any;
  handleUploadIcon: any;
  handleDeleteCompanyBusinessLicense: any;
  handleDeleteCompanyIcon: any;
}

const TruckOwnerMyCompany = (props: ComponentProps) => {
  return (
    <>
      <CompanyForm {...props} />
    </>
  );
};

export default observer(TruckOwnerMyCompany);
