import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import CustomerAcceptProfilePopup from '@/modules/customer/components/AcceptProfilePopup';
import { I18N } from '@/modules/lang/i18n.enum';
import NewOrderGrid from '@/modules/order/components/NewOrderGrid';
import { OrderListDto } from '@/modules/order/order.dto';
import { ORDER_STATUS } from '@/modules/order/order.enum';
import { OrderStoreContext } from '@/modules/order/order.store';
import { observer } from 'mobx-react';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface ComponentProps {
  handleStep: any;
}

const NewOrderPage = (props: ComponentProps) => {
  const orderStore = React.useContext(OrderStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);
  const pageSize: number = 2;

  const { handleStep } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { JOB_THANKYOU_TITLE, ORDER_NEW_FILTER } = I18N;

  /*
   * Current page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /*
   * show hide customer profile popup
   */
  const [showProfile, setShowProfile] = React.useState<boolean>(false);

  /*
   * Selected tracking order
   */
  const [, setSelectedOrder] = React.useState<object>({});

  const [isViewAll, setIsViewAll] = React.useState<boolean>(false);

  const handleCloseProfile = () => {
    setShowProfile(false);
    handleStep(true);
  };
  /*
   * Get list by criteria
   */
  const [criteriaDto, setCriteriaDto] = React.useState<OrderListDto>({
    skip: 0,
    take: pageSize,
    orderBy: 'id',
    orderDirection: 'DESC',
    order: {
      status: ORDER_STATUS.ASSIGNING,
    },
    searchBy: '',
    searchKeyword: '',
  });

  const handleChangePageItem = (page: number) => {
    setCurrentPage(page);
    orderStore.getNewOrders({
      skip: page > 1 ? (page - 1) * pageSize : 0,
      take: 2,
      orderBy: 'id',
      orderDirection: 'DESC',
      order: {
        status: ORDER_STATUS.ASSIGNING,
      },
      searchBy: '',
      searchKeyword: '',
      isGetAll: isViewAll,
    });
  };

  const handleAcceptOrder = async (id: string) => {
    await orderStore.acceptOrder(id);
    const orderById = await orderStore.newOrders.filter(
      (item) => item.id === +id
    );

    if (orderById[0].createdByCustomerId) {
      await orderStore.getCustomerInfo(orderById[0].createdByCustomerId);
      setSelectedOrder(orderById[0]);
      setShowProfile(true);
    }

    if (orderById[0].createdByAdminId) {
      await orderStore.getAdminInfo(orderById[0].createdByAdminId);
      setSelectedOrder(orderById[0]);
      setShowProfile(true);
    }
  };

  const handleFilterNewOrder = async (isViewAll: boolean) => {
    setCriteriaDto({ ...criteriaDto, isGetAll: isViewAll });
  };

  React.useEffect(() => {
    if (authStore.loggedUser?.id) {
      orderStore.getNewOrders(criteriaDto);
    }
  }, [orderStore, criteriaDto, authStore.loggedUser]);

  return (
    <>
      <Form.Check
        className=""
        inline
        type="checkbox"
        onChange={() => {
          handleFilterNewOrder(!isViewAll);
          setIsViewAll(!isViewAll);
        }}
        label={t(ORDER_NEW_FILTER)}
        id="isViewAll"
      />
      <NewOrderGrid
        totals={orderStore.totalCountNewOrders}
        handleChangePageItem={handleChangePageItem}
        handleAcceptOrder={handleAcceptOrder}
        current={currentPage}
      />
      <CustomerAcceptProfilePopup
        title={t(JOB_THANKYOU_TITLE)}
        show={showProfile}
        handleClose={handleCloseProfile}
        customer={orderStore.customerData}
      />
    </>
  );
};

export default observer(NewOrderPage);
