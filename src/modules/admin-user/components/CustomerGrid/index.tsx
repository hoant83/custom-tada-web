import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { CustomerTableDto } from '@/modules/customer/customer.dto';
import { CustomerActionsDto } from '@/modules/customer/customer.dto';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { useHistory } from 'react-router-dom';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  actionType?: string;
  actions: CustomerActionsDto[];
  tooltip?: string;
  referenceNo?: boolean;
  selectedIds: string[];
  handleSelectedItems: any;
  totals: number;
}

const CustomerGrid = (props: ComponentProps) => {
  const adminStore = React.useContext(AdminStoreContext);
  const history = useHistory();

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    actionType = 'listing',
    actions,
    tooltip = '',
    referenceNo = true,
    selectedIds = [],
    handleSelectedItems,
    totals,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    CUSTOMER_EMAIL,
    CUSTOMER_STATUS,
    CUSTOMER_PHONE,
    CUSTOMER_NAME,
    CUSTOMER_MANAGE_TITLE,
    ACCOUNT_VERIFIED_STATUS,
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
   * Action of Edit button
   *
   * @param number id
   * @return void
   */
  const handleEdit = (id: number) => {};

  /*
   * Action of Delete button
   *
   * @param number id
   * @return void
   */
  const handleDelete = (id: number) => {
    adminStore.deleteCustomer(id);
    history.push(CUSTOMER_ROUTERS.ADMIN_MANAGE);
  };

  /*
   * Handle when select a row
   *
   * @param string value
   * @return void
   */
  const handleSelectedRow = (value: string) => {
    const checkboxes = document.getElementsByName('orderID[]');
    const allOrderId = document.getElementsByName('allOrderId'),
      checkItem = ids.find((item) => item === value);
    let checked = 0;

    if (checkItem) {
      setIds([...ids.filter((item) => item !== value)]);
      handleSelectedItems([...ids.filter((item) => item !== value)]);
    } else {
      setIds([...ids, value]);
      handleSelectedItems([...ids, value]);
    }
    checkboxes.forEach((item: any) => {
      if (item.checked) checked++;
    });
    if (checked === items.length) {
      allOrderId.forEach((item: any) => {
        item.checked = true;
      });
    } else {
      allOrderId.forEach((item: any) => {
        item.checked = false;
      });
    }
  };

  /*
   * Handle when select all items
   *
   * @param any event
   * @return void
   */
  const handleSelectedAll = (event: any) => {
    let tmpItems: any[] = [],
      tmpIds: any[] = [];
    const checkboxes = document.getElementsByName('orderID[]');
    checkboxes.forEach((item: any) => {
      item.checked = event.target.checked;
    });

    selectedStatus.map((item: any) => {
      tmpItems.push({ id: item.id, checked: event.target.checked });
      tmpIds.push(item.id);
      return selectedStatus;
    });

    if (!event.target.checked) tmpIds = [];
    setSelectedStatus(tmpItems);
    setIds(tmpIds);
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
  };

  React.useEffect(() => {
    /*
     * Init selected items
     */
    let tmpItems: any[] = [];
    setItems(adminStore.customer);
    items.map((item: any) => {
      tmpItems.push({ id: item.id, checked: false });
      return items;
    });
    setSelectedStatus(tmpItems);
    setTotalPage(Math.ceil(totals / +pageSizeOptions[1]));
  }, [items, adminStore.getCustomers, totals]);

  return (
    <>
      {items && (
        <Container
          fluid
          className={`block-orders ${className ? className : ''}`}
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
              <Form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="order-grid"
              >
                <Table responsive="lg">
                  <thead>
                    <tr>
                      <th className="col-selected">
                        <Form.Check
                          type="checkbox"
                          onClick={handleSelectedAll}
                          name="allOrderId"
                        />
                      </th>
                      <th>
                        <span>{t('Customer Id')}</span>
                        {tooltip && (
                          <OverlayTrigger
                            key={'top'}
                            placement={'top'}
                            overlay={
                              <Tooltip id="tooltip-right">{tooltip}</Tooltip>
                            }
                          >
                            <div className="tooltip-icon">
                              <span className="ico ico-faq"></span>
                            </div>
                          </OverlayTrigger>
                        )}
                      </th>
                      <th>{t(CUSTOMER_EMAIL)}</th>
                      <th>{t(CUSTOMER_PHONE)}</th>
                      <th>{t(CUSTOMER_STATUS)}</th>
                      <th className="col-actions"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: CustomerTableDto, index: number) => (
                      <tr key={item.id}>
                        <td className="col-selected">
                          <Form.Check
                            type="checkbox"
                            onChange={() =>
                              handleSelectedRow(item.id.toString())
                            }
                            value={item.id}
                            className="order-checked-item"
                            name="orderID[]"
                            defaultChecked={selectedStatus[index]?.checked}
                          />
                        </td>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.status}</td>
                        <td className="col-actions">
                          <Button
                            variant={BUTTONVARIANT.PRIMARY}
                            onClick={() => handleEdit(4)}
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
              </Form>
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

export default observer(CustomerGrid);
