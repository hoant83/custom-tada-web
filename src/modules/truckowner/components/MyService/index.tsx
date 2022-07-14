import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { I18N } from '@/modules/lang/i18n.enum';
import ServiceForm from '@/modules/truckowner/components/ServiceForm/index';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

const MyService = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);
  /*
   * Props of Component
   */
  const { className, children, title } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { MESSAGES_UPDATE_SUCCESS } = I18N;

  const handleChangeServiceType = async (value: any) => {
    const result = await truckOwnerStore.updateServiceType(
      value,
      authStore.loggedUser.id
    );
    if (result) {
      const user = await truckOwnerStore.getAccountInfo();
      authStore.setLoggedUser(user ?? authStore.loggedUser);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleChangePickupZone = async (values: any) => {
    let data: number[] = [];
    values.forEach((item: any, index: number) => {
      data[index] = item.value;
    });
    const result = await truckOwnerStore.updatePickupZone(
      data,
      authStore.loggedUser.id
    );
    if (result) {
      const user = await truckOwnerStore.getAccountInfo();
      authStore.setLoggedUser(user ?? authStore.loggedUser);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleChangeContainerSize = async (values: any) => {
    let data: string[] = [];
    values.forEach((item: any, index: number) => {
      data[index] = item.value;
    });
    const result = await truckOwnerStore.updateContainerSize(
      data,
      authStore.loggedUser.id
    );
    if (result) {
      const user = await truckOwnerStore.getAccountInfo();
      authStore.setLoggedUser(user ?? authStore.loggedUser);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleChangeNonMotorizedType = async (values: any) => {
    let data: string[] = [];
    values.forEach((item: any, index: number) => {
      data[index] = item.value;
    });
    const result = await truckOwnerStore.updateNonMotorizedType(
      data,
      authStore.loggedUser.id
    );
    if (result) {
      const user = await truckOwnerStore.getAccountInfo();
      authStore.setLoggedUser(user ?? authStore.loggedUser);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleChangeConcatenatedGoodsType = async (values: any) => {
    let data: string[] = [];
    values.forEach((item: any, index: number) => {
      data[index] = item.value;
    });
    const result = await truckOwnerStore.updateConcatenatedGoodsType(
      data,
      authStore.loggedUser.id
    );
    if (result) {
      const user = await truckOwnerStore.getAccountInfo();
      authStore.setLoggedUser(user ?? authStore.loggedUser);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleChangeContractCarType = async (values: any) => {
    let data: string[] = [];
    values.forEach((item: any, index: number) => {
      data[index] = item.value;
    });
    const result = await truckOwnerStore.updateContractCarType(
      data,
      authStore.loggedUser.id
    );
    if (result) {
      const user = await truckOwnerStore.getAccountInfo();
      authStore.setLoggedUser(user ?? authStore.loggedUser);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleChangePayload = async (values: any) => {
    let data: number[] = [];
    values.forEach((item: any, index: number) => {
      data[index] = item.value;
    });
    const result = await truckOwnerStore.updatePayload(
      data,
      authStore.loggedUser.id
    );
    if (result) {
      const user = await truckOwnerStore.getAccountInfo();
      authStore.setLoggedUser(user ?? authStore.loggedUser);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  React.useEffect(() => {
    truckOwnerStore.getAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {authStore.loggedUser && (
        <ServiceForm
          className={className}
          children={children}
          handleChangeServiceType={handleChangeServiceType}
          handleChangePickupZone={(values: any) =>
            handleChangePickupZone(values)
          }
          handleChangePayload={handleChangePayload}
          handleChangeContainerSize={handleChangeContainerSize}
          initialValues={authStore.loggedUser}
          title={title}
          handleChangeNonMotorizedType={handleChangeNonMotorizedType}
          handleChangeConcatenatedGoodsType={handleChangeConcatenatedGoodsType}
          handleChangeContractCarType={handleChangeContractCarType}
        />
      )}
    </>
  );
};

export default observer(MyService);
