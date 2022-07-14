import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { USER_ROLE } from '@/modules/account/account.enum';
import { UserRoleLabel } from '@/modules/audit-log/audit-log.constants';
import { AuditLogStoreContext } from '@/modules/audit-log/audit-log.store';
import {
  AuditLogListDto,
  AuditLogTableDto,
} from '@/modules/audit-log/audit.dto';
import AuditLogGrid from '@/modules/audit-log/components/Listing';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import { observer } from 'mobx-react';
import moment from 'moment';
import React, { ChangeEvent } from 'react';
import { Col, Form } from 'react-bootstrap';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useTranslation } from 'react-i18next';

const ManageNotificationAdminPage = () => {
  /*
   * Translation
   */
  const { t } = useTranslation();
  const { AUDIT_LOG_MANAGE_TITLE } = I18N;

  const auditLogStore = React.useContext(AuditLogStoreContext);

  const [totals, setTotals] = React.useState<number>(0);

  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [items, setItems] = React.useState<AuditLogTableDto[]>([]);

  const [pagingSize, setPagingSize] = React.useState<number>(
    +pageSizeOptions[3]
  );

  const [selectedDetail, setSelectedDetail] = React.useState<object>({});

  const [isDetailShow, setIsDetailShow] = React.useState<boolean>(false);

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const [currentPageFrame, setCurrentPageFrame] = React.useState<number>(1);

  const [before, setBefore] = React.useState<moment.Moment>(moment());

  const [after, setAfter] = React.useState<moment.Moment | undefined>(
    undefined
  );

  const maxPage: number = 4;

  const [action, setAction] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [key, setKey] = React.useState<string>('');

  const [role, setRole] = React.useState<USER_ROLE | -1>(-1);

  const [criteriaDto, setCriteriaDto] = React.useState<AuditLogListDto>({
    skip: 0,
    take: pagingSize,
    orderDirection: 'DESC',
    action,
    role,
    email,
    before,
  });

  const handleChangePageItem = (page: number) => {
    setCriteriaDto({
      ...criteriaDto,
      skip: page > 1 ? (page - 1) * pagingSize : 0,
    });
  };

  const handleChangeSize = (event: any) => {
    setPagingSize(+event.target.value);
    setTotalPage(Math.ceil(totals / +event.target.value));
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setCurrentPageFrame(Math.ceil(page / maxPage));
    handleChangePageItem(page);
  };

  const handleTurnOffModal = () => {
    setIsDetailShow(false);
    setSelectedDetail({});
  };

  const handleActionByChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setEmail(event.target.value);
  };

  const handleActionChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setAction(event.target.value);
  };

  const handleKeyChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setKey(event.target.value);
  };

  const handleRoleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setRole(+event.target.value);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      reSetCriteria();
    }
    return event;
  };

  React.useEffect(() => {
    setItems(auditLogStore.auditLogs);
    setTotals(auditLogStore.totalCount);
    setTotalPage(Math.ceil(totals / pagingSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditLogStore.auditLogs, auditLogStore.totalCount, totals]);

  React.useEffect(() => {
    auditLogStore.getAuditLogs(criteriaDto);
  }, [criteriaDto, auditLogStore]);

  const reSetCriteria = () => {
    setCriteriaDto({
      ...criteriaDto,
      action,
      role,
      email,
      before,
      after,
      key,
    });
  };

  React.useEffect(() => {
    reSetCriteria();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, before, after]);

  return (
    <>
      <AdminWrapper pageTitle={t(AUDIT_LOG_MANAGE_TITLE)}>
        <Form>
          <Form.Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Action By / Phone"
                name="search-email"
                onChange={(
                  value: ChangeEvent<
                    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                  >
                ) => handleActionByChange(value)}
                onKeyUp={handleKeyPress}
              />
            </Col>

            <Col>
              <Form.Control
                type="text"
                placeholder="OrderId"
                name="search-key"
                onChange={(
                  value: ChangeEvent<
                    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                  >
                ) => handleKeyChange(value)}
                onKeyUp={handleKeyPress}
              />
            </Col>

            <Col>
              <Form.Control
                type="text"
                placeholder="Action"
                name="search-action"
                onChange={(
                  value: ChangeEvent<
                    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                  >
                ) => handleActionChange(value)}
                onKeyUp={handleKeyPress}
              />
            </Col>

            <Col>
              <Form.Control
                as="select"
                name="search-role"
                onChange={(
                  event: ChangeEvent<
                    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                  >
                ) => handleRoleChange(event)}
              >
                <option key="filter-option-all" value={-1}>
                  All
                </option>
                {UserRoleLabel.map(
                  (item: { key: USER_ROLE; label: I18N }, index) => (
                    <option key={`filter-option-${index}`} value={item.key}>
                      {t(item.label)}
                    </option>
                  )
                )}
              </Form.Control>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Label>From</Form.Label>
              <DateTimePicker value={after} onChange={setAfter} />
            </Col>
            <Col>
              <Form.Label>To</Form.Label>
              <DateTimePicker value={before} onChange={setBefore} />
            </Col>
          </Form.Row>
        </Form>

        <AuditLogGrid
          handleChangePageItem={handleChangePageItem}
          items={items}
          totalPage={totalPage}
          totals={totals}
          currentPageFrame={currentPageFrame}
          maxPage={maxPage}
          isDetailShow={isDetailShow}
          currentPage={currentPage}
          pagingSize={pagingSize}
          selectedDetail={selectedDetail}
          handleChangePage={handleChangePage}
          handleChangeSize={handleChangeSize}
          handleTurnOffModal={handleTurnOffModal}
          setSelectedDetail={setSelectedDetail}
          setIsDetailShow={setIsDetailShow}
        />
      </AdminWrapper>
    </>
  );
};

export default observer(ManageNotificationAdminPage);
