import React from 'react';
import { observer } from 'mobx-react-lite';
import logo from '@/modules/theme/assets/images/logo.svg';
import SwitchLanguages from '@/modules/lang/components/SwitchLanguages';
import { THEMES } from '@/theme.enum';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

const OnePage = (props: ComponentProps) => {
  const authenticationStore = React.useContext(AuthenticationStoreContext);
  /*
   * Props of Component
   */
  const { style, className, children, title } = props;

  return (
    <>
      <div
        className={`wrapper one-page ${className ? className : ''}`}
        style={style}
      >
        <div className="main">
          <header className="header">
            <a href="/" title="TADA Truck" className="logo">
              <img
                alt="TADA Truck"
                style={{ width: '130px', height: '40px' }}
                src={
                  process.env.REACT_APP_THEME === THEMES.TADATRUCK
                    ? authenticationStore.systemFiles?.logo
                      ? authenticationStore.systemFiles?.logoUrl
                      : logo
                    : logo
                }
              />
            </a>
            <SwitchLanguages />
            <div className="header-title">{title}</div>
          </header>
          {children}
        </div>
      </div>
    </>
  );
};

export default observer(OnePage);
