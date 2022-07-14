import Paging from '@/libs/components/Paging';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { AddressStoreContext } from '@/modules/address/address.store';
import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react-lite';
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
interface ComponentProps {
  handleEdit: any;
  handleDelete: any;
  totalPage: number;
  currentPageFrame: any;
  handleChangePage: any;
  maxPage: number;
  currentPage: number;
  pagingSize: any;
}

const AddressList = (props: ComponentProps) => {
  const {
    handleEdit,
    handleDelete,
    totalPage,
    currentPageFrame,
    handleChangePage,
    maxPage,
    pagingSize,
    currentPage,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ADDRESS_COMPANY,
    ADDRESS_LOCATION_TYPE,
    ADDRESS_LOCATION_ADDRESS,
    ADDRESS_LOCATION_NAME,
    ADDRESS_PERSON_INCHARGE_NAME,
    ADDRESS_PERSON_INCHARGE_NO,
    ORDER_PICKUP_ADDRESS,
    ORDER_DROPOFF_ADDRESS,
  } = I18N;

  const addressStore = React.useContext(AddressStoreContext);

  return (
    <>
      <Container
        fluid
        className={'block block-table table-smaller address-book-list'}
      >
        <Row>
          <Col xs={12} className="block-content">
            <Table className="table-wrapper">
              <thead>
                <tr>
                  <th>{t(ADDRESS_COMPANY)}</th>
                  <th>{t(ADDRESS_LOCATION_TYPE)}</th>
                  <th>{t(ADDRESS_LOCATION_NAME)}</th>
                  <th>{t(ADDRESS_LOCATION_ADDRESS)}</th>
                  <th>{t(ADDRESS_PERSON_INCHARGE_NAME)}</th>
                  <th>{t(ADDRESS_PERSON_INCHARGE_NO)}</th>
                  <th className="col-actions"></th>
                </tr>
              </thead>
              <tbody>
                {addressStore.addresses.map((item: any, index: number) => (
                  <tr key={item.id}>
                    <td data-th={`${t('Company/Entity Name')}: `}>
                      {item.company}
                    </td>
                    <td data-th={`${t('Location Type')}: `}>
                      {item.locationType === 'pickup'
                        ? t(ORDER_PICKUP_ADDRESS)
                        : t(ORDER_DROPOFF_ADDRESS)}
                    </td>
                    <td data-th={`${t('Location Name')}: `}>
                      {item.locationName}
                    </td>
                    <OverlayTrigger
                      key={'top'}
                      placement={'top'}
                      overlay={
                        <Tooltip id="tooltip-right" className="bg-white">
                          {item.locationAddress}
                        </Tooltip>
                      }
                    >
                      <td
                        data-th={`${t('Location Address')}: `}
                        className="address-wrapper"
                      >
                        {item.locationAddress}
                      </td>
                    </OverlayTrigger>

                    <td data-th={`${t('Person in charge')}: `}>
                      {item.inChargeName}
                    </td>
                    <td data-th={`${t('Person in charge No')}: `}>
                      {item.inChargeNo}
                    </td>
                    <td className="col-actions">
                      <Button
                        variant={BUTTONVARIANT.PRIMARY}
                        onClick={() => handleEdit(item.id)}
                        className="btn-icon"
                        size="lg"
                      >
                        <i className="ico ico-edit"></i>
                      </Button>
                      <Button
                        variant={BUTTONVARIANT.PRIMARY}
                        onClick={(e) => handleDelete(item.id)}
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
            {totalPage > 1 && (
              <>
                <Paging
                  totalPage={totalPage}
                  totals={addressStore.totalCount}
                  currentPageFrame={currentPageFrame}
                  maxPage={maxPage}
                  handleChangePage={handleChangePage}
                  current={currentPage}
                  pageSize={pagingSize}
                />
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default observer(AddressList);
