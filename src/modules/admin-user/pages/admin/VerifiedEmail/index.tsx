import React from 'react';
import { observer } from 'mobx-react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import ThankYouContent from '@/modules/admin-user/components/ThankYouContent';
import IconThankTadaTruck from '@/libs/assets/images/icon-thank-tadatruck.png';
import OnePage from '@/modules/theme/components/OnePage';
import { ADMIN_USER_ROUTERS } from '@/modules/admin-user/router.enum';

const VerifiedEmailPage = () => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const history = useHistory();

  /*
   * Getting parameter from the route
   */
  const { token } = useParams() as any;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ONEPAGE_ADMIN_TITLE,
    ACCOUNT_VERIFIED_TITLE,
    ACCOUNT_VERIFIED_MESSAGE,
    ACCOUNT_VERIFIED_MOREINFO,
    BUTTONS_LOGIN,
  } = I18N;

  React.useEffect(() => {
    authStore.validateEmailToken(token);
    const timeout = setTimeout(() => {
      history.push(ADMIN_USER_ROUTERS.ADMIN_LOGIN);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [authStore, history, token]);

  return (
    <>
      <OnePage className="thank-you-page" title={t(ONEPAGE_ADMIN_TITLE)}>
        <ThankYouContent
          title={t(ACCOUNT_VERIFIED_TITLE)}
          subTitle={t(ACCOUNT_VERIFIED_MESSAGE)}
          iconSuccess={IconThankTadaTruck}
          btnText={t(BUTTONS_LOGIN)}
          handleBtn={() => history.push(ADMIN_USER_ROUTERS.ADMIN_LOGIN)}
        >
          {t(ACCOUNT_VERIFIED_MOREINFO)}
        </ThankYouContent>
      </OnePage>
    </>
  );
};

export default observer(VerifiedEmailPage);
