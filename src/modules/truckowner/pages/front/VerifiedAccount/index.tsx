import React from 'react';
import { observer } from 'mobx-react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import TruckOwnerThankYouContent from '@/modules/truckowner/components/ThankYouContent';
import IconThankTadaTruck from '@/libs/assets/images/icon-thank-tadatruck.png';
import OnePage from '@/modules/theme/components/OnePage';
import { TRUCKOWNER_ROUTERS } from '@/modules/truckowner/router.enum';

const VerifiedPage = () => {
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
    ONEPAGE_TRUCKOWNER_TITLE,
    ACCOUNT_VERIFIED_TITLE,
    ACCOUNT_VERIFIED_MESSAGE,
    ACCOUNT_VERIFIED_MOREINFO,
    BUTTONS_LOGIN,
  } = I18N;

  React.useEffect(() => {
    token && authStore.validateEmailToken(token);
    const timeout = setTimeout(() => {
      history.push(TRUCKOWNER_ROUTERS.LOGIN);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [authStore, history, token]);

  return (
    <>
      <OnePage className="thank-you-page" title={t(ONEPAGE_TRUCKOWNER_TITLE)}>
        <TruckOwnerThankYouContent
          title={t(ACCOUNT_VERIFIED_TITLE)}
          subTitle={t(ACCOUNT_VERIFIED_MESSAGE)}
          iconSuccess={IconThankTadaTruck}
          btnText={t(BUTTONS_LOGIN)}
          handleBtn={() => history.push(TRUCKOWNER_ROUTERS.LOGIN)}
        >
          {t(ACCOUNT_VERIFIED_MOREINFO)}
        </TruckOwnerThankYouContent>
      </OnePage>
    </>
  );
};

export default observer(VerifiedPage);
