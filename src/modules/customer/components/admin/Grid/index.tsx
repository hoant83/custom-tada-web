/* eslint-disable react-hooks/exhaustive-deps */
import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { CommonStoreContext } from '@/libs/stores/common.store';
import { toTimeFormat } from '@/libs/utils/time.util';
import { getCustomerAccountTypeByValue } from '@/modules/account/account.constants';
import {
  getAccountRole,
  getAccountTypeByCompany,
  getEmailVerifiedStatus,
  getVerifiedStatus,
} from '@/modules/customer/customer.constants';
import { CustomerTableDto } from '@/modules/customer/customer.dto';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Paging

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  selectedIds: string[];
  handleSelectedItems: any;
  totals: number;
  handleEdit: any;
  handleDelete: any;
  handleChangePageItem: any;
  current: number;
  handleVerifyEmail?: any;
  isSelectedAll?: boolean;
}

const CustomerGridAdmin = (props: ComponentProps) => {
  const customerStore = React.useContext(CustomerStoreContext);

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    selectedIds = [],
    handleSelectedItems,
    totals,
    handleEdit,
    handleDelete,
    handleChangePageItem,
    current,
    handleVerifyEmail,
    isSelectedAll,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const commonStore = React.useContext(CommonStoreContext);

  const {
    CUSTOMER_MANAGE_TITLE,
    CUSTOMER_EMAIL,
    CUSTOMER_PHONE,
    CUSTOMER_TYPE_LABEL,
    CUSTOMER_STATUS_LABEL,
    ACCOUNT_TYPE,
    COMPANY_NAME,
    CUSTOMER_EMAIL_STATUS_LABEL,
    CUSTOMER_NEW_TYPE_LABEL,
    ADMIN_LAST_ACTIVE_DATE,
    ADMIN_CREATED_DATE,
  } = I18N;

  /*
   * Seleted ids in grid
   */
  const [ids, setIds] = React.useState<string[]>(selectedIds);

  /*
   * Seleted ids in grid
   */
  const [items, setItems] = React.useState<CustomerTableDto[]>([]);

  /*
   * Selected status
   */
  const [selectedStatus, setSelectedStatus] = React.useState<any[]>([]);

  /*
   * Set paging size
   */
  const [pagingSize, setPagingSize] = React.useState<number>(
    +pageSizeOptions[1]
  );

  /*
   * Set current Page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /*
   * Set frame Page
   */
  const [currentPageFrame, setCurrentPageFrame] = React.useState<number>(
    current
  );

  /*
   * Set total page
   */
  // const totals: number = items.length;
  const maxPage: number = 4;
  const [totalPage, setTotalPage] = React.useState<number>(0);

  /*
   * Handle when select a row
   *
   * @param string value
   * @return void
   */
  const handleSelectedRow = (value: string) => {
    const checkItem = ids.find((item) => item === value);
    if (checkItem) {
      setIds([...ids.filter((item) => item !== value)]);
      handleSelectedItems([...ids.filter((item) => item !== value)]);
    } else {
      setIds([...ids, value]);
      handleSelectedItems([...ids, value]);
    }
  };

  /*
   * Handle when select all items
   *
   * @param any event
   * @return void
   */
  const handleSelectedAll = (checked: boolean) => {
    let tmpItems: any[] = [],
      tmpIds: any[] = [];
    const checkboxes = document.getElementsByName('accountID[]');

    checkboxes.forEach((item: any) => {
      item.checked = checked;
    });

    if (!checked) {
      setIds([]);
      tmpIds = [];
    } else {
      customerStore.customers.forEach((item: any) => {
        tmpItems.push({ id: item.id, checked: checked });
        tmpIds.push(item.id.toString());
      });
      setSelectedStatus(tmpItems);
      setIds(tmpIds);
      tmpIds = ['-1'];
    }
    handleSelectedItems(tmpIds);
  };

  /*
   * Handle when changing page size
   *
   * @param number pageSize
   * @return void
   */
  const handleChangeSize = (event: any) => {
    setPagingSize(+event.target.value);
    setTotalPage(Math.ceil(totals / +event.target.value));
  };

  /*
   * Handle when changing current page
   *
   * @param number page
   * @return void
   */
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setCurrentPageFrame(Math.ceil(page / maxPage));
    handleChangePageItem(page);
  };

  React.useEffect(() => {
    /*
     * Init selected items
     */
    let tmpItems: any[] = [];
    setItems(customerStore.customers);
    customerStore.customers.map((item: any) => {
      if (ids.find((e) => e === item.id?.toString())) {
        tmpItems.push({ id: item.id, checked: true });
      } else {
        tmpItems.push({ id: item.id, checked: false });
      }
      return items;
    });
    setSelectedStatus(tmpItems);
    setTotalPage(Math.ceil(totals / +pageSizeOptions[1]));

    if (isSelectedAll) handleSelectedAll(true);
  }, [customerStore.customers, totals, isSelectedAll]);

  return (
    <>
      {items && (
        <Container
          fluid
          className={`block-orders block-table ${className ? className : ''}`}
          style={style}
        >
          <Row>
            {title && (
              <Col xs={12}>
                <h3 className="block-title">
                  {title ? title : t(CUSTOMER_MANAGE_TITLE)}
                </h3>
              </Col>
            )}
            <Col xs={12} className="block-content">
              <Table responsive="lg">
                <thead>
                  <tr>
                    <th className="col-selected">
                      <Form.Check
                        type="checkbox"
                        onClick={(e: any) =>
                          handleSelectedAll(e.target.checked)
                        }
                        name="allAccountID"
                        checked={isSelectedAll}
                      />
                    </th>
                    <th>
                      <span>ID</span>
                    </th>
                    <th>{t(CUSTOMER_EMAIL)}</th>
                    <th>{t(CUSTOMER_PHONE)}</th>
                    <th>{t(CUSTOMER_TYPE_LABEL)}</th>
                    <th>{t(CUSTOMER_NEW_TYPE_LABEL)}</th>
                    <th>{t(CUSTOMER_STATUS_LABEL)}</th>
                    <th>{t(CUSTOMER_EMAIL_STATUS_LABEL)}</th>
                    <th>{t(ACCOUNT_TYPE)}</th>
                    <th>{t(COMPANY_NAME)}</th>
                    <th>{t(ADMIN_LAST_ACTIVE_DATE)}</th>
                    <th>{t(ADMIN_CREATED_DATE)}</th>
                    <th className="col-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item: CustomerTableDto, index: number) => (
                    <tr key={item.id}>
                      <td className="col-selected">
                        <Form.Check
                          type="checkbox"
                          onChange={() => handleSelectedRow(item.id.toString())}
                          value={item.id}
                          className="order-checked-item"
                          name="accountID[]"
                          defaultChecked={selectedStatus[index]?.checked}
                        />
                      </td>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{getAccountTypeByCompany(t, item.companyId)}</td>
                      <td>
                        {getCustomerAccountTypeByValue(t, item.accountType)}
                      </td>
                      <td>{getVerifiedStatus(t, item.verifiedStatus)}</td>
                      <td>{getEmailVerifiedStatus(t, item.emailVerified)}</td>
                      <td>{getAccountRole(t, item.accountRole)}</td>
                      <td>{item?.companyName ? item.companyName : '-'}</td>
                      <td
                        className="order-created-date-type"
                        data-th={`${t(ADMIN_LAST_ACTIVE_DATE)}: `}
                      >
                        <span className="order-created-date-type-text">
                          {item.lastActiveDate
                            ? toTimeFormat(
                                item.lastActiveDate.toLocaleString(),
                                commonStore.newDateFormat
                              )
                            : '-'}
                        </span>
                      </td>
                      <td
                        className="order-created-date-type"
                        data-th={`${t(ADMIN_CREATED_DATE)}: `}
                      >
                        <span className="order-created-date-type-text">
                          {item.createdDate
                            ? toTimeFormat(
                                item.createdDate.toLocaleString(),
                                commonStore.newDateFormat
                              )
                            : '-'}
                        </span>
                      </td>
                      <td className="col-actions">
                        {!item.emailVerified && (
                          <Button
                            variant={BUTTONVARIANT.PRIMARY}
                            onClick={() => handleVerifyEmail(item.id)}
                            className="btn-icon"
                          >
                            <i className="ico ico-checked"></i>
                          </Button>
                        )}
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
                          onClick={() => handleDelete(item.id)}
                          className="btn-icon"
                          size="lg"
                        >
                          <i className="ico ico-delete"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          {children}
          {totalPage > 1 && (
            <>
              <Paging
                handleChangeSize={handleChangeSize}
                totalPage={totalPage}
                totals={totals}
                currentPageFrame={currentPageFrame}
                maxPage={maxPage}
                handleChangePage={handleChangePage}
                current={currentPage}
                pageSize={pagingSize}
              />
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default observer(CustomerGridAdmin);
