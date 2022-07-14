import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import { DriverTableDto } from '@/modules/driver/driver.dto';

// Paging

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  totals: number;
  handleRestore: any;
  handleChangePageItem: any;
  current: number;
}

const DeletedDriverGridAdmin = (props: ComponentProps) => {
  const adminStore = React.useContext(AdminStoreContext);

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    totals,
    handleRestore,
    handleChangePageItem,
    current,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { CUSTOMER_MANAGE_TITLE, CUSTOMER_EMAIL, CUSTOMER_PHONE } = I18N;

  /*
   * Seleted ids in grid
   */
  const [items, setItems] = React.useState<DriverTableDto[]>([]);

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
    setItems(adminStore.deletedDriver);
    items.map((item: any) => {
      tmpItems.push({ id: item.id, checked: false });
      return items;
    });
    setTotalPage(Math.ceil(totals / +pageSizeOptions[1]));
  }, [items, adminStore.deletedDriver, totals]);

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
                    <th>
                      <span>ID</span>
                    </th>
                    <th>{t(CUSTOMER_EMAIL)}</th>
                    <th>{t(CUSTOMER_PHONE)}</th>
                    <th className="col-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item: DriverTableDto, index: number) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneNumber}</td>
                      <td className="col-actions">
                        <Button
                          variant={BUTTONVARIANT.PRIMARY}
                          onClick={() => handleRestore(item.id)}
                          className="btn-icon"
                          size="lg"
                        >
                          <i className="ico ico-reset"></i>
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

export default observer(DeletedDriverGridAdmin);
