import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import { I18N } from '@/modules/lang/i18n.enum';
import { mdiTriangle } from '@mdi/js';
import Icon from '@mdi/react';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { useTranslation } from 'react-i18next';
import MultiSelect from 'react-multi-select-component';
import { truckPayloadAdmin } from '../../admin.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  options: any;
  index: number;
  values: any;
  handleChange: any;
  errors: any;
  length: number;
  handleDeleteZoneFare: any;
  provinces: any;
  priceSettingId: number;
  handleCreateZone: any;
  pricingSetting: any;
  handleUpdate: any;
}

const ZoneFare = (props: ComponentProps) => {
  const adminStore = React.useContext(AdminStoreContext);
  const {
    options,
    index,
    values,
    handleChange,
    handleDeleteZoneFare,
    provinces,
    priceSettingId,
    handleCreateZone,
    pricingSetting,
  } = props;
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    DEFAULT_CHOOSE_PAYLOAD_LABEL,
    PRICING_PAYLOAD,
    PRICING_PICKUP_AREA,
    PRICING_DROPOFF_AREA,
    PRICING_SAME_ZONE,
    PRICING_COST,
    PRICING_INPUT_PLACEHOLDER,
    PLACEHOLDER_PRICE_REQUEST,
    PRICING_CHOOSE_LOCATION,
    ORDER_SELECT_ALL,
  } = I18N;
  const [selected, setSelected] = React.useState<any[]>([]);

  const [triggeredState, setTriggeredState] = React.useState<boolean>(false);

  const handleUpdatePayloadFare = async (values: any, id: number) => {
    let data: number[] = [];
    values.forEach((item: any, index: number) => {
      data[index] = item.value;
    });
    setSelected(values);
    await adminStore.updatePayloadZone(data, id);
  };

  React.useEffect(() => {
    for (let j = 0; j < values.payload.length; j++) {
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
    }
  }, [t, values.payload]);

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
                  controlId={`zonePrices.${index}.sameZone`}
                  className="same-zone"
                >
                  <Form.Label>
                    <span>{t(PRICING_SAME_ZONE)}</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={values.sameZone}
                    onChange={handleChange}
                    placeholder={t(PRICING_INPUT_PLACEHOLDER)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={5}
                  controlId={`zonePrices.${index}.pickupZoneArea`}
                  className="pick-up-zone"
                >
                  <Form.Label>
                    <span>{t(PRICING_PICKUP_AREA)}</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={values.pickupZoneArea}
                    onChange={handleChange}
                  >
                    <option key={'default'} value={''}>
                      {t(PRICING_CHOOSE_LOCATION)}
                    </option>
                    {provinces.map((value: any, index: number) => {
                      return (
                        <option
                          key={`account-type-${index}`}
                          value={value.label}
                        >
                          {t(value.label)}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={5}
                  controlId={`zonePrices.${index}.dropoffZoneArea`}
                  className="drop-off-zone"
                >
                  <Form.Label>
                    <span>{t(PRICING_DROPOFF_AREA)}</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={values.dropoffZoneArea}
                    onChange={handleChange}
                  >
                    <option key={'default'} value={''}>
                      {t(PRICING_CHOOSE_LOCATION)}
                    </option>
                    {provinces.map((value: any, index: number) => {
                      return (
                        <option
                          key={`account-type-${index}`}
                          value={value.label}
                        >
                          {t(value.label)}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={5}
                  controlId={`truckTypeFares.${index}.truckType`}
                  className="truck-type"
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
                        handleUpdatePayloadFare(value, values.id);
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
                  controlId={`zonePrices.${index}.cost`}
                  className="cost"
                >
                  <Form.Label>
                    <span>{t(PRICING_COST)}</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={values.cost}
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
            onClick={() => handleCreateZone(priceSettingId, pricingSetting)}
            className="btn-icon m-left-s"
            size="lg"
          >
            <i className="fas fa-plus-square btn-add"></i>
          </Button>
        )}
        {index !== 0 && (
          <Button
            variant={BUTTONVARIANT.PRIMARY}
            onClick={() => handleDeleteZoneFare(values.id, pricingSetting)}
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
export default observer(ZoneFare);
