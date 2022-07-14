import React from 'react';
import { observer } from 'mobx-react-lite';
import fbLogo from '@/modules/theme/assets/images/fb-icon.png';
import '@/modules/theme/assets/css/sources/_footer.scss';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
}

const FbFooter = (props: ComponentProps) => {
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
            href={
              userStore.settings?.fbLink ??
              'https://www.facebook.com/tada.global.vn'
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={fbLogo} alt="Logo" />
          </a>
          <div className="info-text">
            <a
              href={
                userStore.settings?.fbLink ??
                'https://www.facebook.com/tada.global.vn'
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {userStore.settings?.fbLabel ?? 'fb.com/tadavietnam'}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(FbFooter);
