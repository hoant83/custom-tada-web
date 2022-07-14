import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Col, Row, Table } from 'react-bootstrap';
import moment from 'moment';

/*
 * Props of Component
 */
interface ComponentProps {
  items: any[];
  handleSelectedItems: any;
}

const TrackingGrid = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { items, handleSelectedItems } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ORDER_DATE_TIME, ORDER_LOCATION } = I18N;

  return (
    <>
      <Row className="mt-2">
        <Col style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>{t(ORDER_DATE_TIME)}</th>
                <th>Km/h</th>
                <th>{t(ORDER_LOCATION)}</th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((item: any, index: number) => (
                  <tr
                    onClick={() => handleSelectedItems(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{index + 1}</td>
                    <td>
                      {moment(item.tracking_time).format('DD-MM-YYYY HH:mm:ss')}
                    </td>
                    <td>{item.speed}</td>
                    <td>{item.address}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default observer(TrackingGrid);
