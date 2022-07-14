/* eslint-disable react-hooks/exhaustive-deps */
import PriceQuotation from '@/modules/customer/components/PriceQuotation';
import { I18N } from '@/modules/lang/i18n.enum';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import { observer } from 'mobx-react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import customerService from '../../../customer.service';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { PriceQuotationListDto } from '../../../customer.dto';
import Paging from '@/libs/components/Paging';
import { exportExcel } from '@/libs/utils/export.util';

interface DataType {
  items: any[];
  totals: number;
}

const ManagePriceQuotations = () => {
  /*
   * Translation
   */
  const pagingSize = +pageSizeOptions[1];
  const { t } = useTranslation();
  const { QUOTATION_TITLE, QUOTATION_DOWNLOAD } = I18N;
  const authStore = React.useContext(AuthenticationStoreContext);
  const [criteriaDto, setCriteriaDto] = React.useState<PriceQuotationListDto>({
    skip: 0,
    take: pagingSize,
    orderBy: 'id',
    orderDirection: 'DESC',
  });
  const [data, setData] = React.useState<DataType>({ items: [], totals: 0 });

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [currentPageFrame, setCurrentPageFrame] = React.useState<number>(1);

  const maxPage: number = 4;
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setCurrentPageFrame(Math.ceil(page / maxPage));
    handleChangePageItem(page);
  };

  React.useEffect(() => {
    setTotalPage(Math.ceil(data.totals / pagingSize));
  }, [data.items, data.totals]);

  const handleChangePageItem = (page: number) => {
    setCriteriaDto({
      skip: page > 1 ? (page - 1) * pagingSize : 0,
      take: pagingSize,
      orderBy: 'id',
      orderDirection: 'DESC',
    });
  };

  React.useEffect(() => {
    if (authStore.loggedUser?.id) {
      loadData(authStore.loggedUser.id, criteriaDto);
    }
  }, [authStore.loggedUser, criteriaDto]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      loadData(authStore.loggedUser.id, criteriaDto);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async (id: number, criteriaDto: PriceQuotationListDto) => {
    const data = await customerService.getPriceQuotations(id, criteriaDto);
    setData({
      totals: data.data?.result?.count ? +data.data.result.count : 0,
      items: data.data?.result?.data ? data.data.result.data : [],
    });
  };

  const download = (id: number) => {
    const dataQuotation = data.items.find((it: any) => it.id === id);

    if (dataQuotation.quotation?.header) {
      const header = [];
      for (const [key, value] of Object.entries(
        dataQuotation.quotation.header
      )) {
        if (key !== 'rowType') {
          header.push({
            header: value,
            key,
          });
        }
      }
      exportExcel(
        header,
        dataQuotation.quotation?.data || [],
        'price-quotation'
      );
    }
  };

  return (
    <>
      <WrapperTheme pageTitle={t(QUOTATION_TITLE)}>
        {data.items &&
          data.items.map((item: any) => (
            <div key={item.id} className="quotation-wrapper">
              <PriceQuotation quotationData={item} />
              <div className="d-flex justify-content-end">
                <Button variant="primary" onClick={() => download(item.id)}>
                  <span>{t(QUOTATION_DOWNLOAD)}</span>
                  <i className="ico ico-import"></i>
                </Button>
              </div>
            </div>
          ))}
        {totalPage > 1 && (
          <>
            <Paging
              totalPage={totalPage}
              totals={data.totals}
              currentPageFrame={currentPageFrame}
              maxPage={maxPage}
              handleChangePage={handleChangePage}
              current={currentPage}
              pageSize={pagingSize}
            />
          </>
        )}
      </WrapperTheme>
    </>
  );
};

export default observer(ManagePriceQuotations);
