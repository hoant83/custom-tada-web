import Paging from '@/libs/components/Paging';
import { CommonStoreContext } from '@/libs/stores/common.store';
import { toTimeFormat } from '@/libs/utils/time.util';
import { getUserRole } from '@/modules/audit-log/audit-log.constants';
import { AuditLogTableDto } from '@/modules/audit-log/audit.dto';
import { CustomerActionsDto } from '@/modules/customer/customer.dto';
import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { JsonViewer } from '../Detail';

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
  items: AuditLogTableDto[];

  totalPage: number;
  totals: number;
  currentPageFrame: number;
  maxPage: number;
  isDetailShow: boolean;
  currentPage: number;
  pagingSize: number;

  selectedDetail: object;

  handleChangeSize: (event: any) => void;
  handleChangePage: (value: number) => void;
  handleTurnOffModal: () => void;

  setSelectedDetail: (detail: object) => void;
  setIsDetailShow: (value: boolean) => void;
}

const AuditLogGrid = (props: ComponentProps) => {
  const commonStore = React.useContext(CommonStoreContext);

  const { t } = useTranslation();
  const {
    AUDIT_LOG_ACTION,
    AUDIT_LOG_MODULE,
    AUDIT_LOG_CREATED_DATE,
    AUDIT_LOG_CREATED_BY,
    AUDIT_LOG_PHONE_NUMBER,
  } = I18N;

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    // handleChangePageItem,
    items,
    totalPage,
    totals,
    currentPageFrame,
    maxPage,
    currentPage,
    pagingSize,
    isDetailShow,
    selectedDetail,
    handleTurnOffModal,
    setSelectedDetail,
    setIsDetailShow,
    handleChangePage,
    handleChangeSize,
  } = props;

  /*
   * Translation
   */

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
                <h3 className="block-title">{title}</h3>
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
                      <th>{t(AUDIT_LOG_CREATED_BY)}</th>
                      <th>{t(AUDIT_LOG_PHONE_NUMBER)}</th>
                      <th>{t(AUDIT_LOG_CREATED_DATE)}</th>
                      <th>{t(AUDIT_LOG_ACTION)}</th>
                      <th>{t(AUDIT_LOG_MODULE)}</th>
                      <th className="col-actions"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item: AuditLogTableDto, index: number) => (
                      <tr
                        key={item.id}
                        onClick={() => {
                          setSelectedDetail(item.content);
                          setIsDetailShow(true);
                        }}
                      >
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.phoneNumber}</td>
                        <td>
                          {item.createdDate
                            ? toTimeFormat(
                                item.createdDate.toLocaleString(),
                                commonStore.dateTimeFormat
                              )
                            : '-'}
                        </td>
                        <td>{item.action}</td>
                        <td>{getUserRole(t, +item.role)}</td>
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
          <Modal show={isDetailShow} onHide={handleTurnOffModal} centered>
            <Modal.Header>
              <Modal.Title>Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <JsonViewer content={selectedDetail} />
            </Modal.Body>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default observer(AuditLogGrid);
