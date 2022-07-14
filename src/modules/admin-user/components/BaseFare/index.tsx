import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import MultiSelect from 'react-multi-select-component';
import React from 'react';
import { observer } from 'mobx-react';
import { I18N } from '@/modules/lang/i18n.enum';
import { useTranslation } from 'react-i18next';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { truckTypeAll } from '@/modules/truck/truck.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  options: any;
  index: number;
  values: any;
  handleChange: any;
  errors: any;
  handleDeleteTruckTypeFare: any;
  handleAddTruckTypeFare: any;
  pricingId: number;
  pricingSetting: any;
}

const BaseFare = (props: ComponentProps) => {
  const {
    options,
    index,
    values,
    handleChange,
    errors,
    handleDeleteTruckTypeFare,
    pricingId,
    handleAddTruckTypeFare,
    pricingSetting,
  } = props;

  const adminStore = React.useContext(AdminStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    DEFAULT_CHOOSE_TYPE_LABEL,
    PRICING_BASE_FARE_PER_TRUCK_TYPE,
    PRICING_DIFFERENT_ABOVE,
    PLACEHOLDER_PRICE_REQUEST,
    ORDER_SELECT_ALL,
  } = I18N;

  const [selected, setSelected] = React.useState<any[]>([]);

  const handleUpdateTruckTypeFare = React.useCallback(
    async (values: any, id: number) => {
      let data: number[] = [];
      values.forEach((item: any, index: number) => {
        data[index] = item.value;
      });
      setSelected(values);
      await adminStore.updateTruckTypeFare(data, id);
    },
    [adminStore]
  );

  React.useEffect(() => {
    for (let j = 0; j < values.truckType.length; j++) {
      let a = new Array(values.truckType.length);
      values.truckType.forEach((item: any, index: number) => {
        const data = truckTypeAll.find(
          (data: any) => data.key === item || data.key === +item
        )?.label;
        a[index] = {
          value: item,
          label: t(`${data}`),
        };
      });
      setSelected(a);
    }
  }, [t, values.truckType, handleUpdateTruckTypeFare]);
  return (
    <>
      <Row className="payload-fare">
        <Form.Group as={Col} xs={6} lg={6} controlId="" className="truck-type">
          <Form.Label>
            {index === 0 && (
              <>
                <span>{t(PRICING_BASE_FARE_PER_TRUCK_TYPE)}</span>
                <small className="under-text">
                  {t(PRICING_DIFFERENT_ABOVE)}
                </small>
              </>
            )}
          </Form.Label>
          {options.length > 0 && values && (
            <MultiSelect
              options={options}
              value={selected}
              onChange={(value: any) => {
                setSelected(value);
                handleUpdateTruckTypeFare(value, values.id);
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
        <Form.Group
          as={Col}
          xs={5}
          lg={5}
          controlId={`truckTypeFares.${index}.price`}
          className="form-group-normal"
        >
          <Form.Control
            type="text"
            value={values.price}
            onChange={handleChange}
            placeholder={t(PLACEHOLDER_PRICE_REQUEST)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.baseFlareNormal}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          xs={1}
          lg={1}
          controlId={`truckTypeFares.${index}.price`}
          className="form-group-normal"
        >
          {index === 0 && (
            <Button
              variant={BUTTONVARIANT.PRIMARY}
              onClick={() => handleAddTruckTypeFare(pricingId, pricingSetting)}
              className="btn-icon dynamic-add m-auto"
              size="lg"
              as={Col}
              xs="12"
              lg="1"
            >
              <i className="far fa-plus-square btn-add"></i>
            </Button>
          )}
          {index !== 0 && (
            <Button
              variant={BUTTONVARIANT.PRIMARY}
              onClick={() =>
                handleDeleteTruckTypeFare(values.id, pricingSetting)
              }
              className="btn-icon dynamic-remove"
              size="lg"
              as={Col}
              xs="12"
              lg="1"
            >
              <i className="far fa-minus-square btn-remove"></i>
            </Button>
          )}
        </Form.Group>
      </Row>
    </>
  );
};

export default observer(BaseFare);
