import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { TYPE_EXPORT } from '@/libs/constants/type-export.constants';
import { ExportingToDto } from '@/libs/dto/ExportingTo.dto';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';
import { FILTER_TYPE } from '@/libs/enums/filter.enum';
import { CommonStoreContext } from '@/libs/stores/common.store';
import {
  exportAsCSVorXLSCustomerOrderPayment,
  formatExportAsCSVCustomerOrderPayment,
} from '@/libs/utils/export.util';
import { paymentTypes } from '@/modules/customer/customer.enum';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { I18N } from '@/modules/lang/i18n.enum';
import Message from '@/modules/message/components/Message';
import { MessageDto } from '@/modules/message/message.dto';
import { MESSAGE_TYPE } from '@/modules/message/message.enum';
import { MessageStoreContext } from '@/modules/message/message.store';
import OrderFilterExport from '@/modules/order/components/FilterExport';
import PaymentGrid from '@/modules/order/components/PaymentGrid';
import { OrderStatus } from '@/modules/order/order.constants';
import { ExportOrderListDto, OrderListDto } from '@/modules/order/order.dto';
import { OrderStoreContext } from '@/modules/order/order.store';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import TruckOwnerBankInfoPopup from '@/modules/truckowner/components/BankInfo';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ManagePaymentPage = () => {
  const orderStore = React.useContext(OrderStoreContext);
  const messageStore = React.useContext(MessageStoreContext);
  const customerStore = React.useContext(CustomerStoreContext);
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
    ORDER_PROFILE,
    MESSAGES_UPDATE_SUCCESS,
    CUSTOMER_TRUCK_OPERATOR,
    ORDER_PAYMENT_TYPE,
    ORDER_PAYMENT_AMOUNT,
    ORDER_STATUS_LABEL,
  } = I18N;

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
      key: 'truckOwnerEmail',
      label: t(CUSTOMER_TRUCK_OPERATOR),
    },
    {
      key: 'paymentType',
      label: t(ORDER_PAYMENT_TYPE),
      type: FILTER_TYPE.SELECT,
      options: paymentTypes,
    },
    {
      key: 'totalPrice',
      label: t(ORDER_PAYMENT_AMOUNT),
    },
    {
      key: 'status',
      label: t(ORDER_STATUS_LABEL),
      type: FILTER_TYPE.SELECT,
      options: OrderStatus.filter((x) => x.payment),
    },
  ];

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

  const [truckOwner, setTruckOwner] = React.useState<any>({});

  /*
   * show hide truck owner profile popup
   */
  const [showProfile, setShowProfile] = React.useState<boolean>(false);

  /*
   * Get list by criteria
   */
  const [criteriaDto, setCriteriaDto] = React.useState<OrderListDto>({
    take: +pageSizeOptions[1],
    orderBy: 'id',
    orderDirection: 'DESC',
  });

  const [isSelectedAll, setIsSelectedAll] = React.useState<boolean>(false);

  const [exportCriteriaDto] = React.useState<ExportOrderListDto>({
    ids: [],
  });

  /*
   * Current page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

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
      orderBy: 'id',
      orderDirection: 'DESC',
      searchBy: filterType.key,
      searchKeyword: e.target.search.value,
    });
  };

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
      const resultExport = await orderStore.exportPaymentOrderListByCustomer(
        exportCriteriaDto
      );
      const json = formatExportAsCSVCustomerOrderPayment(
        t,
        commonStore.newDateFormat,
        resultExport
      );

      exportAsCSVorXLSCustomerOrderPayment(json, 'order', type);
    }
  };

  /*
   * Action of close icon on popup
   * @param: void
   * @return: void
   */
  const handleCloseProfile = () => {
    setShowProfile(false);
    setTruckOwner({});
  };

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
    // setIsSelectedAll(false);
    // setIds([]);
  };

  const handlePaymentDone = async (isDone: boolean, orderId: number) => {
    const result = await customerStore.editPaymentDone(isDone, orderId);
    if (result) {
      orderStore.getOrderPaymentListByCustomer(criteriaDto);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleViewInfoTruckOwner = async (id: number) => {
    const orderById = orderStore.orders.filter((item) => item.id === +id);
    if (orderById[0].owner) {
      const truckowner = await orderStore.getTruckOwnerBank(
        orderById[0].owner.id
      );
      setTruckOwner(truckowner);
    }
    setShowProfile(true);
  };

  const handleSubmitAdditionalPrice = async (values: any) => {
    const result = await orderStore.updateAdditionalPrices(
      values.additionalType,
      values.additionalPrice,
      values.totalPrice,
      values.orderId
    );

    if (result) {
      await orderStore.getOrderPaymentListByCustomer(criteriaDto);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
      return true;
    }

    return false;
  };

  React.useEffect(() => {
    async function getOrders() {
      await orderStore.getOrderPaymentListByCustomer(criteriaDto);
    }
    getOrders();
  }, [criteriaDto, orderStore]);

  return (
    <>
      <WrapperTheme pageTitle={t(MENU_MANAGE_PAYMENTS)}>
        <OrderFilterExport
          handFilter={handleFilter}
          filters={filters}
          exportingLabel={t(FILTER_EXPORT)}
          exportingTo={exportingTo}
          exportingItems={ids}
        />
        <Message className="order-message" keyName="message-order" />
        <PaymentGrid
          totals={orderStore.totalCount}
          tooltip={t(JOB_ORDER_NOTE)}
          selectedIds={ids}
          handleSelectedItems={handleSelectedItems}
          handleChangePageItem={handleChangePageItem}
          current={currentPage}
          isSelectedAll={isSelectedAll}
          handleOrderSummary={() => {}}
          className="customer-orders"
          handlePaymentDoneStore={handlePaymentDone}
          handleViewInfo={handleViewInfoTruckOwner}
          handleSubmitAdditionalPrice={handleSubmitAdditionalPrice}
        />
        <TruckOwnerBankInfoPopup
          title={t(ORDER_PROFILE)}
          show={showProfile}
          handleClose={handleCloseProfile}
          truckOwner={truckOwner}
        />
      </WrapperTheme>
    </>
  );
};

export default observer(ManagePaymentPage);
