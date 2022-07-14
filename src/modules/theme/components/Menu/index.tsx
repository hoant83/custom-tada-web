import React from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';
import { TRUCKOWNER_ROUTERS } from '@/modules/truckowner/router.enum';
import { MenuDto } from '@/modules/theme/theme.dto';
import { THEMES } from '@/theme.enum';
import { menuTadaTruck, menuTruckOwner } from '@/modules/theme/theme.constants';
import { useMediaQuery } from 'react-responsive';
import { LogoDto } from '@/libs/dto/Logo.dto';
import logoSvg from '@/modules/theme/assets/images/Customer-Logo.png';
import copyRightSvg from '@/modules/theme/assets/images/copyright.svg';
import logoSvgTruck from '@/modules/theme/assets/images/Truck-Owner-Logo.png';
import copyRightSvgTruck from '@/modules/theme/assets/images/copyright-truck.svg';
import { CommonStoreContext } from '@/libs/stores/common.store';
import orderService from '@/modules/order/order.service';
import { OrderStoreContext } from '@/modules/order/order.store';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  logo?: LogoDto;
}

const Menu = (props: ComponentProps) => {
  const history = useHistory();
  const authenticationStore = React.useContext(AuthenticationStoreContext);
  const commonStore = React.useContext(CommonStoreContext);
  const orderStore = React.useContext(OrderStoreContext);

  const routers: any =
    process.env.REACT_APP_THEME === THEMES.TADATRUCK
      ? CUSTOMER_ROUTERS
      : TRUCKOWNER_ROUTERS;

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
  const { ADMIN_MENU_LOG_OUT, COMMISSION_SETUP, MENU_QUOTATION } = I18N;

  /*
   * Action of logout link
   * @params: void
   * @return: void
   */
  const handleLogout = () => {
    authenticationStore.logout(history, routers.LOGIN);
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

  const filterTruckOwnerMenu = (e: any) => {
    if (e.label === COMMISSION_SETUP && !orderStore.isEnableCommissionFeature) {
      return false;
    }
    return true;
  };

  const filterCustomerMenu = (e: any) => {
    if (e.label === MENU_QUOTATION && !authenticationStore.enableQuotation) {
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    if (
      process.env.REACT_APP_THEME === THEMES.TRUCKOWNER &&
      !orderStore.generalSettingCommission
    ) {
      orderStore.getGeneralSettingCommission();
    }
  }, []);

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
          className={`flex-column main-menu ${
            process.env.REACT_APP_THEME === THEMES.TADATRUCK &&
            authenticationStore.settings?.defaultColor
              ? authenticationStore.settings?.defaultColor
              : ''
          } ${className ? className : ''} ${
            isMobile ? 'menu-mobile' : 'menu-desktop'
          } ${showMenu ? 'show' : ''}`}
        >
          {logo && (
            <div
              onClick={() => {
                history.push(CUSTOMER_ROUTERS.SETUP);
              }}
              className="logo-menu"
            >
              <img
                className={logo.className ? logo.className : 'logo-img'}
                src={
                  process.env.REACT_APP_THEME === THEMES.TADATRUCK
                    ? authenticationStore.systemFiles?.logo
                      ? authenticationStore.systemFiles?.logoUrl
                        ? authenticationStore.systemFiles?.logoUrl
                        : logoSvg
                      : logoSvg
                    : logoSvgTruck
                }
                alt={logo.alt ? logo.alt : 'Logo'}
              />
            </div>
          )}
          <Nav className="menu-items" style={style}>
            {process.env.REACT_APP_THEME === THEMES.TADATRUCK &&
              menuTadaTruck
                .filter(filterCustomerMenu)
                .map((item: MenuDto, index) => (
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
            {process.env.REACT_APP_THEME === THEMES.TRUCKOWNER &&
              menuTruckOwner
                .filter(filterTruckOwnerMenu)
                .map((item: MenuDto, index) => (
                  <Nav.Link
                    className={`item ${
                      commonStore.activeMenu === item.url ? 'active' : ''
                    }`}
                    key={`menu-${index}`}
                    onClick={() => handleToUrl(item.url)}
                    eventKey={item.url}
                  >
                    {item.icon && <i className={`ico ${item.icon}`}></i>}
                    <span>{t(item.label)}</span>
                  </Nav.Link>
                ))}
            <Nav.Link className="item" onClick={handleLogout}>
              <i className="ico ico-logout"></i>
              <span>{t(ADMIN_MENU_LOG_OUT)}</span>
            </Nav.Link>
          </Nav>
          {children}
          <div
            className={`copyright ${
              authenticationStore.settings?.defaultColor
                ? authenticationStore.settings?.defaultColor
                : ''
            }`}
          >
            <address>
              <p>© All Rights Reserved</p>
              <div className="footer-image">
                <img
                  src={
                    process.env.REACT_APP_THEME === THEMES.TADATRUCK
                      ? copyRightSvg
                      : copyRightSvgTruck
                  }
                  alt={'Powered by MVL'}
                />
              </div>
            </address>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Menu);
