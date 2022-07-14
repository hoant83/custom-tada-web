import React from 'react';
import { observer } from 'mobx-react-lite';
import LoginForm from '@/modules/account/components/LoginForm';

interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  handleLogin: any;
  handleForgotPassword: any;
  handleSignUp?: any;
  formTitle?: string;
  initialValues?: any;
  userEmail?: string;
  isCustomerPage?: boolean;
}

const CustomerLoginForm = (props: ComponentProps) => {
  return (
    <>
      <LoginForm {...props} />
    </>
  );
};

export default observer(CustomerLoginForm);
