import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Table, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { CustomerActionsDto } from '@/modules/customer/customer.dto';
import {
  NotificationStoreContext,
  NotificationTableDto,
} from '@/modules/notification/notification.store';
import { toTimeFormat } from '@/libs/utils/time.util';
import { CommonStoreContext } from '@/libs/stores/common.store';
import { SOURCE } from '../../notification.constants';
import { getSendTo } from '@/libs/utils/normalize.ulti';

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
  tooltip?: string;
  handleChangePageItem?: any;
  handleViewNoti: any;
}

const NotificationGrid = (props: ComponentProps) => {
  const notificationStore = React.useContext(NotificationStoreContext);
  const commonStore = React.useContext(CommonStoreContext);

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    handleChangePageItem,
    handleViewNoti,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    CUSTOMER_MANAGE_TITLE,
    NOTIFICATION_TITLE,
    NOTIFICATION_BODY,
    NOTIFICATION_CREADTED_DATE,
    NOTIFICATION_SEND_TO,
    NOTIFICATION_CREATED_BY,
    NOTIFICATION_SYSTEM,
    NOTIFICATION_MANUAL,
  } = I18N;

  const [totals, setTotals] = React.useState<number>(0);

  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [items, setItems] = React.useState<NotificationTableDto[]>([]);

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
    setItems(notificationStore.notificationsTableList);
    setTotals(notificationStore.totalCount);
    setTotalPage(Math.ceil(totals / +pageSizeOptions[1]));
  }, [
    notificationStore.notificationsTableList,
    notificationStore.totalCount,
    totals,
  ]);

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
                      <th>{t(NOTIFICATION_TITLE)}</th>
                      <th>{t(NOTIFICATION_BODY)}</th>
                      <th>{t(NOTIFICATION_SEND_TO)}</th>
                      <th>{t(NOTIFICATION_CREATED_BY)}</th>
                      <th>{t(NOTIFICATION_CREADTED_DATE)}</th>
                      <th className="col-actions"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: NotificationTableDto, index: number) => (
                      <tr
                        key={item.id}
                        className="noti-row"
                        onClick={() => handleViewNoti(item.id)}
                      >
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                        <td>
                          {getSendTo(
                            item.sendToCustomer,
                            item.sendToTruck,
                            item.sendToDriver,
                            item
                          )}
                        </td>
                        <td>
                          {item.source === SOURCE.SYSTEM
                            ? t(NOTIFICATION_SYSTEM)
                            : `${t(NOTIFICATION_MANUAL)}: ${
                                item.createdByEmail ? item.createdByEmail : ''
                              }`}
                        </td>
                        <td>
                          {item.createdDate
                            ? toTimeFormat(
                                item.createdDate.toLocaleString(),
                                commonStore.dateTimeFormat
                              )
                            : '-'}
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

export default observer(NotificationGrid);
