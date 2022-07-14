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
import { priceOpions } from '../../admin.constants';
import { truckPayloadAdmin } from '../../admin.enum';

interface ComponentProps {
  options: any;
  truckTypeOptions: any;
  index: number;
  values: any;
  handleChange: any;
  handleDeleteMultipleStopsCharges: any;
  handleCreateMultipleStopsCharges: any;
  priceSettingId: number;
  pricingSetting: any;
}
const DistanceFare = (props: ComponentProps) => {
  const adminStore = React.useContext(AdminStoreContext);

  const [selected, setSelected] = React.useState<any[]>([]);

  const [selectedTruckType, setSelectedTruckType] = React.useState<any[]>([]);

  const [triggeredState, setTriggeredState] = React.useState<boolean>(false);

  const {
    options,
    index,
    values,
    handleChange,
    priceSettingId,
    pricingSetting,
    truckTypeOptions,
    handleDeleteMultipleStopsCharges,
    handleCreateMultipleStopsCharges,
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
    PRICING_PRICE_OPTION,
    PRICING_COST_PER_STOP,
    ORDER_SELECT_ALL,
    PLACEHOLDER_PRICE_REQUEST,
  } = I18N;

  const handleUpdatePayloadFare = async (
    values: any,
    id: number,
    type: string
  ) => {
    let data: number[] = [];
    values.forEach((item: any, index: number) => {
      data[index] = item.value;
    });
    await adminStore.updateMultipleStops(data, id, type);
  };

  React.useEffect(() => {
    let a = new Array(values.truckPayload.length);
    values.truckPayload.forEach((item: any, index: number) => {
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
  }, [values.truckPayload]);

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
                  controlId={`multipleStopsCharges.${index}.payload`}
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
                  controlId={`multipleStopsCharges.${index}.truckType`}
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
              <Row>
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={4}
                  controlId={`multipleStopsCharges.${index}.multipleStopPriceOption`}
                  className="pick-up-zone"
                >
                  <Form.Label>
                    <span>{t(PRICING_PRICE_OPTION)}</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={values.multipleStopPriceOption}
                    onChange={handleChange}
                  >
                    {priceOpions.map((value: any, index: number) => {
                      return (
                        <option key={`account-type-${index}`} value={value.key}>
                          {t(value.label)}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={4}
                  controlId={`multipleStopsCharges.${index}.multipleStopPrice`}
                  className="cost"
                >
                  <Form.Label>
                    <span>{t(PRICING_COST_PER_STOP)}</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={values.multipleStopPrice}
                    onChange={handleChange}
                    placeholder={t(PLACEHOLDER_PRICE_REQUEST)}
                  />
                </Form.Group>
              </Row>
            </Collapsible>
          </Container>
        </Form.Row>
        {index === 0 && (
          <Button
            variant={BUTTONVARIANT.PRIMARY}
            onClick={() =>
              handleCreateMultipleStopsCharges(priceSettingId, pricingSetting)
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
            onClick={() =>
              handleDeleteMultipleStopsCharges(values.id, pricingSetting)
            }
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
