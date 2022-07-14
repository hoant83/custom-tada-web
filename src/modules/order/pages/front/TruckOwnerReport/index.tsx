import ReportOptions from '@/libs/components/ReportOptions';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { TYPE_EXPORT } from '@/libs/constants/type-export.constants';
import { ExportingToDto } from '@/libs/dto/ExportingTo.dto';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';
import { SelectMonthDto, SelectYearDto } from '@/libs/dto/SelectMonth.dto';
import { exportAsCSV, exportAsXLS } from '@/libs/utils/export.util';
import { I18N } from '@/modules/lang/i18n.enum';
import Message from '@/modules/message/components/Message';
import { MessageDto } from '@/modules/message/message.dto';
import { MESSAGE_TYPE } from '@/modules/message/message.enum';
import { MessageStoreContext } from '@/modules/message/message.store';
import OrderFilterExport from '@/modules/order/components/FilterExport';
import ReportOrderGrid from '@/modules/order/components/ReportOrderGrid';
import SummaryOrder from '@/modules/order/components/SumaryOrder';
import { ExportOrderListDto, OrderListDto } from '@/modules/order/order.dto';
import { OrderStoreContext } from '@/modules/order/order.store';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import { observer } from 'mobx-react';
import moment from 'moment/moment';
import React from 'react';
import Chart from 'react-apexcharts';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ReportTruckOwnerPage = () => {
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);
  const orderStore = React.useContext(OrderStoreContext);
  const messageStore = React.useContext(MessageStoreContext);

  const { t } = useTranslation();
  const {
    CUSTOMER_REPORT_TITLE,
    REPORT_COMPLETED,
    REPORT_PENDING,
    REPORT_CANCELLED,
    REPORT_TITLE_OF_ORDER_CHART,
    REPORT_TITLE_OF_TRUCKOWNER_CHART,
    FILTER_EXPORT,
    ORDER_ID,
    ORDER_REFERENCE_NO,
    ORDER_SUMMARY_TITLE,
    ORDER_SUMMARY_TRUCKOWNER_TITLE,
    ORDER_SUMMARY_DRIVERS_TITLE,
    ORDER_SUMMARY_TRUCKS_TITLE,
    ORDER_SUMMARY_CREATEDBY_TITLE,
    MESSAGES_SELECTED_ITEMS,
    ORDER_CURENCY,
  } = I18N;

  const [criteriaDto, setCriteriaDto] = React.useState<OrderListDto>({
    take: +pageSizeOptions[1],
    orderBy: 'id',
    orderDirection: 'DESC',
  });

  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const [clickViewTable, setClickViewTable] = React.useState<boolean>(false);

  const [thisMonth, setThisMonth] = React.useState<number>(moment().month());
  const [thisYear, setThisYear] = React.useState<number>(moment().year());
  const [indexOfCustomer, setIndexOfCustomer] = React.useState<number>(-1);
  const [currentClickViewTable, setCurrentClickViewTable] = React.useState<
    any
  >();

  const selectYear: SelectYearDto[] = [];
  const [ids, setIds] = React.useState<string[]>([]);

  const [isSelectedAll, setIsSelectedAll] = React.useState<boolean>(false);

  const [showSummary, setShowSummary] = React.useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = React.useState<any>({});

  const [truckOwner, setTruckOwner] = React.useState<any>({});
  const [drivers, setDrivers] = React.useState<any>([]);
  const [trucks, setTrucks] = React.useState<any>([]);
  const [notes, setNotes] = React.useState<any>([]);
  const [createdBy, setCreatedBy] = React.useState<any>({});

  const [exportCriteriaDto] = React.useState<ExportOrderListDto>({
    ids: [],
  });

  /*
   * Setting filters
   */
  const filters: FilterByDto[] = [
    {
      key: 'orderId',
      label: t(ORDER_ID),
    },
    {
      key: 'referenceNo',
      label: t(ORDER_REFERENCE_NO),
    },
  ];

  /*
   * Setting export actions
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

  const handleExport = async (type: TYPE_EXPORT) => {
    if (ids?.length < 1) {
      const message: MessageDto = {
        key: 'order.export',
        type: MESSAGE_TYPE.DANGER,
        content: t(MESSAGES_SELECTED_ITEMS),
      };
      messageStore.setMessages([message]);
    } else {
      messageStore.removeMessage('order.export');
      exportCriteriaDto.ids = ids;
      exportCriteriaDto.isSelectedAll = isSelectedAll;
      let typeOrders: string = '';
      let resultExport: any;
      if (currentClickViewTable === indexOfCustomer) {
        const customerInfo = truckOwnerStore.customerInfo[indexOfCustomer]
          ? truckOwnerStore.customerInfo[indexOfCustomer].split(',')
          : null;
        const emailCustomer = customerInfo[customerInfo.length - 1];
        typeOrders = emailCustomer;

        resultExport = await orderStore.exportReportCustomerListByTruckOwner(
          exportCriteriaDto,
          thisMonth,
          thisYear,
          typeOrders
        );
      } else {
        if (currentClickViewTable === t(REPORT_PENDING)) {
          typeOrders = t(REPORT_PENDING);
        }
        if (currentClickViewTable === t(REPORT_COMPLETED)) {
          typeOrders = t(REPORT_COMPLETED);
        }
        if (currentClickViewTable === t(REPORT_CANCELLED)) {
          typeOrders = t(REPORT_CANCELLED);
        }

        resultExport = await orderStore.exportReportOrderListByTruckOwner(
          exportCriteriaDto,
          thisMonth,
          thisYear,
          typeOrders
        );
      }

      if (type === TYPE_EXPORT.XLS) {
        exportAsXLS(resultExport, 'order');
      }
      if (type === TYPE_EXPORT.CSV) {
        exportAsCSV(resultExport, 'order');
      }
    }
  };

  const handleFilter = (e: any, filterType: FilterByDto) => {
    setCriteriaDto({
      skip: 0,
      take: +pageSizeOptions[1],
      orderBy: 'id',
      orderDirection: 'DESC',
      searchBy: filterType.key,
      searchKeyword: e.target.search.value,
    });
  };

  const handleChangePageItem = (page: number) => {
    setCurrentPage(page);
    setCriteriaDto({
      skip: page > 1 ? (page - 1) * +pageSizeOptions[1] : 0,
      take: +pageSizeOptions[1],
      orderBy: 'id',
      orderDirection: 'DESC',
    });
  };

  const handleCompletedOrderCLick = async () => {
    const month = localStorage.getItem('reportMonth')
      ? Number(localStorage.getItem('reportMonth'))
      : thisMonth;
    const year = localStorage.getItem('reportYear')
      ? Number(localStorage.getItem('reportYear'))
      : thisYear;
    await orderStore.getCompletedOrderListByTruckOwner(
      criteriaDto,
      month,
      year
    );
    setClickViewTable(true);
  };

  const handlePendingOrderCLick = async () => {
    const month = localStorage.getItem('reportMonth')
      ? Number(localStorage.getItem('reportMonth'))
      : thisMonth;
    const year = localStorage.getItem('reportYear')
      ? Number(localStorage.getItem('reportYear'))
      : thisYear;
    await orderStore.getPendingOrderListByTruckOwner(criteriaDto, month, year);
    setClickViewTable(true);
  };

  const handleCancelledOrderCLick = async () => {
    const month = localStorage.getItem('reportMonth')
      ? Number(localStorage.getItem('reportMonth'))
      : thisMonth;
    const year = localStorage.getItem('reportYear')
      ? Number(localStorage.getItem('reportYear'))
      : thisYear;
    await orderStore.getCancelledOrderListByTruckOwner(
      criteriaDto,
      month,
      year
    );
    setClickViewTable(true);
  };

  const handleCustomerClick = async (index: number) => {
    const month = localStorage.getItem('reportMonth')
      ? Number(localStorage.getItem('reportMonth'))
      : thisMonth;
    const year = localStorage.getItem('reportYear')
      ? Number(localStorage.getItem('reportYear'))
      : thisYear;

    const customerInfo = await truckOwnerStore.customerInfo[index].split(',');
    const emailCustomer = customerInfo[customerInfo.length - 1];

    await orderStore.getCustomerOrderListByTruckOwner(
      criteriaDto,
      month,
      year,
      emailCustomer
    );
    setClickViewTable(true);
  };

  const handleSelectedItems = (items: string[]) => {
    if (items[0] === '-1') setIsSelectedAll(true);
    else setIsSelectedAll(false);
    setIds(items);
  };

  const handleViewTruckOp = async (id: number) => {
    const truckOwner = await orderStore.getTruckOwnerInfo(id);
    if (truckOwner) {
      setTruckOwner(truckOwner);
    }
  };

  const resetData = () => {
    setTruckOwner(null);
    setTrucks(null);
    setDrivers(null);
    setNotes(null);
    setCreatedBy(null);
  };

  const handleOrderSummary = async (id: number) => {
    resetData();
    const order = await orderStore.getOrderById(id);
    if (order?.driversData?.length > 0) {
      setDrivers(order.driversData);
    }
    if (order.createdByData) {
      setCreatedBy(order.createdByData);
    }
    if (order.trucks.length > 0) {
      setTrucks(order.trucks);
    }
    if (order.notes.length > 0) {
      setNotes(order.notes);
    }
    handleViewTruckOp(id);
    setSelectedOrder(order);
    setShowSummary(true);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  const handleChangeMonth = (month: SelectMonthDto) => {
    setThisMonth(month.value);
    localStorage.setItem('reportMonth', month.value.toString());
  };

  const handleChangeYear = (year: SelectYearDto) => {
    setThisYear(year.value);
    localStorage.setItem('reportYear', year.value.toString());
  };

  (() => {
    for (let y = truckOwnerStore.beginYear; y <= truckOwnerStore.endYear; y++) {
      selectYear.push({
        label: y,
        value: y,
      });
    }
  })();

  const state = {
    series: [
      truckOwnerStore.completedOrders,
      truckOwnerStore.pendingOrders,
      truckOwnerStore.cancelledOrders,
    ],
    options: {
      chart: {
        events: {
          dataPointSelection: function (
            event: any,
            chartContext: any,
            config: any
          ) {
            setCurrentPage(1);
            if (
              config.w.config.labels[config.dataPointIndex] ===
              t(REPORT_COMPLETED)
            ) {
              setCurrentClickViewTable(t(REPORT_COMPLETED));
              handleCompletedOrderCLick();
            } else if (
              config.w.config.labels[config.dataPointIndex] ===
              t(REPORT_PENDING)
            ) {
              setCurrentClickViewTable(t(REPORT_PENDING));
              handlePendingOrderCLick();
            } else if (
              config.w.config.labels[config.dataPointIndex] ===
              t(REPORT_CANCELLED)
            ) {
              setCurrentClickViewTable(t(REPORT_CANCELLED));
              handleCancelledOrderCLick();
            }
          },
        },
      },
      labels: [t(REPORT_COMPLETED), t(REPORT_PENDING), t(REPORT_CANCELLED)],
      title: {
        text: t(REPORT_TITLE_OF_ORDER_CHART),
        offsetX: 120,
        margin: 20,
        style: {
          fontSize: '17px',
        },
      },
      colors: ['#FAB91A', '#35bdac', '#007bff'],
    },
  };

  const customerState = {
    series: [{ name: 'Orders', data: truckOwnerStore.customerSeries }],
    options: {
      chart: {
        events: {
          dataPointSelection: function (
            event: any,
            chartContext: any,
            config: any
          ) {
            setCurrentPage(1);
            setIndexOfCustomer(config.dataPointIndex);
            setCurrentClickViewTable(config.dataPointIndex);
            handleCustomerClick(config.dataPointIndex);
          },
        },
      },
      xaxis: {
        categories: truckOwnerStore.customerLabels,
      },

      title: {
        text: t(REPORT_TITLE_OF_TRUCKOWNER_CHART),
        offsetX: 20,
        margin: 20,
        style: {
          fontSize: '17px',
        },
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 0,
        formatter: (seriesName: any, opts: any) => {
          return `${truckOwnerStore.customerRevenue[opts.seriesIndex]} (${t(
            ORDER_CURENCY
          )})`;
        },
        height: 150,
        fontSize: '16px',
        markers: {
          width: 12,
          height: 12,
          radius: 12,
        },
        itemMargin: {
          horizontal: 60,
          vertical: 0,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      grid: {
        row: {
          colors: ['#fff', '#f2f2f2'],
        },
      },
    },
  };

  React.useEffect(() => {
    localStorage.setItem('reportMonth', thisMonth.toString());
    localStorage.setItem('reportYear', thisYear.toString());

    truckOwnerStore.getDataReport(thisMonth, thisYear);
    if (currentClickViewTable === t(REPORT_PENDING)) {
      orderStore.getPendingOrderListByTruckOwner(
        criteriaDto,
        thisMonth,
        thisYear
      );
    }
    if (currentClickViewTable === t(REPORT_COMPLETED)) {
      orderStore.getCompletedOrderListByTruckOwner(
        criteriaDto,
        thisMonth,
        thisYear
      );
    }
    if (currentClickViewTable === t(REPORT_CANCELLED)) {
      orderStore.getCancelledOrderListByTruckOwner(
        criteriaDto,
        thisMonth,
        thisYear
      );
    }
    if (currentClickViewTable === indexOfCustomer) {
      const customerInfo = truckOwnerStore.customerInfo[indexOfCustomer]
        ? truckOwnerStore.customerInfo[indexOfCustomer].split(',')
        : null;
      const emailCustomer = customerInfo[customerInfo.length - 1];

      orderStore.getCustomerOrderListByTruckOwner(
        criteriaDto,
        thisMonth,
        thisYear,
        emailCustomer
      );
    }
  }, [
    orderStore,
    criteriaDto,
    thisMonth,
    thisYear,
    currentPage,
    REPORT_CANCELLED,
    REPORT_COMPLETED,
    REPORT_PENDING,
    currentClickViewTable,
    truckOwnerStore,
    indexOfCustomer,
    t,
  ]);

  return (
    <>
      <WrapperTheme pageTitle={t(CUSTOMER_REPORT_TITLE)}>
        <ReportOptions
          years={selectYear}
          handleChangeMonth={handleChangeMonth}
          handleChangeYear={handleChangeYear}
        />

        <Container>
          <Row>
            <Col>
              <div className="block-chart" style={{ marginTop: '50px' }}>
                <Chart
                  options={state.options}
                  series={state.series}
                  type="pie"
                  width={450}
                  height={500}
                />
              </div>
            </Col>

            <Col>
              <div className="block-chart">
                <Chart
                  options={customerState.options}
                  series={customerState.series}
                  type="bar"
                  width={550}
                  height={700}
                />
              </div>
            </Col>
          </Row>
        </Container>

        {clickViewTable && (
          <>
            <OrderFilterExport
              handFilter={handleFilter}
              filters={filters}
              exportingLabel={t(FILTER_EXPORT)}
              exportingTo={exportingTo}
              exportingItems={ids}
            />{' '}
            <Message className="order-message" keyName="message-order" />
            <ReportOrderGrid
              totals={orderStore.totalCount}
              handleChangePageItem={handleChangePageItem}
              current={currentPage}
              isSelectedAll={isSelectedAll}
              handleOrderSummary={handleOrderSummary}
              selectedIds={ids}
              handleSelectedItems={handleSelectedItems}
            />
          </>
        )}
      </WrapperTheme>
    </>
  );
};

export default observer(ReportTruckOwnerPage);
