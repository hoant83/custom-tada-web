import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { CustomerActionsDto } from '@/modules/customer/customer.dto';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { AdminTableDto } from '@/modules/admin-user/admin.dto';
import { getAdminType } from '@/modules/admin-user/admin.constants';
import { ACCOUNT_ROLE } from '../../admin.enum';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  actionType?: string;
  actions?: CustomerActionsDto[];
  handleChangePageItem?: any;
  handleEdit?: any;
  handleDelete?: any;
}

const AdminAccountGrid = (props: ComponentProps) => {
  const adminStore = React.useContext(AdminStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    handleChangePageItem,
    handleEdit,
    handleDelete,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    CUSTOMER_EMAIL,
    CUSTOMER_PHONE,
    CUSTOMER_NAME,
    CUSTOMER_MANAGE_TITLE,
    ADMIN_ROLE,
  } = I18N;

  const [totals, setTotals] = React.useState<number>(0);

  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [items, setItems] = React.useState<AdminTableDto[]>([]);

  const [pagingSize, setPagingSize] = React.useState<number>(
    +pageSizeOptions[1]
  );

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const [currentPageFrame, setCurrentPageFrame] = React.useState<number>(1);

  const maxPage: number = 4;

  const handleChangeSize = (event: any) => {
    setPagingSize(+event.target.value);
    setTotalPage(Math.ceil(totals / +event.target.value));
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setCurrentPageFrame(Math.ceil(page / maxPage));
    handleChangePageItem(page);
  };

  React.useEffect(() => {
    setItems(adminStore.admin);
    setTotals(adminStore.totalCount);
    setTotalPage(Math.ceil(totals / +pageSizeOptions[1]));
  }, [adminStore.admin, adminStore.totalCount, totals]);

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
                      <th>
                        <span>{t('Id')}</span>
                      </th>
                      <th>{t(CUSTOMER_NAME)}</th>
                      <th>{t(CUSTOMER_EMAIL)}</th>
                      <th>{t(CUSTOMER_PHONE)}</th>
                      <th>{t(ADMIN_ROLE)}</th>
                      <th className="col-actions"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: AdminTableDto, index: number) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.email}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{getAdminType(t, item.userType)}</td>
                        <td className="col-actions">
                          {(authStore.loggedUser?.userType ===
                            ACCOUNT_ROLE.SUPERADMIN ||
                            authStore.loggedUser?.email === item.email) && (
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
                                onClick={() => handleDelete(item.id)}
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

export default observer(AdminAccountGrid);
