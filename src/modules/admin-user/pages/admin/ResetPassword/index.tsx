import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminResetForm from '@/modules/admin-user/components/ResetForm';
import { ResetPasswordDto } from '@/modules/account/account.dto';
import { ADMIN_USER_ROUTERS } from '@/modules/admin-user/router.enum';
import { AccountStoreContext } from '@/modules/account/account.store';
import { useHistory, useParams } from 'react-router-dom';
import OnePage from '@/modules/theme/components/OnePage';

const ResetPasswordAdminPage = () => {
  const accountStore = React.useContext(AccountStoreContext);
  const { token } = useParams() as any;
  const history = useHistory();

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ONEPAGE_ADMIN_TITLE } = I18N;

  /*
   * Action of confirm button
   * @params: void
   * @return: void
   */
  const handleConfirm = async (values: any) => {
    const resetPasswordFormValue: ResetPasswordDto = {
      password: values.password,
      token,
    };
    const result = await accountStore.resetPassword(resetPasswordFormValue);
    if (result) {
      history.push(ADMIN_USER_ROUTERS.ADMIN_LOGIN);
    }
  };

  return (
    <>
      <OnePage title={t(ONEPAGE_ADMIN_TITLE)}>
        <AdminResetForm
          handleConfirm={handleConfirm}
          userEmail={'sample@gmail.com'}
        />
      </OnePage>
    </>
  );
};

export default observer(ResetPasswordAdminPage);
