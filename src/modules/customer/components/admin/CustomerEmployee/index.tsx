import React from 'react';
import { observer } from 'mobx-react-lite';
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
import { ACTION_MODE } from '@/libs/enums/action.enum';
import { normalizeName } from '@/libs/utils/normalize.ulti';

import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import {
  FilterEmployeeDto,
  NewEmployeeDto,
} from '@/modules/customer/customer.dto';
import { newEmployeeFormInit } from '@/modules/customer/customer.constants';

import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import {
  getVerifiedStatus,
  getEmployeeType,
} from '@/modules/customer/customer.constants';

import EmployeeFormModal from '@/modules/customer/components/EmployeeFormModal';
import ConfirmModal from '@/libs/components/ConfirmModal';
import { toast } from 'react-toastify';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  customer?: any;
}

const CustomerEmployee = (props: ComponentProps) => {
  const customerStore = React.useContext(CustomerStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);

  /*
   * Props of Component
   */
  const { style, className, children, title, customer } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    CUSTOMER_NAME,
    CUSTOMER_EMAIL,
    CUSTOMER_PHONE,
    CUSTOMER_TYPE_LABEL,
    CUSTOMER_STATUS,
    BUTTONS_ADD_MORE,
    MESSAGES_CONFIRM_DELETE,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_CREATED_SUCCESS,
    MESSAGES_UPDATE_SUCCESS,
  } = I18N;

  /*
   * Set paging size
   */
  const [pagingSize] = React.useState<number>(+pageSizeOptions[1]);

  /*
   * set criteria
   */
  const [criteriaDto, setCriteriaDto] = React.useState<FilterEmployeeDto>({
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

  /*
   * set mode is create or update
   */
  const [mode, setMode] = React.useState<string>(ACTION_MODE.CREATE);

  /*
   * show hide new/edit driver popup
   */
  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  /*
   * show hide new/edit driver popup
   */
  const [showConfirmPopup, setShowConfirmPopup] = React.useState<boolean>(
    false
  );

  /*
   * set driver info
   */
  const [initInfo, setInfo] = React.useState<NewEmployeeDto>(
    newEmployeeFormInit
  );

  /*
   * set id of row that need to delete
   */
  const [deleteID, setDeleteID] = React.useState<number>(-1);

  /*
   * set id of row that need to update
   */
  const [updateID, setUpdateID] = React.useState<number>(-1);

  /*
   * Action of Add more button
   *
   * @param void
   * @return void
   */
  const handleAddMore = () => {
    setInfo(newEmployeeFormInit);
    setShowPopup(true);
    setMode(ACTION_MODE.CREATE);
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
    setMode(ACTION_MODE.DELETE);
  };

  /*
   * Action of Edit button
   *
   * @param number id
   * @return void
   */
  const handleEdit = async (id: number) => {
    const employee = await customerStore.getEmployeeByIdByAdmin(
      id,
      +customer.id
    );
    if (employee) {
      setMode(ACTION_MODE.EDIT);
      setDeleteID(id);
      setUpdateID(id);
      setInfo({
        firstName: employee.firstName,
        phoneNumber: employee.phoneNumber,
        email: employee.email,
        cardNo: employee.cardNo,
        accountRole: employee.accountRole,
      });
      setShowPopup(true);
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (values: any) => {
    customerStore.setEmployeeForm(values);
    if (mode === ACTION_MODE.CREATE) {
      const result = await customerStore.addEmployeeByAdmin(+customer.ownerId);
      if (result) {
        setInfo(newEmployeeFormInit);
        customerStore.getEmployeesByAdmin(criteriaDto, +customer.id);
        customerStore.resetEmployeeForm();
        toast.dismiss();
        toast.success(t(MESSAGES_CREATED_SUCCESS));
        setShowPopup(false);
      }
    }
    if (mode === ACTION_MODE.EDIT) {
      const result = await customerStore.updateEmployeeByAdmin(updateID);
      if (result) {
        setInfo(newEmployeeFormInit);
        customerStore.getEmployeesByAdmin(criteriaDto, +customer.id);
        customerStore.resetEmployeeForm();
        toast.dismiss();
        toast.success(t(MESSAGES_UPDATE_SUCCESS));
        setShowPopup(false);
        setUpdateID(-1);
      }
    }
  };

  const handleDeleteModal = () => {
    setShowConfirmPopup(true);
    setShowPopup(false);
    setMode(ACTION_MODE.DELETE);
  };

  const handleOk = async () => {
    setShowConfirmPopup(false);
    if (deleteID) {
      const result = await customerStore.deleteEmployeeByAdmin(
        deleteID,
        +customer.id
      );
      if (result) {
        setDeleteID(-1);
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
        customerStore.getEmployeesByAdmin(criteriaDto, +customer.id);
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  React.useEffect(() => {
    if (customer.id) {
      customerStore.getEmployeesByAdmin(criteriaDto, +customer.id);
    }
  }, [authStore, customerStore, criteriaDto, customer.id]);

  React.useEffect(() => {
    setTotalPage(Math.ceil(customerStore.totalEmployees / +pageSizeOptions[1]));
  }, [customerStore.totalEmployees, customerStore.employees]);

  return (
    <>
      {true && (
        <Container
          fluid
          className={`block block-table table-smaller ${
            className ? className : ''
          }`}
          style={style}
        >
          <Row>
            {title && (
              <Col xs={12}>
                <h3 className="block-title">{title}</h3>
              </Col>
            )}
            <Col xs={12} className="block-content">
              <Table className="table-wrapper">
                <thead>
                  <tr>
                    <th>{t(CUSTOMER_NAME)}</th>
                    <th>{t(CUSTOMER_EMAIL)}</th>
                    <th>{t(CUSTOMER_PHONE)}</th>
                    <th>{t(CUSTOMER_TYPE_LABEL)}</th>
                    <th>{t(CUSTOMER_STATUS)}</th>
                    <th className="col-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {customerStore.employees.map((item: any, index: number) => (
                    <tr key={item.id}>
                      <td data-th={t(CUSTOMER_NAME)}>
                        {normalizeName(item?.firstName, item.lastName) ?? '-'}
                      </td>
                      <td data-th={t(CUSTOMER_EMAIL)}>{item.email}</td>
                      <td data-th={t(CUSTOMER_PHONE)}>{item.phoneNumber}</td>
                      <td data-th={t(CUSTOMER_TYPE_LABEL)}>
                        {getEmployeeType(t, item.accountRole)}
                      </td>
                      <td data-th={t(CUSTOMER_STATUS)}>
                        <span className="status">
                          {getVerifiedStatus(t, item.verifiedStatus)}
                        </span>
                      </td>
                      <td className="col-actions">
                        {item.accountRole !== 0 && (
                          <>
                            <Button
                              variant={BUTTONVARIANT.PRIMARY}
                              onClick={() => handleEdit(item.id)}
                              className="btn-icon"
                              size="lg"
                            >
                              <i className="ico ico-edit"></i>
                            </Button>
                            <Button
                              variant={BUTTONVARIANT.PRIMARY}
                              onClick={(e) => handleDelete(item.id)}
                              className="btn-icon"
                              size="lg"
                            >
                              <i className="ico ico-delete"></i>
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
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
                <Button variant="primary" onClick={handleAddMore}>
                  <span>{t(BUTTONS_ADD_MORE)}</span>
                  <i className="ico ico-plus"></i>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          {children}

          <EmployeeFormModal
            show={showPopup}
            handleClose={handleClose}
            handleSubmitEmployee={handleSubmit}
            handleDelete={handleDeleteModal}
            mode={mode}
            initialValues={initInfo}
          />
          <ConfirmModal
            show={showConfirmPopup}
            handleCancel={handleCancel}
            handleOk={handleOk}
          >
            <p>{t(MESSAGES_CONFIRM_DELETE)}</p>
          </ConfirmModal>
        </Container>
      )}
    </>
  );
};

export default observer(CustomerEmployee);
