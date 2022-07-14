import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import AdminAccountGrid from '@/modules/admin-user/components/AccountGrid';
import ActionBar from '@/modules/theme/components/ActionBar';
import { ActionBarDto } from '@/modules/theme/theme.dto';
import AdminAccountFormModal from '@/modules/admin-user/components/AdminAccountFormModal';
import { ACTION_MODE } from '@/libs/enums/action.enum';
import { toast } from 'react-toastify';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { AdminListDto } from '@/modules/admin-user/admin.dto';
import { useHistory } from 'react-router-dom';
import { ADMIN_USER_ROUTERS } from '@/modules/admin-user/router.enum';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { ACCOUNT_ROLE } from '@/modules/admin-user/admin.enum';

const ManageAccountAdminPage = () => {
  const history = useHistory();

  /**
   * Store
   */
  const adminStore = React.useContext(AdminStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ADMIN_MANAGE_ACCOUNT,
    BUTTONS_ADD_NEW,
    MESSAGES_CREATED_SUCCESS,
    MESSAGES_UPDATE_SUCCESS,
    BUTTONS_RESTORE,
  } = I18N;

  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  const [mode, setMode] = React.useState<string>(ACTION_MODE.CREATE);

  const [id, setId] = React.useState<number>(-1);

  const [actionsBar] = React.useState<ActionBarDto[]>([
    {
      label: BUTTONS_RESTORE,
      type: 'primary',
      action: () => {
        handleRestore();
      },
    },
    {
      label: BUTTONS_ADD_NEW,
      type: 'primary',
      action: () => {
        handleCreate();
      },
    },
  ]);

  const handleRestore = () => {
    history.push(ADMIN_USER_ROUTERS.ADMIN_ACCOUNT_MANAGE_DELETED);
  };

  const [criteriaDto, setCriteriaDto] = React.useState<AdminListDto>({
    skip: 0,
    take: +pageSizeOptions[1],
    orderDirection: 'DESC',
  });

  const handleCreate = () => {
    setMode(ACTION_MODE.CREATE);
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    adminStore.setModalSetupAccount(false);
  };

  const handleSubmit = async (values: any) => {
    adminStore.setAdminForm(values);
    if (mode === ACTION_MODE.CREATE) {
      const result = await adminStore.addAdmin();
      if (result) {
        adminStore.getAdmins(criteriaDto);
        adminStore.resetAdminForm();
        toast.dismiss();
        toast.success(t(MESSAGES_CREATED_SUCCESS));
        handleClose();
      }
    }
    if (mode === ACTION_MODE.EDIT) {
      const result = await adminStore.updateAdmin(id, adminStore.adminForm);
      if (result) {
        adminStore.getAdmins(criteriaDto);
        adminStore.resetAdminForm();
        toast.dismiss();
        toast.success(t(MESSAGES_UPDATE_SUCCESS));
        handleClose();
      }
    }
  };

  const handleEdit = async (id: number) => {
    const admin = await adminStore.getAdminsById(id);
    if (admin) {
      setMode(ACTION_MODE.EDIT);
      setId(id);
      setShowPopup(true);
    }
  };

  const handleDelete = async (id: number) => {
    await adminStore.deleteAdmin(id);
    adminStore.getAdmins(criteriaDto);
  };

  const handleChangePageItem = (page: number) => {
    setCriteriaDto({
      skip: page > 1 ? (page - 1) * +pageSizeOptions[1] : 0,
      take: +pageSizeOptions[1],
      orderDirection: 'DESC',
    });
  };

  React.useEffect(() => {
    adminStore.getAdmins(criteriaDto);
  }, [criteriaDto, adminStore]);

  React.useEffect(() => {
    if (
      adminStore.isShowModalSetupAccount &&
      authStore.loggedUser?.userType !== ACCOUNT_ROLE.SUPERADMIN
    )
      handleEdit(authStore.loggedUser?.id);
  }, [adminStore.isShowModalSetupAccount]);

  return (
    <>
      <AdminWrapper pageTitle={t(ADMIN_MANAGE_ACCOUNT)}>
        <ActionBar actions={actionsBar} />
        <AdminAccountGrid
          handleChangePageItem={handleChangePageItem}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <AdminAccountFormModal
          show={showPopup}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          mode={mode}
        />
      </AdminWrapper>
    </>
  );
};

export default observer(ManageAccountAdminPage);
