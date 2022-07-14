import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import ActionBar from '@/modules/theme/components/ActionBar';
import { ActionBarDto } from '@/modules/theme/theme.dto';
import NotificationFormModal from '@/modules/notification/components/NotificationFormModal';
import { toast } from 'react-toastify';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import {
  NotificationListDto,
  NotificationStoreContext,
} from '@/modules/notification/notification.store';
import NotificationGrid from '@/modules/notification/components/NotificationGrid';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';
import FilterBy from '@/libs/components/FilterBy';
import NotificationDetailModal from '@/modules/notification/components/NotificationDetailModal';

const ManageNotificationAdminPage = () => {
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    NOTIFICATION_MANAGE_TITLE,
    BUTTONS_ADD_NEW,
    MESSAGES_CREATED_SUCCESS,
  } = I18N;

  const notificationStore = React.useContext(NotificationStoreContext);

  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  const [sendToCustomer, setSendToCustomer] = React.useState<boolean>(false);
  const [sendToTruckOwner, setSendToTruckOwner] = React.useState<boolean>(
    false
  );
  const [showNoti, setShowNoti] = React.useState<boolean>(false);
  const [sendToDriver, setSendToDriver] = React.useState<boolean>(false);
  const [actionsBar] = React.useState<ActionBarDto[]>([
    {
      label: BUTTONS_ADD_NEW,
      type: 'primary',
      action: () => {
        handleCreate();
      },
    },
  ]);

  const handleCloseNoti = () => {
    setShowNoti(false);
  };

  const [filtered, setFiltered] = React.useState<boolean>(false);

  const [filteredKey, setFilteredKey] = React.useState<any>({
    searchKeyword: '',
    searchBy: '',
  });

  const [criteriaDto, setCriteriaDto] = React.useState<NotificationListDto>({
    skip: 0,
    take: +pageSizeOptions[1],
    orderDirection: 'DESC',
  });

  const handleCreate = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleSendToCustomer = (value: any) => {
    setSendToCustomer(value);
  };

  const handleSendToTruckOwner = (value: any) => {
    setSendToTruckOwner(value);
  };

  const handleSendToDriver = (value: any) => {
    setSendToDriver(value);
  };

  const handleSubmit = async (values: any) => {
    values.sendToCustomer = sendToCustomer;
    values.sendToTruckOwner = sendToTruckOwner;
    values.sendToDriver = sendToDriver;

    notificationStore.setNotificationForm(values);
    const result = await notificationStore.addNotification();
    if (result) {
      setSendToCustomer(false);
      setSendToTruckOwner(false);
      setSendToDriver(false);
      notificationStore.getNotifications(criteriaDto);
      notificationStore.resetMotificationForm();
      toast.dismiss();
      toast.success(t(MESSAGES_CREATED_SUCCESS));
      setShowPopup(false);
    }
  };

  const handleChangePageItem = (page: number) => {
    setCriteriaDto({
      skip: page > 1 ? (page - 1) * +pageSizeOptions[1] : 0,
      take: +pageSizeOptions[1],
      searchBy: filteredKey.searchBy,
      searchKeyword: filteredKey.searchKey,
      orderDirection: 'DESC',
    });
  };

  const handleFilter = (e: any, filterType: FilterByDto) => {
    setFilteredKey({
      searchKeyword: filterType.key,
      searchBy: e.target.search.value,
    });
    setCriteriaDto({
      skip: 0,
      take: +pageSizeOptions[1],
      searchBy: filterType.key,
      searchKeyword: e.target.search.value,
      orderDirection: 'DESC',
    });
    setFiltered(true);
  };

  const [selectedNoti, setSelectedNoti] = React.useState<any>({});

  const handleViewNoti = async (id: number) => {
    const result = await notificationStore.getNoti(id);
    if (result) {
      setSelectedNoti(notificationStore.selectedNoti);
      setShowNoti(true);
    }
  };

  /*
   * Setting filters
   */
  const filters: FilterByDto[] = [
    {
      key: '',
      label: '',
    },
  ];

  const handleResetFilter = () => {
    setCriteriaDto({
      skip: 0,
      take: +pageSizeOptions[1],
      orderDirection: 'DESC',
    });
    setFiltered(false);
  };

  React.useEffect(() => {
    notificationStore.getNotifications(criteriaDto);
  }, [criteriaDto, notificationStore]);

  return (
    <>
      <AdminWrapper pageTitle={t(NOTIFICATION_MANAGE_TITLE)}>
        <ActionBar actions={actionsBar} />
        <FilterBy
          handleFilter={handleFilter}
          filters={filters}
          filtered={filtered}
          handleResetFilter={handleResetFilter}
          className="noti-filter"
        />
        <NotificationGrid
          handleChangePageItem={handleChangePageItem}
          handleViewNoti={handleViewNoti}
        />

        <NotificationDetailModal
          show={showNoti}
          handleClose={handleCloseNoti}
          notiData={selectedNoti}
        />
        <NotificationFormModal
          show={showPopup}
          handleSendToCustomer={handleSendToCustomer}
          handleSendToTruckOwner={handleSendToTruckOwner}
          handleSendToDriver={handleSendToDriver}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      </AdminWrapper>
    </>
  );
};

export default observer(ManageNotificationAdminPage);
