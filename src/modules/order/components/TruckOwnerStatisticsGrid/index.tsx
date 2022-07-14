import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Table, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { OrderTableDto } from '@/modules/order/order.dto';
import {
  ExportOrderListDto,
  StatisticListDto,
} from '@/modules/order/order.dto';
import FilterBy from '@/libs/components/FilterBy';
import ExportData from '@/libs/components/ExportData';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';
import { ExportingToDto } from '@/libs/dto/ExportingTo.dto';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import adminService from '@/modules/admin-user/admin.service';
import { TYPE_EXPORT } from '@/libs/constants/type-export.constants';
import { exportExcel, exportCSV } from '@/libs/utils/export.util';
import SortTH from '@/libs/components/SortTH';

/*
 * Props of Component
 */
interface ComponentProps {}

const maxPage: number = 4;
const defaultPerPage = +pageSizeOptions[1];

// const filters: FilterByDto[] = [
//   {
//     key: 'email',
//     label: 'email',
//   },
//   {
//     key: 'phone',
//     label: 'phone',
//   },
//   {
//     key: 'name',
//     label: 'name',
//   },
//   {
//     key: 'public_id',
//     label: 'public id',
//   },
// ];

// const headingExport = [
//   { header: 'Truck Owner name', key: 'firstName' },
//   { header: 'email', key: 'email' },
//   { header: 'Completed order', key: 'quantity' },
//   { header: 'Total Revenue', key: 'totalPrice' },
//   { header: 'Earnings', key: 'earnings' },
// ];

