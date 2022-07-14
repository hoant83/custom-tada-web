import React from 'react';
import { observer } from 'mobx-react';

import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { getCompanyName } from '@/libs/utils/normalize.ulti';
import ReactHtmlParser from 'react-html-parser';

import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';

import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { FilterFavoriteTruckOwnerDto } from '@/modules/customer/customer.dto';

import FavouriteForm from '@/modules/customer/components/FavouriteForm';
import ConfirmModal from '@/libs/components/ConfirmModal';
import { toast } from 'react-toastify';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}
const MyFavoriteTruck = (props: ComponentProps) => {
  const customerStore = React.useContext(CustomerStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);

  /*
   * Props of Component
   */
  const { style, className, children } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_RESET,
    MESSAGES_UPDATE_SUCCESS,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_CONFIRM_DELETE,
    MESSAGES_CONFIRM_RESET,
    CUSTOMER_FAVOURITE_TRUCK,
    CUSTOMER_FAVOURITE_TRUCKINFO,
    CUSTOMER_TRUCKOWNER_NAME,
    CUSTOMER_OWNER,
    CUSTOMER_EMAIL,
    CUSTOMER_PHONE,
    CUSTOMER_PARTNER_ID,
  } = I18N;

  /*
   * Set paging size
   */
  const [pagingSize] = React.useState<number>(+pageSizeOptions[1]);

  /*
   * set criteria
   */
  const [criteriaDto, setCriteriaDto] = React.useState<
    FilterFavoriteTruckOwnerDto
  >({
    skip: 0,
    take: +pageSizeOptions[1],
  });

  /*
   * Set current Page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /*
   * Set frame Page
   */
  const [currentPageFrame, setCurrentPageFrame] = React.useState<number>(1);

  /*
   * Set total page
   */
  // const totals: number = items.length;
  const maxPage: number = 4;
  const [totalPage, setTotalPage] = React.useState<number>(0);

  /*
   * set id of row that need to delete
   */
  const [deleteID, setDeleteID] = React.useState<number>(-1);

  /*
   * show hide new/edit driver popup
   */
  const [showConfirmPopup, setShowConfirmPopup] = React.useState<boolean>(
    false
  );

  /*
   * show hide new/edit driver popup
   */
  const [showConfirmResetPopup, setShowConfirmResetPopup] = React.useState<
    boolean
  >(false);

  /*
   * Handle when changing current page
   *
   * @param number page
   * @return void
   */
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setCurrentPageFrame(Math.ceil(page / maxPage));
    setCriteriaDto({
      skip: page > 1 ? (page - 1) * +pageSizeOptions[1] : 0,
      take: +pageSizeOptions[1],
    });
  };

  const handleSubmitForm = async (values: any) => {
    const result = await customerStore.addFavoriteTruckOwner(values.publicId);
    if (result) {
      customerStore.getFavoriteTruckOwner(criteriaDto);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  /*
   * Action of Delete button
   *
   * @param number id
   * @return void
   */
  const handleDelete = async (id: number) => {
    setShowConfirmPopup(true);
    setDeleteID(id);
  };

  const handleOk = async () => {
    setShowConfirmPopup(false);
    if (deleteID) {
      const result = await customerStore.deleteFavoriteTruckOwner(deleteID);
      if (result) {
        setDeleteID(-1);
        customerStore.getFavoriteTruckOwner(criteriaDto);
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  const handleCancelReset = () => {
    setShowConfirmResetPopup(false);
  };

  const handleReset = async () => {
    setShowConfirmResetPopup(true);
  };

  const handleOkReset = async () => {
    const result = await customerStore.resetFavoriteTruckOwner();
    if (result) {
      customerStore.getFavoriteTruckOwner(criteriaDto);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  React.useEffect(() => {
    customerStore.getFavoriteTruckOwner(criteriaDto);
  }, [authStore, customerStore, criteriaDto]);

  React.useEffect(() => {
    setTotalPage(
      Math.ceil(customerStore.totalFavoriteCount / +pageSizeOptions[1])
    );
  }, [customerStore.totalFavoriteCount, customerStore.favoriteTruckOwers]);

  return (
    <>
      {customerStore.favoriteTruckOwers && (
        <Container
          fluid
          className={`block block-table my-favourite table-smaller ${
            className ? className : ''
          }`}
          style={style}
          id="my-favourite"
        >
          <Row>
            <Col xs={12}>
              <h3 className="block-title">{t(CUSTOMER_FAVOURITE_TRUCK)}</h3>
              <div className="block-info">
                <p>{ReactHtmlParser(t(CUSTOMER_FAVOURITE_TRUCKINFO))}</p>
              </div>
            </Col>

            <FavouriteForm handleSubmitForm={handleSubmitForm} />
            <Col xs={12} className="block-content">
              <Table className="table-wrapper">
                <thead>
                  <tr>
                    <th>{t(CUSTOMER_PARTNER_ID)}</th>
                    <th>{t(CUSTOMER_TRUCKOWNER_NAME)}</th>
                    <th>{t(CUSTOMER_OWNER)}</th>
                    <th>{t(CUSTOMER_EMAIL)}</th>
                    <th>{t(CUSTOMER_PHONE)}</th>
                    <th className="col-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {customerStore.favoriteTruckOwers.map(
                    (item: any, index: number) => (
                      <tr key={item.id}>
                        <td data-th={t(CUSTOMER_PARTNER_ID)}>
                          {item.publicId}
                        </td>
                        <td data-th={t(CUSTOMER_TRUCKOWNER_NAME)}>
                          {getCompanyName(item, item.company) ?? '-'}
                        </td>
                        <td data-th={t(CUSTOMER_OWNER)}>
                          {item.firstName ?? '-'}
                        </td>
                        <td data-th={t(CUSTOMER_EMAIL)}>{item.email}</td>
                        <td data-th={t(CUSTOMER_PHONE)}>{item.phoneNumber}</td>
                        <td className="col-actions">
                          <Button
                            variant={BUTTONVARIANT.PRIMARY}
                            onClick={(e) => handleDelete(item.id)}
                            className="btn-icon"
                            size="lg"
                          >
                            <i className="ico ico-delete"></i>
                          </Button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
              {totalPage > 1 && (
                <>
                  <Paging
                    totalPage={totalPage}
                    totals={customerStore.totalEmployees}
                    currentPageFrame={currentPageFrame}
                    maxPage={maxPage}
                    handleChangePage={handleChangePage}
                    current={currentPage}
                    pageSize={pagingSize}
                  />
                </>
              )}
              <ButtonGroup className="block-actions">
                <Button variant="primary" onClick={handleReset}>
                  <span>{t(BUTTONS_RESET)}</span>
                  <i className="ico ico-reset"></i>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          {children}

          <ConfirmModal
            show={showConfirmPopup}
            handleCancel={handleCancel}
            handleOk={handleOk}
          >
            <p>{t(MESSAGES_CONFIRM_DELETE)}</p>
          </ConfirmModal>
          <ConfirmModal
            show={showConfirmResetPopup}
            handleCancel={handleCancelReset}
            handleOk={handleOkReset}
          >
            <p>{t(MESSAGES_CONFIRM_RESET)}</p>
          </ConfirmModal>
        </Container>
      )}
    </>
  );
};

export default observer(MyFavoriteTruck);
