import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import '@/modules/theme/assets/css/sources/_footer.scss';
import React from 'react';
import FbFooter from '../FbFooter';
import MailFooter from '../MailFooter';
import PhoneFooter from '../PhoneFooter';
import ZaloFooter from '../ZaloFooter';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
}

const Footer = React.memo((props: ComponentProps) => {
  const userStore = React.useContext(AuthenticationStoreContext);
  /*
   * Props of Component
   */
  const { className } = props;

  React.useEffect(() => {
    userStore.getSettings();
  }, [userStore]);

  return (
    <>
      <div className={`footer ${className ? className : ''}`}>
        <ZaloFooter />
        <FbFooter />
        <MailFooter />
        <PhoneFooter />
      </div>
    </>
  );
});

export default Footer;
