import React from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { ADMIN_USER_ROUTERS } from '@/modules/admin-user/router.enum';
import { MenuDto } from '@/modules/theme/theme.dto';
import { THEMES } from '@/theme.enum';
import { useMediaQuery } from 'react-responsive';
import { LogoDto } from '@/libs/dto/Logo.dto';
import logoSvg from '@/modules/theme/assets/images/logo.svg';
import logoSvgTruck from '@/modules/theme/assets/images/logo-truck.svg';
import { CommonStoreContext } from '@/libs/stores/common.store';
import { adminMenu } from '@/modules/theme/theme.constants';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  logo?: LogoDto;
}

const AdminMenu = (props: ComponentProps) => {
  const history = useHistory();
  const authenticationStore = React.useContext(AuthenticationStoreContext);
  const commonStore = React.useContext(CommonStoreContext);

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    logo = {
      className: '',
      url: logoSvg,
      alt: 'Logo',
    },
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ADMIN_MENU_LOG_OUT } = I18N;

  /*
   * Action of logout link
   * @params: void
   * @return: void
   */
  const handleLogout = () => {
    authenticationStore.logout(history, ADMIN_USER_ROUTERS.ADMIN_LOGIN);
  };

  /*
   * Setting Menu Responsive
   */
  const [showMenu, setShowMenu] = React.useState<boolean>(false);

  const handleMediaQueryChange = (matches: boolean) => {
    if (matches === false) setShowMenu(matches);
  };

  const isMobile = useMediaQuery(
    {
      query: '(max-width: 991px)',
    },
    undefined,
    handleMediaQueryChange
  );

  const changeShowHideMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleToUrl = (url: string) => {
    history.push(url);
    commonStore.setActiveMenu(url);
  };

  return (
    <>
      <div className="menu-wrapper">
        {isMobile && (
          <div
            className={`menu-icon ${showMenu ? 'close' : ''}`}
            onClick={() => changeShowHideMenu()}
          >
            {!showMenu && <i className="ico ico-menu"></i>}
            {showMenu && <i className="ico ico-delete"></i>}
          </div>
        )}
        <div
          className={`flex-column main-menu  ${className ? className : ''} ${
            isMobile ? 'menu-mobile' : 'menu-desktop'
          } ${showMenu ? 'show' : ''}`}
        >
          {logo && (
            <div
              onClick={() => {
                history.push(ADMIN_USER_ROUTERS.ADMIN_ACCOUNT_MANAGE);
              }}
              className="logo-menu"
            >
              <img
                className={logo.className ? logo.className : ''}
                src={
                  process.env.REACT_APP_THEME === THEMES.TADATRUCK
                    ? logoSvg
                    : logoSvgTruck
                }
                alt={logo.alt ? logo.alt : 'Logo'}
              />
            </div>
          )}
          <Nav className="menu-items" style={style}>
            {adminMenu.map((item: MenuDto, index) => (
              <Nav.Link
                className={`item ${
                  commonStore.activeMenu === item.url ? 'active' : ''
                }`}
                eventKey={item.url}
                onClick={() => handleToUrl(item.url)}
                key={`menu-${index}`}
              >
                {item.icon && <i className={`ico ${item.icon}`}></i>}
                <span>{t(item.label)}</span>
              </Nav.Link>
            ))}
            <Nav.Link className="item" onClick={() => handleLogout()}>
              <i className="ico ico-logout"></i>
              <span>{t(ADMIN_MENU_LOG_OUT)}</span>
            </Nav.Link>
          </Nav>
          {children}
        </div>
      </div>
    </>
  );
};

export default observer(AdminMenu);
