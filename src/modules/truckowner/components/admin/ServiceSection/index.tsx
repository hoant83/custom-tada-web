import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import AdminServiceForm from '@/modules/truckowner/components/admin/ServiceForm';

import { toast } from 'react-toastify';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

const ServiceSection = (props: ComponentProps) => {
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
    const result = await truckOwnerStore.updateServiceTypeByAdmin(
      value,
      truckOwnerStore.truckOwnerAdmin.id
    );
    if (result) {
      const user = await truckOwnerStore.getTruckOwnerByIdByAdmin(
        truckOwnerStore.truckOwnerAdmin.id
      );
      truckOwnerStore.truckOwnerAdmin = user ?? truckOwnerStore.truckOwnerAdmin;
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleChangePickupZone = async (values: any) => {
    let data: number[] = [];
    values.forEach((item: any, index: number) => {
      data[index] = item.value;
    });
    const result = await truckOwnerStore.updatePickupZoneByAdmin(
      data,
      truckOwnerStore.truckOwnerAdmin.id
    );
    if (result) {
      const user = await truckOwnerStore.getTruckOwnerByIdByAdmin(
        truckOwnerStore.truckOwnerAdmin.id
      );
      truckOwnerStore.truckOwnerAdmin = user ?? truckOwnerStore.truckOwnerAdmin;
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleChangeContainerSize = async (values: any) => {
    let data: string[] = [];
    values.forEach((item: any, index: number) => {
      data[index] = item.value;
    });
    const result = await truckOwnerStore.updateContainerSizeByAdmin(
      data,
      truckOwnerStore.truckOwnerAdmin.id
    );
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleChangePayload = async (values: any) => {
    let data: number[] = [];
    values.forEach((item: any, index: number) => {
      data[index] = item.value;
    });
    const result = await truckOwnerStore.updatePayloadByAdmin(
      data,
      truckOwnerStore.truckOwnerAdmin.id
    );
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  React.useEffect(() => {}, [truckOwnerStore, truckOwnerStore.truckOwnerAdmin]);

  return (
    <>
      {truckOwnerStore.truckOwnerAdmin && (
        <AdminServiceForm
          className={className}
          children={children}
          handleChangeServiceType={handleChangeServiceType}
          handleChangePickupZone={(values: any) =>
            handleChangePickupZone(values)
          }
          initialValues={truckOwnerStore.truckOwnerAdmin}
          handleChangeContainerSize={handleChangeContainerSize}
          handleChangePayload={handleChangePayload}
          title={title}
        />
      )}
    </>
  );
};

export default observer(ServiceSection);
