import React from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';
import SwitchLanguages from '@/modules/lang/components/SwitchLanguages';
import NotificationSummary from '@/modules/notification/components/Summary';
import AccountSummary from '@/modules/account/components/AccountSummary';
import FaqLink from '@/modules/cms/components/FaqLink';
import { useMediaQuery } from 'react-responsive';
import { LogoDto } from '@/libs/dto/Logo.dto';
import logoSvg from '@/modules/theme/assets/images/logo.svg';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
  logo?: LogoDto;
}

const TopMenu = (props: ComponentProps) => {
  const history = useHistory();

  /*
   * Props of Component
   */
  const {
    className,
    logo = {
      className: '',
      url: logoSvg,
      alt: 'Logo',
    },
  } = props;

  /*
   * Setting logo responsive
   */
  const isMobile = useMediaQuery({
    query: '(max-width: 991px)',
  });

  return (
    <>
      <div className={`top-menu ${className ? className : ''}`}>
        {isMobile && (
          <div
            onClick={() => {
              history.push(CUSTOMER_ROUTERS.SETUP);
            }}
            className="logo-menu"
          >
            <img
              className={logo.className ? logo.className : ''}
              src={logo.url ? logo.url : ''}
              alt={logo.alt ? logo.alt : 'Logo'}
            />
          </div>
        )}
        <FaqLink />
        <NotificationSummary />
        <AccountSummary />
        <SwitchLanguages />
      </div>
    </>
  );
};

export default observer(TopMenu);