const TruckOwnerStatisticsGrid = (props: ComponentProps) => {
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_NO_ITEM,
    FILTER_EXPORT,
    REPORT_TRUCK_OWNER_STATISTICS_TITLE,
    REPORT_EMAIL,
    REPORT_PHONE,
    REPORT_NAME,
    REPORT_PARTNER_ID,
    REPORT_COMPLETED_ORDER,
    REPORT_EARNINGS,
    REPORT_TOTAL_REVENUE,
    REPORT_FROM_DATE,
    REPORT_TO_DATE,
  } = I18N;

  const filters: FilterByDto[] = [
    {
      key: 'email',
      label: t(REPORT_EMAIL),
    },
    {
      key: 'phone',
      label: t(REPORT_PHONE),
    },
    {
      key: 'name',
      label: t(REPORT_NAME),
    },
    {
      key: 'public_id',
      label: t(REPORT_PARTNER_ID),
    },
  ];

  const headingExport = [
    { header: t(REPORT_NAME), key: 'firstName' },
    { header: t(REPORT_EMAIL), key: 'email' },
    { header: t(REPORT_COMPLETED_ORDER), key: 'quantity' },
    { header: t(REPORT_TOTAL_REVENUE), key: 'totalPrice' },
    { header: t(REPORT_EARNINGS), key: 'earnings' },
  ];

  const [items, setItems] = React.useState<OrderTableDto[]>([]);
  const [pagingSize, setPagingSize] = React.useState<number>(defaultPerPage);

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const [currentPageFrame, setCurrentPageFrame] = React.useState<number>(1);

  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [totals, setTotals] = React.useState<number>(0);

  const [criteriaDto, setCriteriaDto] = React.useState<any>({
    skip: 0,
    take: defaultPerPage,
    orderBy: 'id',
    orderDirection: 'DESC',
  });

  const handleChangeSize = (event: any) => {
    setPagingSize(+event.target.value);
    setTotalPage(Math.ceil(totals / +event.target.value));
    setCriteriaDto({
      ...criteriaDto,
      skip: 0,
      take: +event.target.value,
    });
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setCurrentPageFrame(Math.ceil(page / maxPage));
    setCriteriaDto({
      ...criteriaDto,
      skip: page > 1 ? (page - 1) * defaultPerPage : 0,
    });
  };

  const handleFilter = (e: any, filterType: FilterByDto) => {
    setCriteriaDto({
      ...criteriaDto,
      skip: 0,
      searchBy: filterType.key,
      searchKeyword: e.target.search.value,
    });
  };

  const handleResetFilter = () => {
    getData({
      skip: 0,
      take: defaultPerPage,
    });
  };

  useEffect(() => {
    getData(criteriaDto);
  }, [criteriaDto]);

  const getData = async (criteriaDto: any) => {
    const data = await adminService.getTruckOwnerStatistics(criteriaDto);
    setItems(data[0]);
    setTotals(data[1]);
    setTotalPage(Math.ceil(data[1] / defaultPerPage));
  };

  const onChangeFromDate = (date: any) => {
    if (date) {
      setCriteriaDto({
        ...criteriaDto,
        skip: 0,
        fromDate: date.format('YYYY-MM-DD'),
      });
    } else {
      setCriteriaDto({
        ...criteriaDto,
        skip: 0,
        fromDate: '',
      });
    }
  };

  const onChangeToDate = (date: any) => {
    if (date) {
      setCriteriaDto({
        ...criteriaDto,
        skip: 0,
        toDate: date.format('YYYY-MM-DD'),
      });
    } else {
      setCriteriaDto({
        ...criteriaDto,
        skip: 0,
        toDate: '',
      });
    }
  };

  const setSort = (sortType: string) => {
    if (sortType !== criteriaDto.orderBy) {
      setCriteriaDto({
        ...criteriaDto,
        skip: 0,
        orderBy: sortType,
        orderDirection: 'ASC',
      });
    } else {
      setCriteriaDto({
        ...criteriaDto,
        skip: 0,
        orderBy: sortType,
        orderDirection: criteriaDto.orderDirection === 'ASC' ? 'DESC' : 'ASC',
      });
    }
  };

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

  const handleExport = async (type: TYPE_EXPORT) => {
    const data = await adminService.getTruckOwnerStatistics({
      ...criteriaDto,
      isExportAll: true,
    });
    if (type === TYPE_EXPORT.XLS) {
      exportExcel(headingExport, data[0], 'truck-owner-statistics');
    } else {
      exportCSV(headingExport, data[0], 'truck-owner-statistics');
    }
  };

  return (
    <>
      <Container fluid className="block-orders block-table">
        <Row>
          <Col xs={12}>
            <h3 className="block-title">
              {t(REPORT_TRUCK_OWNER_STATISTICS_TITLE)}
            </h3>
          </Col>
          <Col xs={12} md={6}>
            <FilterBy
              hideLabel
              handleFilter={handleFilter}
              filters={filters}
              handleResetFilter={handleResetFilter}
            />
          </Col>
          <Col xs={12} md={2}>
            <DateTimePicker
              timeFormat={false}
              className="fullwidth-datepicker"
              inputProps={{ placeholder: t(REPORT_FROM_DATE) }}
              onChange={onChangeFromDate}
            />
          </Col>
          <Col xs={12} md={2}>
            <DateTimePicker
              timeFormat={false}
              className="fullwidth-datepicker"
              inputProps={{ placeholder: t(REPORT_TO_DATE) }}
              onChange={onChangeToDate}
            />
          </Col>
          <Col xs={12} md={2}>
            <ExportData
              label={t(FILTER_EXPORT)}
              exportingTo={exportingTo}
              exportingItems={[]}
            />
          </Col>
          <Col xs={12} className="block-content">
            <Table className="table-wrapper">
              <thead>
                <tr>
                  <th>{t(REPORT_NAME)}</th>
                  <th>{t(REPORT_EMAIL)}</th>
                  <SortTH
                    title={t(REPORT_COMPLETED_ORDER)}
                    name="quantity"
                    onClick={() => setSort('quantity')}
                    sort={{
                      orderBy: criteriaDto.orderBy,
                      orderDirection: criteriaDto.orderDirection,
                    }}
                  />
                  <SortTH
                    title={t(REPORT_TOTAL_REVENUE)}
                    name="totalPrice"
                    onClick={() => setSort('totalPrice')}
                    sort={{
                      orderBy: criteriaDto.orderBy,
                      orderDirection: criteriaDto.orderDirection,
                    }}
                  />
                  <SortTH
                    title={t(REPORT_EARNINGS)}
                    name="earnings"
                    onClick={() => setSort('earnings')}
                    sort={{
                      orderBy: criteriaDto.orderBy,
                      orderDirection: criteriaDto.orderDirection,
                    }}
                  />
                </tr>
              </thead>
              <tbody>
                {items && items.length > 0 ? (
                  items.map((item: any, index: number) => (
                    <tr>
                      <td>{item.firstName}</td>
                      <td>{item.email}</td>
                      <td>{item.quantity ?? 0}</td>
                      <td>
                        {item.totalPrice ? item.totalPrice.toLocaleString() : 0}
                      </td>
                      <td>
                        {item.earnings ? item.earnings.toLocaleString() : ''}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="table-empty">
                    <td colSpan={12}>{t(ORDER_NO_ITEM)}</td>
                  </tr>
                )}
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
    </>
  );
};

export default observer(TruckOwnerStatisticsGrid);
