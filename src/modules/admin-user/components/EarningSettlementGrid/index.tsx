import React from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';
import { ExportingToDto } from '@/libs/dto/ExportingTo.dto';
import FilterBy from '@/libs/components/FilterBy';
import DateTimePicker from 'react-datetime';
import ExportData from '@/libs/components/ExportData';
import EarningSettlementModal from '../EarningSettlementPayModal';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import { DriverEarningDto } from '../../admin.dto';
import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import moment from 'moment';
import { THEMES } from '@/theme.enum';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import { TYPE_EXPORT } from '@/libs/constants/type-export.constants';
import { exportCSV, exportExcel } from '@/libs/utils/export.util';

/**
 * Props of Component
 */
interface ComponentProps {}

const maxPage: number = 4;
const defaultPerPage = +pageSizeOptions[1];

const EarningSettlementGid = (props: ComponentProps) => {
  /**
   * Theme (admin and truckowner)
   */
  const theme = process.env.REACT_APP_THEME;

  /**
   * Store
   */
  const adminStore = React.useContext(AdminStoreContext);
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);

  /**
   * Translate
   */
  const { t } = useTranslation();
  const {
    COMMISSION_EARNING_AND_SETTLEMENT,
    COMMISSION_TRUCK_OWNER_EMAIL,
    COMMISSION_PARTNER_ID,
    COMMISSION_PAY,
    COMMISSION_DRIVER_PHONE_NO,
    COMMISSION_REMAINING_BALANCE,
    COMMISSION_FROM_MONTH,
    COMMISSION_TO,
    COMMISSION_EXPORT_PAYMENT_HISTORY,
    COMMISSION_DRIVER_NAME,
    COMMISSION_NO_OF_TRIPS,
    COMMISSION_EARNINGS,
    COMMISSION_PAID,
    COMMISSION_PAYMENT_NOTES,
    COMMISSION_AMOUNT,
    COMMISSION_PAID_DATE,
    COMMISSION_PAID_BY,
  } = I18N;

  /**
   * Heading export file CSV and XLS
   */
  const headingExport = [
    { header: t(COMMISSION_DRIVER_NAME), key: 'firstName' },
    { header: t(COMMISSION_DRIVER_PHONE_NO), key: 'phoneNumber' },
    { header: t(COMMISSION_NO_OF_TRIPS), key: 'noOfTrips' },
    { header: t(COMMISSION_EARNINGS), key: 'earnings' },
    { header: t(COMMISSION_PAID), key: 'paid' },
    { header: t(COMMISSION_REMAINING_BALANCE), key: 'remainingBal' },
    { header: t(COMMISSION_PAYMENT_NOTES), key: 'note' },
    { header: t(COMMISSION_AMOUNT), key: 'amount' },
    { header: t(COMMISSION_PAID_DATE), key: 'updatedDate' },
    { header: t(COMMISSION_PAID_BY), key: 'paidBy' },
  ];

  /**
   * State is show Payment Modal
   */
  const [showPayModal, setShowPayModal] = React.useState<boolean>(false);

  /**
   * State storage list drivers earning
   */
  const [drivers, setDrivers] = React.useState<DriverEarningDto[]>([]);

  /**
   * State storage total page of pagination
   */
  const [totalPage, setTotalPage] = React.useState<number>(0);

  /**
   * State storage total of records
   */
  const [totals, setTotals] = React.useState<number>(0);

  /**
   * State storage current page frame
   */
  const [currentPageFrame, setCurrentPageFrame] = React.useState<number>(1);
  /**
   * State storage current page number
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /**
   * State storage page size
   */
  const [pagingSize, setPagingSize] = React.useState<number>(defaultPerPage);

  /**
   * State storage driver phone search
   */
  const [phone, setPhone] = React.useState<string>('');

  /**
   * State storage from month search
   */
  const [from, setFrom] = React.useState<string>('');

  /**
   * State storage to month search
   */
  const [to, setTo] = React.useState<string>('');

  const [filterAdmin, setFilterAdmin] = React.useState<{
    searchBy: string;
    searchKeyword: string;
  }>({ searchBy: '', searchKeyword: '' });

  /**
   * State storage drive selected for payment modal
   */
  const [driverSelected, setDriverSelected] = React.useState<any>(null);

  /**
   * Function close Payment Modal
   */
  const handleClosePayModal = () => {
    setShowPayModal(false);
    setDriverSelected(null);
  };

  /**
   * Function handle when edit payment
   */
  const handleClickEditPay = (driver: any) => {
    setShowPayModal(true);
    setDriverSelected(driver);
  };

  /**
   * Function handle filter for Admin
   */
  const handleFilterAdmin = (e: any, filterType: FilterByDto) => {
    setFilterAdmin({
      searchBy: filterType.key,
      searchKeyword: e.target.search.value,
    });
  };

  /**
   * Function handle filter phone driver
   */
  const handleFilterPhone = (e: any, filterType: FilterByDto) => {
    setPhone(e.target.search.value);
  };

  /**
   * Function handle reset filter for admin
   */
  const handleResetFilterAdmin = () => {
    setFilterAdmin({ searchBy: '', searchKeyword: '' });
  };

  /**
   * Function handle reset filter phone search
   */
  const handleResetFilterPhone = () => {
    setPhone('');
  };

  /**
   * Function handle change from month
   */
  const handleChangeFromMonth = (value: any) => {
    const date = moment(value).format('MM-YYYY');
    setFrom(date);
  };

  /**
   * Function handle changr to month
   */
  const handleChangeToMonth = (value: any) => {
    const date = moment(value).format('MM-YYYY');
    setTo(date);
  };

  /**
   * Function handle change size paging
   */
  const handleChangeSize = (event: any) => {
    setPagingSize(+event.target.value);
    setTotalPage(Math.ceil(totals / +event.target.value));
  };

  /**
   * Function handle change page
   */
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setCurrentPageFrame(Math.ceil(page / maxPage));
  };

  /**
   * Function handle export CSV and XLS
   */
  const handleExport = async (type: TYPE_EXPORT) => {
    const data: any[] = await refetch(true);
    let dataMap: any[] = [];
    data.forEach((e) => {
      const { paymentHistory, ...rest } = e;
      const paymentHistoryMap: any[] = paymentHistory.map((e: any) => {
        let paidBy = '';
        if (e.isCash) {
          paidBy = 'Cash';
        } else if (e.isTransfer) {
          paidBy = 'Transfer';
        } else {
          paidBy = e.othersNote;
        }
        return { ...e, paidBy };
      });
      dataMap.push(rest);
      dataMap.push(...paymentHistoryMap);
    });
    const fileName = `Payment history from ${from} to ${to}`;
    if (type === TYPE_EXPORT.XLS) {
      exportExcel(headingExport, dataMap, fileName);
    } else {
      exportCSV(headingExport, dataMap, fileName);
    }
  };

  /**
   * Array list exporting to
   */
  const exportingTo: ExportingToDto[] = [
    {
      label: '.XLS',
      action: () => {
        handleExport(TYPE_EXPORT.XLS);
      },
    },
    {
      label: '.CSV',
      action: () => {
        handleExport(TYPE_EXPORT.CSV);
      },
    },
  ];

  /**
   * Array list filters for Admin
   */
  const filtersAdmin: FilterByDto[] = [
    {
      key: 'email',
      label: t(COMMISSION_TRUCK_OWNER_EMAIL),
    },
    {
      key: 'id',
      label: t(COMMISSION_PARTNER_ID),
    },
  ];

  /**
   * Array list filters phone driver
   */
  const filtersPhone: FilterByDto[] = [
    {
      key: 'phone',
      label: t(COMMISSION_DRIVER_PHONE_NO),
    },
  ];

  /**
   * Function refetch data from API
   */
  const refetch = (isExport?: boolean): Promise<any> => {
    return new Promise((resolve) => {
      if (theme === THEMES.ADMIN) {
        adminStore
          .getDriversEarning({
            take: pagingSize,
            skip: (currentPage - 1) * pagingSize,
            phone,
            from,
            to,
            searchBy: filterAdmin.searchBy,
            searchKeyword: filterAdmin.searchKeyword,
            isExport,
          })
          .then((driver) => {
            resolve(driver[0]);
            setDrivers(driver[0]);
            setTotals(driver[1]);
            setTotalPage(Math.ceil(driver[1] / defaultPerPage));
          });
      } else if (theme === THEMES.TRUCKOWNER) {
        truckOwnerStore
          .getDriversEarning({
            take: pagingSize,
            skip: (currentPage - 1) * pagingSize,
            phone,
            from,
            to,
            isExport,
          })
          .then((driver) => {
            resolve(driver[0]);
            setDrivers(driver[0]);
            setTotals(driver[1]);
            setTotalPage(Math.ceil(driver[1] / defaultPerPage));
          });
      }
    });
  };

  /**
   * First loading get driver earning
   */
  React.useEffect(() => {
    refetch();
  }, [currentPage, phone, from, to, filterAdmin]);

  return (
    <Container
      fluid
      className={'block block-table black-box-type table-smaller '}
      id="black-box-container"
    >
      <Row className="black-box-check">
        <Col xs={12}>
          <h3 className="block-title">
            {t(COMMISSION_EARNING_AND_SETTLEMENT)}
          </h3>
        </Col>
      </Row>

      <Row>
        {theme === THEMES.ADMIN && (
          <Col xs={12} md={6}>
            <FilterBy
              hideLabel
              handleFilter={handleFilterAdmin}
              filters={filtersAdmin}
              handleResetFilter={handleResetFilterAdmin}
            />
          </Col>
        )}

        <Col xs={12} md={6}>
          <FilterBy
            hideLabel
            handleFilter={handleFilterPhone}
            filters={filtersPhone}
            handleResetFilter={handleResetFilterPhone}
          />
        </Col>
        <Col xs={12} md={theme === THEMES.ADMIN ? 3 : 2}>
          <DateTimePicker
            timeFormat={false}
            dateFormat="MM-YYYY"
            className="fullwidth-datepicker"
            inputProps={{ placeholder: t(COMMISSION_FROM_MONTH) }}
            onChange={handleChangeFromMonth}
          />
        </Col>
        <Col xs={12} md={theme === THEMES.ADMIN ? 3 : 2}>
          <DateTimePicker
            timeFormat={false}
            dateFormat="MM-YYYY"
            className="fullwidth-datepicker"
            inputProps={{ placeholder: t(COMMISSION_TO) }}
            onChange={handleChangeToMonth}
          />
        </Col>
        <Col xs={12} md={theme === THEMES.ADMIN ? 6 : 2}>
          <ExportData
            label={t(COMMISSION_EXPORT_PAYMENT_HISTORY)}
            exportingTo={exportingTo}
            exportingItems={[]}
          />
        </Col>
      </Row>

      <Container fluid className={' block-table'}>
        <Row>
          <Col xs={12} className="block-content">
            <Table responsive="lg">
              <thead>
                <tr>
                  <th>
                    <span>{t(COMMISSION_DRIVER_NAME)}</span>
                  </th>
                  <th>{t(COMMISSION_DRIVER_PHONE_NO)}</th>
                  <th>{t(COMMISSION_NO_OF_TRIPS)}</th>
                  <th>{t(COMMISSION_EARNINGS)}</th>
                  <th>{t(COMMISSION_PAID)}</th>
                  <th>{t(COMMISSION_REMAINING_BALANCE)}</th>
                  <th className="col-actions"></th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver: any, index: number) => (
                  <tr key={index}>
                    <td>{driver.firstName}</td>
                    <td>{driver.phoneNumber}</td>
                    <td>{driver.noOfTrips}</td>
                    <td>{driver.earnings.toLocaleString()}</td>
                    <td>{driver.paid.toLocaleString()}</td>
                    <td>{driver.remainingBal.toLocaleString()}</td>
                    <td className="col-actions col-actions-abs">
                      <Button onClick={() => handleClickEditPay(driver)}>
                        {t(COMMISSION_PAY)}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
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
      <EarningSettlementModal
        show={showPayModal}
        handleClose={handleClosePayModal}
        driver={driverSelected}
        refetch={refetch}
      />
    </Container>
  );
};

export default EarningSettlementGid;
