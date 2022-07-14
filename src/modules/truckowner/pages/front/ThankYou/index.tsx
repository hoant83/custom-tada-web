import React from 'react';
import { observer } from 'mobx-react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import TruckOwnerThankYouContent from '@/modules/truckowner/components/ThankYouContent';
import { THANKYOU_ACTION } from '@/modules/truckowner/truckowner.enum';
import IconThankTadaTruck from '@/libs/assets/images/icon-thank-tadatruck.png';
import OnePage from '@/modules/theme/components/OnePage';
import { TRUCKOWNER_ROUTERS } from '@/modules/truckowner/router.enum';

const ThankyouTruckOwnerPage = () => {
  const history = useHistory();

  /*
   * Getting parameter from the route
   */
  const params: any = useParams();
  const { action } = params;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ONEPAGE_TRUCKOWNER_TITLE,
    ACCOUNT_THANKYOU,
    ACCOUNT_THANKYOU_CREATED,
    ACCOUNT_THANKYOU_CREATEDNOTE,
    ACCOUNT_THANKYOU_RESETPW,
    ACCOUNT_THANKYOU_RESETPWNOTE,
    BUTTONS_LOGIN,
  } = I18N;

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      history.push(TRUCKOWNER_ROUTERS.LOGIN);
    }, 10000);
    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <>
      <OnePage className="thank-you-page" title={t(ONEPAGE_TRUCKOWNER_TITLE)}>
        {action === THANKYOU_ACTION.REGISTER && (
          <TruckOwnerThankYouContent
            title={t(ACCOUNT_THANKYOU)}
            subTitle={t(ACCOUNT_THANKYOU_CREATED)}
            iconSuccess={IconThankTadaTruck}
            btnText={t(BUTTONS_LOGIN)}
            handleBtn={() => history.push(TRUCKOWNER_ROUTERS.LOGIN)}
          >
            {t(ACCOUNT_THANKYOU_CREATEDNOTE)}
          </TruckOwnerThankYouContent>
        )}
        {action === THANKYOU_ACTION.RESET_PASSWORD && (
          <TruckOwnerThankYouContent
            title={t(ACCOUNT_THANKYOU)}
            subTitle={t(ACCOUNT_THANKYOU_RESETPW)}
            iconSuccess={IconThankTadaTruck}
            btnText={t(BUTTONS_LOGIN)}
            handleBtn={() => history.push(TRUCKOWNER_ROUTERS.LOGIN)}
          >
            {t(ACCOUNT_THANKYOU_RESETPWNOTE)}
          </TruckOwnerThankYouContent>
        )}
      </OnePage>
    </>
  );
};

export default observer(ThankyouTruckOwnerPage);
