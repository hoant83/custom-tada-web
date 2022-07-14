import { CommonStoreContext } from '@/libs/stores/common.store';
import { toTimeFormat } from '@/libs/utils/time.util';
import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface ComponentProps {
  quotationData: any;
}

const PriceQuotation = (props: ComponentProps) => {
  const { quotationData } = props;
  const commonStore = React.useContext(CommonStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    QUOTATION_NAME,
    QUOTATION_ADDITIONAL_CHARGES,
    QUOTATION_CURRENCY,
    QUOTATION_UPDATED_DATE,
  } = I18N;

  const scrollRight = (id: number) => {
    const scollField = document.getElementById(`scroll-table-${id}`);
    if (scollField) {
      let scrollAmount = 0;
      const step = 25;
      const distance = 150;
      const slideTimer = setInterval(function () {
        scollField.scrollLeft += step;
        scrollAmount += step;
        if (scrollAmount >= distance) {
          window.clearInterval(slideTimer);
        }
      }, 30);
    }
  };

  const filterData = React.useCallback(() => {
    const data = quotationData?.quotation.data;
    const cols: any = {
      col2: '',
      col3: '',
      col4: '',
      col5: '',
      col6: '',
      col7: '',
      col8: '',
      col9: '',
      col10: '',
      col11: '',
      col12: '',
      col13: '',
      col14: '',
      col15: '',
    };

    for (let i = 0; i < data.length; i++) {
      Object.keys(quotationData.quotation.header).map(
        (key: string, index: number) => {
          if (key !== 'rowType' && index >= 3) {
            if (data[i][key]) {
              cols[`${key}`] = `${key}`;
            }
          }
        }
      );
    }
    Object.keys(cols).map((u: any) => {
      if (cols[u].length) {
        const data = document.getElementsByClassName(
          `${cols[u]}-${quotationData.id}`
        );
        if (data) {
          for (let i = 0; i < data.length; i++) {
            const list = data[i].classList;
            list.remove('hidden');
            list.add('show');
          }
        }
      }
    });
  }, []);

  React.useEffect(() => {
    filterData();
  }, []);

  return (
    <>
      <Container fluid>
        <div className="head-wrapper row">
          <div className="name-header col-lg-6 col-12">
            <label className="name-label">{t(QUOTATION_NAME)}:</label>
            <span className="quotation-name">{` ${quotationData.name}`}</span>
          </div>
          <div className="updated-header col-lg-6 col-12">
            <label className="name-label"> {t(QUOTATION_UPDATED_DATE)}:</label>
            <span className="quotation-updated-date">
              {` ${toTimeFormat(
                quotationData.lastUpdatedTime.toLocaleString(),
                commonStore.newDateFormat
              )}`}
            </span>
          </div>
        </div>
        <div className="currency-wrapper">
          <label className="name-label">{t(QUOTATION_CURRENCY)}:</label>
          <span className="quotation-name">{quotationData.currency}</span>
        </div>
        <div className="quotation-holder row">
          <Col
            className="quotation-container-table block block-table"
            lg={9}
            xs={12}
          >
            <Table responsive="lg" className="fixed">
              <thead>
                <tr>
                  {quotationData.quotation?.header &&
                    Object.keys(quotationData.quotation.header).map(
                      (key: string, index: number) => {
                        if (key !== 'rowType' && index < 3) {
                          return (
                            <th key={key}>
                              {quotationData.quotation.header[key]}
                            </th>
                          );
                        }
                      }
                    )}
                </tr>
              </thead>
              <tbody>
                {quotationData.quotation?.data &&
                  quotationData.quotation?.data.map((d: any) => (
                    <tr>
                      {Object.keys(quotationData.quotation.header).map(
                        (key: string, index: number) => {
                          if (key !== 'rowType' && index < 3) {
                            return <td>{d[key]}</td>;
                          }
                        }
                      )}
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div className="scroll" id={`scroll-table-${quotationData?.id}`}>
              <Table responsive="lg" className="scroll-table">
                <thead>
                  <tr>
                    {quotationData.quotation?.header &&
                      Object.keys(quotationData.quotation.header).map(
                        (key: string, index: number) => {
                          if (key !== 'rowType' && index >= 3) {
                            return (
                              <th
                                className={` hidden ${key}-${quotationData?.id}`}
                              >
                                {quotationData.quotation.header[key]}
                              </th>
                            );
                          }
                        }
                      )}
                  </tr>
                </thead>
                <tbody>
                  {quotationData.quotation?.data &&
                    quotationData.quotation?.data.map((d: any) => (
                      <tr>
                        {Object.keys(quotationData.quotation.header).map(
                          (key: string, index: number) => {
                            if (key !== 'rowType' && index >= 3) {
                              return (
                                <td
                                  className={`${key}-${quotationData?.id} hidden`}
                                >
                                  {d[key]}
                                </td>
                              );
                            }
                          }
                        )}
                      </tr>
                    ))}
                </tbody>
                <span
                  className="x-scroll-click"
                  onClick={() => {
                    scrollRight(quotationData?.id);
                  }}
                >
                  <i className="ico ico-next-solid"></i>
                </span>
              </Table>
            </div>
          </Col>
          <Col lg={1} xs={0}>
            {' '}
          </Col>
          <Col className="additional-notes block block-table" lg={2} xs={12}>
            <Table responsive="lg" className="additional-note-table">
              <thead className="modal-header">
                <tr>
                  <th>{t(QUOTATION_ADDITIONAL_CHARGES)}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ whiteSpace: 'pre-line' }}>
                    {quotationData.note}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </div>
      </Container>
    </>
  );
};

export default observer(PriceQuotation);
