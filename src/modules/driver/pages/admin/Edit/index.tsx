import React from 'react';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import EditDriverFormAdmin from '@/modules/driver/components/admin/Edit';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { toast } from 'react-toastify';
import { DRIVER_ROUTERS } from '@/modules/driver/router.enum';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';
import {
  isMaximunOtherDocument,
  notifyError,
  notifySuccess,
} from '@/libs/utils/upload.util';

const EditDriverAdminPage = () => {
  const { userId } = useParams() as any;
  const adminStore = React.useContext(AdminStoreContext);
  const history = useHistory();

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ADMIN_MENU_DRIVER,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_UPDATE_SUCCESS,
    MESSAGES_DOCUMENT_SIZE_LIMIT,
  } = I18N;

  const handleSubmit = async (values: any) => {
    await uploadDriverFiles();
    await adminStore.setUpdateDriverForm(values);
    await adminStore.updateDriverAccount(userId);
    toast.dismiss();
    toast.success(t(MESSAGES_UPDATE_SUCCESS));
  };

  const handleBack = () => {
    const editUrl = DRIVER_ROUTERS.ADMIN_MANAGE;
    history.push(editUrl);
  };

  const handleDelete = async (referenceType: number) => {
    const result = await adminStore.deleteFiles(userId, referenceType);
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_DELETE_SUCCESS));
      await getUpdateDriver();
    }
  };

  const [cardFront, setCardFront] = React.useState({
    file: null,
  });

  const [cardBack, setCardBack] = React.useState({
    file: null,
  });

  const [license, setLicense] = React.useState({
    file: null,
  });

  const [otherDocuments, setOtherDocuments] = React.useState<
    Record<'files', File[]>
  >({
    files: [],
  });

  const [
    disableChooseOtherDocument,
    setdisableChooseOtherDocument,
  ] = React.useState<boolean>(false);

  const handleUploadCardFront = (event: any) => {
    setCardFront({ file: event.target.files[0] });
  };

  const handleUploadCardBack = (event: any) => {
    setCardBack({ file: event.target.files[0] });
  };

  const handleUploadLicense = (event: any) => {
    setLicense({ file: event.target.files[0] });
  };

  const handleUploadMultipleDocument = (event: any) => {
    const listFile: File[] = Object.values(event.target.files);

    if (isMaximunOtherDocument(listFile, adminStore.updateDriver)) {
      setdisableChooseOtherDocument(false);
      notifyError(t(MESSAGES_DOCUMENT_SIZE_LIMIT));
      return;
    }

    setOtherDocuments({ files: listFile });
  };

  const handleDeleteOtherDocument = async (key: string) => {
    const result = await adminStore.deleteFileByFileId(
      userId,
      key,
      REFERENCE_TYPE.OTHER_DRIVER_DOCUMENT
    );

    if (result) {
      setdisableChooseOtherDocument(
        isMaximunOtherDocument([], adminStore.updateDriver)
      );
      notifySuccess(t(MESSAGES_DELETE_SUCCESS));

      return true;
    }

    return false;
  };

  const uploadDriverFiles = async () => {
    if (cardFront.file) {
      await adminStore.uploadDriverCardFront(cardFront.file, userId);
    }
    if (cardBack.file) {
      await adminStore.uploadDriverCardBack(cardBack.file, userId);
    }
    if (license.file) {
      await adminStore.uploadDriverLicense(license.file, userId);
    }

    if (otherDocuments.files && otherDocuments.files.length) {
      await adminStore.uploadDriverOtherDoc(otherDocuments.files, userId);
      setOtherDocuments({
        files: [],
      });
    }

    getUpdateDriver();
    return true;
  };

  const getUpdateDriver = async () => {
    adminStore.getDriver(userId);
  };

  React.useEffect(() => {
    adminStore.getDriver(userId);
  }, [adminStore, userId]);

  return (
    <>
      <AdminWrapper pageTitle={t(ADMIN_MENU_DRIVER)}>
        <EditDriverFormAdmin
          initialValues={adminStore.updateDriver}
          handleSubmitForm={handleSubmit}
          handleDelete={handleDelete}
          handleUploadCardFront={handleUploadCardFront}
          handleUploadCardBack={handleUploadCardBack}
          handleUploadLicense={handleUploadLicense}
          handleDeleteFiles={handleDelete}
          handleBack={handleBack}
          handleUploadMultipleDocument={handleUploadMultipleDocument}
          handleDeleteOtherDocument={handleDeleteOtherDocument}
          disableChooseOtherDocument={disableChooseOtherDocument}
        />
      </AdminWrapper>
    </>
  );
};

export default observer(EditDriverAdminPage);
