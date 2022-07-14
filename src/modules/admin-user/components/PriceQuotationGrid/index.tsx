/* eslint-disable react-hooks/exhaustive-deps */
import Paging from '@/libs/components/Paging';
import { STATUS } from '@/libs/constants/price-quotation';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React from 'react';
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getDisplayName } from '@/libs/utils/normalize.ulti';

/*
 * Props of Component
 */
interface ComponentProps {
  items: any;
  totals: number;
  pagingSize: number;
  handleChangePageItem?: any;
  handleDelete?: any;
  handlePublish?: any;
  handleEdit?: any;
  handleUnPublish?: any;
}

const PriceQuotationGrid = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    items,
    totals,
    pagingSize,
    handleChangePageItem,
    handleDelete,
    handlePublish,
    handleEdit,
    handleUnPublish,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    PRICE_QUOTATION_NAME,
    PRICE_QUOTATION_TO_CUSTOMER,
    PRICE_QUOTATION_LAST_UPDATED_TIME,
    PRICE_QUOTATION_LAST_UPDATED_BY,
    PRICE_QUOTATION_STATUS,
    PRICE_QUOTATION_DRAFT,
    PRICE_QUOTATION_PUBLISHED,
    QUOTATION_PUBLISH,
    QUOTATION_WITHDRAW,
  } = I18N;
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
  const maxPage: number = 4;
  const [totalPage, setTotalPage] = React.useState<number>(0);

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
    setTotalPage(Math.ceil(totals / pagingSize));
  }, [items, totals]);

  return (
    <>
      <Container fluid className="block-orders block-table">
        <Row>
          <Col xs={12} className="block-content">
            <Table responsive="lg">
              <thead>
                <tr>
                  <th>{t(PRICE_QUOTATION_NAME)}</th>
                  <th>{t(PRICE_QUOTATION_TO_CUSTOMER)}</th>
                  <th>{t(PRICE_QUOTATION_LAST_UPDATED_TIME)}</th>
                  <th>{t(PRICE_QUOTATION_LAST_UPDATED_BY)}</th>
                  <th>{t(PRICE_QUOTATION_STATUS)}</th>
                  <th className="col-actions"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: any, index: number) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      {item.toAllCustomers
                        ? 'All customers'
                        : item.customers.map((subItem: any) => (
                            <p>{getDisplayName(subItem)}</p>
                          ))}
                    </td>
                    <td>
                      {moment(item.lastUpdatedTime).format(
                        'DD/MM/YYYY HH:mm:ss'
                      )}
                    </td>
                    <td>
                      {item.admin?.firstName ? item.admin?.firstName : ''}
                    </td>
                    <td>
                      {item.status === STATUS.DRAFT && (
                        <span className="text-danger">
                          {t(PRICE_QUOTATION_DRAFT)}
                        </span>
                      )}
                      {item.status === STATUS.PUBLISHED && (
                        <span className="text-success">
                          {t(PRICE_QUOTATION_PUBLISHED)}
                        </span>
                      )}
                    </td>
                    <td className="col-actions">
                      <Button
                        variant={BUTTONVARIANT.PRIMARY}
                        onClick={() => {
                          handleEdit(item);
                        }}
                        className="btn-icon"
                        size="lg"
                      >
                        <i className="ico ico-edit"></i>
                      </Button>
                      {item.status === STATUS.DRAFT && (
                        <Button
                          variant={BUTTONVARIANT.PRIMARY}
                          onClick={() => {
                            handlePublish(item.id);
                          }}
                          className="btn-icon"
                          size="lg"
                        >
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="publish-tooltip">
                                {t(QUOTATION_PUBLISH)}
                              </Tooltip>
                            }
                          >
                            <i className="ico ico-publish"></i>
                          </OverlayTrigger>
                        </Button>
                      )}

                      {item.status === STATUS.PUBLISHED && (
                        <Button
                          variant={BUTTONVARIANT.PRIMARY}
                          onClick={() => {
                            handleUnPublish(item.id);
                          }}
                          className="btn-icon"
                          size="lg"
                        >
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="publish-tooltip">
                                {t(QUOTATION_WITHDRAW)}
                              </Tooltip>
                            }
                          >
                            <i className="ico ico-import"></i>
                          </OverlayTrigger>
                        </Button>
                      )}
                      <Button
                        variant={BUTTONVARIANT.PRIMARY}
                        onClick={() => {
                          handleDelete(item.id);
                        }}
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
          </Col>
        </Row>
        {totalPage > 1 && (
          <>
            <Paging
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

export default observer(PriceQuotationGrid);
