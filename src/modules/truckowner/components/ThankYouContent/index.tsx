import React from 'react';
import { observer } from 'mobx-react-lite';
import AccountThankYouContent from '@/modules/account/components/ThankYouContent';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title: string;
  subTitle: string;
  iconSuccess?: string;
  btnText?: string;
  handleBtn?: any;
}

const TruckOwnerThankYouContent = (props: ComponentProps) => {
  return (
    <>
      <AccountThankYouContent {...props} />
    </>
  );
};

export default observer(TruckOwnerThankYouContent);
