/* eslint-disable react-hooks/exhaustive-deps */
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import { I18N } from '@/modules/lang/i18n.enum';
import { truckTypeAll } from '@/modules/truck/truck.enum';
import { mdiTriangle } from '@mdi/js';
import Icon from '@mdi/react';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { useTranslation } from 'react-i18next';
import MultiSelect from 'react-multi-select-component';
import { truckPayloadAdmin } from '../../admin.enum';
import Distance from './Distance';

interface ComponentProps {
  options: any;
  truckTypeOptions: any;
  index: number;
  values: any;
  handleChange: any;
  handleDeleteDistanceFare: any;
  handleDeleteDistance: any;
  handleCreateDistance: any;
  handleCreateDistanceFare: any;
  priceSettingId: number;
  pricingSetting: any;
}

const DistanceFare = (props: ComponentProps) => {
  const adminStore = React.useContext(AdminStoreContext);
  const {
    options,
    index,
    values,
    handleChange,
    handleDeleteDistanceFare,
    handleDeleteDistance,
    handleCreateDistance,
    handleCreateDistanceFare,
    priceSettingId,
    pricingSetting,
    truckTypeOptions,
  } = props;
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    DEFAULT_CHOOSE_PAYLOAD_LABEL,
    PRICING_PAYLOAD,
    ORDER_TRUCKTYPE_LABEL,
    DEFAULT_CHOOSE_TYPE_LABEL,
    ORDER_SELECT_ALL,
  } = I18N;

  const [selected, setSelected] = React.useState<any[]>([]);

  const [selectedTruckType, setSelectedTruckType] = React.useState<any[]>([]);

  const [triggeredState, setTriggeredState] = React.useState<boolean>(false);

  const handleUpdatePayloadFare = async (
    values: any,
    id: number,
    type: string
  ) => {
    let data: number[] = [];
    values.forEach((item: any, index: number) => {
      data[index] = item.value;
    });
    await adminStore.updateDistancePrice(data, id, type);
  };

  React.useEffect(() => {
    let a = new Array(values.payload.length);
    values.payload.forEach((item: any, index: number) => {
      const data = truckPayloadAdmin.find((data: any) =>
        +item >= 20 ? data.key === item : data.key === +item
      )?.label;
      if (+item >= 20) {
        a[index] = {
          value: item,
          label: t(`${data}`),
        };
      } else {
        a[index] = {
          value: +item,
          label: t(`${data}`),
        };
      }
    });
    setSelected(a);
  }, [values.payload]);

  React.useEffect(() => {
    let b = new Array(values.truckType.length);
    values.truckType.forEach((item: any, index: number) => {
      const data = truckTypeAll.find((data: any) => `${data.key}` === item)
        ?.label;
      b[index] = {
        value: item,
        label: t(`${data}`),
      };
    });
    setSelectedTruckType(b);
  }, [values.truckType]);
  return (
    <>
      <div className="relative flex-container">
        <Form.Row className="route-info bordered-no-shadow all btn-width">
          <Container fluid>
            <Collapsible
              open={true}
              trigger={
                <Icon
                  path={mdiTriangle}
                  className={`ico ico-trigger ${
                    triggeredState ? 'ico-down' : ' ico-up'
                  }`}
                  size="20px"
                />
              }
              onOpening={() => {
                setTriggeredState(true);
              }}
              onClosing={() => {
                setTriggeredState(false);
              }}
              className="collap-control"
              openedClassName="is-opening"
              triggerOpenedClassName="collap-control trigger-right"
              triggerClassName="collap-control trigger-right"
            >
              <Row>
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={5}
                  controlId={`distancePrices.${index}.payload`}
                  className="payload"
                >
                  <Form.Label>
                    <span>{t(PRICING_PAYLOAD)}</span>
                  </Form.Label>
                  {options.length > 0 && values && (
                    <MultiSelect
                      options={options}
                      value={selected}
                      onChange={(value: any) => {
                        setSelected(value);
                        handleUpdatePayloadFare(value, values.id, 'payload');
                      }}
                      overrideStrings={{
                        selectSomeItems: t(DEFAULT_CHOOSE_PAYLOAD_LABEL),
                        allItemsAreSelected: t(ORDER_SELECT_ALL),
                      }}
                      disableSearch={true}
                      labelledBy={''}
                      selectAllLabel={t(ORDER_SELECT_ALL)}
                    />
                  )}
                </Form.Group>
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={5}
                  controlId={`distancePrices.${index}.truckType`}
                  className="truckType"
                >
                  <Form.Label>
                    <span>{t(ORDER_TRUCKTYPE_LABEL)}</span>
                  </Form.Label>
                  {truckTypeOptions.length > 0 && values && (
                    <MultiSelect
                      options={truckTypeOptions}
                      value={selectedTruckType}
                      onChange={(value: any) => {
                        setSelectedTruckType(value);
                        handleUpdatePayloadFare(value, values.id, 'truckType');
                      }}
                      overrideStrings={{
                        selectSomeItems: t(DEFAULT_CHOOSE_TYPE_LABEL),
                        allItemsAreSelected: t(ORDER_SELECT_ALL),
                      }}
                      disableSearch={true}
                      labelledBy={''}
                      selectAllLabel={t(ORDER_SELECT_ALL)}
                    />
                  )}
                </Form.Group>
              </Row>
              {values.distances.length > 0 &&
                values.distances
                  .sort((a: any, b: any) => (a.id > b.id ? 1 : -1))
                  .map((u: any, indexer: number) => {
                    return (
                      <>
                        <Distance
                          handleDeleteDistance={handleDeleteDistance}
                          handleCreateDistance={handleCreateDistance}
                          index={index}
                          indexer={indexer}
                          values={u}
                          distancePriceId={values.id}
                          handleChange={handleChange}
                          pricingSetting={pricingSetting}
                        />
                      </>
                    );
                  })}
            </Collapsible>
          </Container>
        </Form.Row>
        {index === 0 && (
          <Button
            variant={BUTTONVARIANT.PRIMARY}
            onClick={() =>
              handleCreateDistanceFare(priceSettingId, pricingSetting)
            }
            className="btn-icon m-left-s"
            size="lg"
          >
            <i className="fas fa-plus-square btn-add"></i>
          </Button>
        )}

        {index !== 0 && (
          <Button
            variant={BUTTONVARIANT.PRIMARY}
            onClick={() => handleDeleteDistanceFare(values.id, pricingSetting)}
            className="btn-icon m-left-s"
            size="lg"
          >
            <i className="fas fa-minus-square btn-remove"></i>
          </Button>
        )}
      </div>
    </>
  );
};

export default observer(DistanceFare);
