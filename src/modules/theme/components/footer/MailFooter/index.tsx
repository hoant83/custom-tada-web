import React from 'react';
import { observer } from 'mobx-react-lite';
import mailLogo from '@/modules/theme/assets/images/mail-icon.png';
import '@/modules/theme/assets/css/sources/_footer.scss';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
}

const MailFooter = (props: ComponentProps) => {
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
            href={`mailto:${userStore.settings?.email ?? 'hotro@tada.global'}`}
          >
            <img src={mailLogo} alt="Logo" />
          </a>
          <div className="info-text">
            <a
              href={`mailto:${
                userStore.settings?.email ?? 'hotro@tada.global'
              }`}
            >
              {userStore.settings?.email ?? 'hotro@tada.global'}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(MailFooter);
