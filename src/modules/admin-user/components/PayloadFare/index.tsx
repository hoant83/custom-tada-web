import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import { I18N } from '@/modules/lang/i18n.enum';
import { nonMotorizedPayload } from '@/modules/truck/truck.enum';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import MultiSelect from 'react-multi-select-component';
import { priceOpions } from '../../admin.constants';
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
  handleDeletePayloadFare: any;
  pricingId: number;
  handleAddPayloadFare: any;
  pricingSetting: any;
}

const PayloadFare = (props: ComponentProps) => {
  const {
    options,
    index,
    values,
    handleChange,
    errors,
    handleDeletePayloadFare,
    pricingId,
    handleAddPayloadFare,
    pricingSetting,
  } = props;

  const adminStore = React.useContext(AdminStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    DEFAULT_CHOOSE_PAYLOAD_LABEL,
    PRICING_PAYLOAD,
    PRICING_PRICE_OPTION,
    PRICING_COST,
    ORDER_SELECT_ALL,
    PLACEHOLDER_PRICE_REQUEST,
  } = I18N;

  const [selected, setSelected] = React.useState<any[]>([]);

  const handleUpdatePayloadFare = async (values: any, id: number) => {
    let data: number[] = [];
    values.forEach((item: any, index: number) => {
      data[index] = item.value;
    });
    setSelected(values);
    await adminStore.updatePayloadFare(data, id);
  };

  React.useEffect(() => {
    for (let j = 0; j < values.payload.length; j++) {
      let a = new Array(values.payload.length);
      values.payload.forEach((item: any, index: number) => {
        let data = truckPayloadAdmin.find((data: any) =>
          +item >= 20 ? data.key === item : data.key === +item
        )?.label;
        let check = false;
        if (!data) {
          //@ts-ignore
          data = nonMotorizedPayload.find((data: any) => data.key === item)
            ?.label;
          if (data) {
            check = true;
          }
        }
        if (+item >= 20 || check) {
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
      <Row>
        <Form.Group
          as={Col}
          xs={10}
          lg={5}
          controlId={`payloadFares.${index}.payload`}
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
          xs={10}
          lg={2}
          controlId={`payloadFares.${index}.priceOption`}
          className="payload"
        >
          <Form.Label className="width-m">
            <span>{t(PRICING_PRICE_OPTION)}</span>
          </Form.Label>
          <Form.Control
            as="select"
            className="input-m"
            defaultValue={values.priceOption}
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
          xs={10}
          lg={3}
          controlId={`payloadFares.${index}.price`}
          className="form-group-normal"
        >
          <Form.Label className="form-label width-sm">
            {t(PRICING_COST)}
          </Form.Label>
          <Form.Control
            type="text"
            className="input-sm"
            value={values.price}
            onChange={handleChange}
            placeholder={t(PLACEHOLDER_PRICE_REQUEST)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.baseFlareNormal}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs={1} lg={1} controlId="" className="m-auto">
          {index === 0 && (
            <Button
              variant={BUTTONVARIANT.PRIMARY}
              onClick={() => handleAddPayloadFare(pricingId, pricingSetting)}
              className="btn-icon m-left-s"
              size="lg"
              as={Col}
              xs="12"
              lg="1"
            >
              <i className="fas fa-plus-square btn-add"></i>
            </Button>
          )}
          {index !== 0 && (
            <Button
              variant={BUTTONVARIANT.PRIMARY}
              onClick={() => handleDeletePayloadFare(values.id, pricingSetting)}
              className="btn-icon m-left-s"
              size="lg"
              as={Col}
              xs="12"
              lg="1"
            >
              <i className="fas fa-minus-square btn-remove"></i>
            </Button>
          )}
        </Form.Group>
      </Row>
    </>
  );
};

export default observer(PayloadFare);
