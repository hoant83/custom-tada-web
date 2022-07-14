import React from 'react';
import { observer } from 'mobx-react-lite';
import phoneLogo from '@/modules/theme/assets/images/phone-icon.png';
import '@/modules/theme/assets/css/sources/_footer.scss';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
}

const PhoneFooter = (props: ComponentProps) => {
  const userStore = React.useContext(AuthenticationStoreContext);
  /*
   * Props of Component
   */
  const { className } = props;

  return (
    <>
      <div className={`logo-box ${className ? className : ''}`}>
        <div className="footer-info">
          <a
            href={`tel: ${userStore.settings?.phoneNumber ?? '1900 62 63 96'}`}
          >
            <img src={phoneLogo} alt="Logo" />
          </a>
          <div className="info-text">
            <a
              href={`tel: ${
                userStore.settings?.phoneNumber ?? '1900 62 63 96'
              }`}
            >
              {userStore.settings?.phoneNumber ?? '1900 62 63 96'}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(PhoneFooter);
