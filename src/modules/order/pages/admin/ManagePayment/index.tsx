import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { TYPE_EXPORT } from '@/libs/constants/type-export.constants';
import { ExportingToDto } from '@/libs/dto/ExportingTo.dto';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';
import { FILTER_TYPE } from '@/libs/enums/filter.enum';
import { CommonStoreContext } from '@/libs/stores/common.store';
import {
  exportAsCSVorXLSAdminOrderPayment,
  formatExportAsCSVCustomerOrderPayment,
} from '@/libs/utils/export.util';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import { I18N } from '@/modules/lang/i18n.enum';
import Message from '@/modules/message/components/Message';
import { MessageDto } from '@/modules/message/message.dto';
import { MESSAGE_TYPE } from '@/modules/message/message.enum';
import { MessageStoreContext } from '@/modules/message/message.store';
import AdminPaymentGrid from '@/modules/order/components/admin/AdminPaymentGrid';
import OrderFilterExport from '@/modules/order/components/FilterExport';
import { OrderStatus } from '@/modules/order/order.constants';
import { ExportOrderListDto, OrderListDto } from '@/modules/order/order.dto';
import { OrderStoreContext } from '@/modules/order/order.store';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import TruckOwnerBankInfoPopup from '@/modules/truckowner/components/BankInfo';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ManageOrderAdminPage = () => {
  const messageStore = React.useContext(MessageStoreContext);
  const adminStore = React.useContext(AdminStoreContext);
  const orderStore = React.useContext(OrderStoreContext);
  const commonStore = React.useContext(CommonStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    MENU_MANAGE_PAYMENTS,
    ORDER_ID,
    ORDER_REFERENCE_NO,
    JOB_ORDER_NOTE,
    FILTER_EXPORT,
    MESSAGES_SELECTED_ITEMS,
    ORDER_STATUS_LABEL,
    ORDER_PROFILE,
    MESSAGES_UPDATE_SUCCESS,
    ORDER_TRUCKOWNER_EMAIL,
    TRUCKOWNER_CUSTOMER_EMAIL,
  } = I18N;

  const [exportCriteriaDto] = React.useState<ExportOrderListDto>({
    ids: [],
    // status
  });

  const [criteriaDto, setCriteriaDto] = React.useState<OrderListDto>({
    take: +pageSizeOptions[1],
    orderBy: 'id',
    orderDirection: 'DESC',
  });

  /*
   * Setting export actions
   */
  const exportingTo: ExportingToDto[] = [
    {
      label: '.XLS',
      action: () => {
        handleExport(TYPE_EXPORT.XLS);
      },
    },
    {
      label: '.CSV',
      action: () => {
        handleExport(TYPE_EXPORT.CSV);
      },
    },
  ];

  /*
   * Seleted ids in grid
   */
  const [ids, setIds] = React.useState<string[]>([]);

  const [filtered, setFiltered] = React.useState<boolean>(false);

  const [truckOwner, setTruckOwner] = React.useState<any>({});

  /*
   * Setting filters
   */
  const filters: FilterByDto[] = [
    {
      key: 'orderId',
      label: t(ORDER_ID),
    },
    {
      key: 'referenceNo',
      label: t(ORDER_REFERENCE_NO),
    },
    {
      key: 'status',
      label: t(ORDER_STATUS_LABEL),
      type: FILTER_TYPE.SELECT,
      options: OrderStatus,
    },
    {
      key: 'truckOwnerEmail',
      label: t(ORDER_TRUCKOWNER_EMAIL),
    },
    {
      key: 'customerEmail',
      label: t(TRUCKOWNER_CUSTOMER_EMAIL),
    },
  ];

  /*
   * Action of search button
   * @param: any e
   * @param: FilterByDto filterType
   * @return: void
   */
  const handleFilter = (e: any, filterType: FilterByDto) => {
    setCriteriaDto({
      skip: 0,
      take: +pageSizeOptions[1],
      searchBy: filterType.key,
      searchKeyword: e.target.search.value,
    });
    setFiltered(true);
  };

  const handleResetFilter = () => {
    setCriteriaDto({
      skip: 0,
      take: +pageSizeOptions[1],
    });
    setFiltered(false);
  };

  /*
   * Action of export action
   * @param: string type
   * @return: void
   */
  const handleExport = async (type: TYPE_EXPORT) => {
    if (ids?.length < 1) {
      const message: MessageDto = {
        key: 'order.export',
        type: MESSAGE_TYPE.DANGER,
        content: t(MESSAGES_SELECTED_ITEMS),
      };
      messageStore.setMessages([message]);
    } else {
      messageStore.removeMessage('order.export');
      exportCriteriaDto.ids = ids;
      exportCriteriaDto.isSelectedAll = isSelectedAll;
      const resultExport = await orderStore.exportPaymentOrderListByAdmin(
        exportCriteriaDto,
        criteriaDto
      );
      const json = formatExportAsCSVCustomerOrderPayment(
        t,
        commonStore.newDateFormat,
        resultExport
      );

      exportAsCSVorXLSAdminOrderPayment(json, 'order', type);
    }
  };
  // -----------------------------
  // Grid Process
  // -----------------------------

  const [showProfile, setShowProfile] = React.useState<boolean>(false);

  const [isSelectedAll, setIsSelectedAll] = React.useState<boolean>(false);

  /*
   * Action of selecting all items
   * @param: string[] items
   * @return: void
   */
  const handleSelectedItems = (items: string[]) => {
    if (items[0] === '-1') setIsSelectedAll(true);
    else setIsSelectedAll(false);
    setIds(items);
  };

  /*
   * Current page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /*
   * Action of change page
   * @param: number page
   * @return: void
   */
  const handleChangePageItem = (page: number) => {
    setCurrentPage(page);
    setCriteriaDto({
      ...criteriaDto,
      skip: page > 1 ? (page - 1) * +pageSizeOptions[1] : 0,
      take: +pageSizeOptions[1],
      orderBy: 'id',
      orderDirection: 'DESC',
    });
  };

  /*
   * Selected tracking order
   */
  const [, setSelectedOrder] = React.useState<any>({});

  const handlePaymentDoneByCustomer = async (
    isDone: boolean,
    orderId: number
  ) => {
    const result = await adminStore.editPaymentDoneByCustomer(isDone, orderId);
    if (result) {
      orderStore.getOrderListByAdmin(criteriaDto);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handlePaymentDoneByTruckOwner = async (
    isDone: boolean,
    orderId: number
  ) => {
    const result = await adminStore.editPaymentDoneByTruckOwner(
      isDone,
      orderId
    );
    if (result) {
      orderStore.getOrderListByAdmin(criteriaDto);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleViewInfoTruckOwner = async (id: number) => {
    const orderById = orderStore.orders.filter((item) => item.id === +id);
    setSelectedOrder(orderById[0]);
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setTruckOwner({});
  };

  React.useEffect(() => {
    async function getOrders() {
      orderStore.getOrderListByAdmin(criteriaDto);
    }
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderStore, criteriaDto]);

  return (
    <>
      <AdminWrapper pageTitle={t(MENU_MANAGE_PAYMENTS)}>
        <OrderFilterExport
          handFilter={handleFilter}
          filters={filters}
          exportingLabel={t(FILTER_EXPORT)}
          exportingTo={exportingTo}
          exportingItems={ids}
          filtered={filtered}
          handleResetFilter={handleResetFilter}
        />
        <Message keyName="message-order" />
        <AdminPaymentGrid
          totals={orderStore.totalCount}
          tooltip={t(JOB_ORDER_NOTE)}
          selectedIds={ids}
          handleSelectedItems={handleSelectedItems}
          handleChangePageItem={handleChangePageItem}
          current={currentPage}
          isSelectedAll={isSelectedAll}
          handleOrderSummary={() => {}}
          className="customer-orders"
          handlePaymentDoneStoreByTruckOwner={handlePaymentDoneByTruckOwner}
          handlePaymentDoneStoreByCustomer={handlePaymentDoneByCustomer}
          handleViewInfo={handleViewInfoTruckOwner}
        />
        <TruckOwnerBankInfoPopup
          title={t(ORDER_PROFILE)}
          show={showProfile}
          handleClose={handleCloseProfile}
          truckOwner={truckOwner}
        />
      </AdminWrapper>
    </>
  );
};

export default observer(ManageOrderAdminPage);
