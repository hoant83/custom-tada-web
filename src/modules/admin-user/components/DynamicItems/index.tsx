import React from 'react';
import { observer } from 'mobx-react';
import { I18N } from '@/modules/lang/i18n.enum';
import { useTranslation } from 'react-i18next';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { priceOpions } from '../../admin.constants';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { DYNAMIC_DEFAULT_OPTION } from '@/modules/admin-user/admin.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  index: number;
  values: any;
  handleChange: any;
  handleAddDynamicItem: any;
  handleDeleteDynamicItem: any;
  pricingId: number;
  pricingSetting: any;
}

const DynamicItems = (props: ComponentProps) => {
  const {
    index,
    values,
    handleChange,
    handleAddDynamicItem,
    handleDeleteDynamicItem,
    pricingId,
    pricingSetting,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    PRICING_PRICE_OPTION,
    PRICING_COST,
    PLACEHOLDER_PRICE_REQUEST,
  } = I18N;

  return (
    <>
      <Row>
        <Form.Group
          as={Col}
          xs={12}
          lg={4}
          controlId={`dynamicCharges.${index}.name`}
          className="pick-up-zone"
        >
          <Form.Control
            type="text"
            value={values.name}
            onChange={handleChange}
            placeholder={t('Input name')}
            disabled={
              values.name === DYNAMIC_DEFAULT_OPTION.MIXED ||
              values.name === DYNAMIC_DEFAULT_OPTION.FORKLIFT
            }
          />
        </Form.Group>
        <Form.Group
          as={Col}
          xs={12}
          lg={4}
          controlId={`dynamicCharges.${index}.priceOption`}
          className="pick-up-zone"
        >
          <Form.Label>
            <span>{t(PRICING_PRICE_OPTION)}</span>
          </Form.Label>
          <Form.Control
            as="select"
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
          xs={12}
          lg={3}
          controlId={`dynamicCharges.${index}.cost`}
          className="cost"
        >
          <Form.Label className="width-m">
            <span>{t(PRICING_COST)}</span>
          </Form.Label>
          <Form.Control
            type="text"
            className="input-m"
            value={values.cost}
            onChange={handleChange}
            placeholder={t(PLACEHOLDER_PRICE_REQUEST)}
          />
        </Form.Group>
        <Form.Group as={Col} xs={12} lg={1} className="cost m-auto">
          {index === 0 && (
            <Button
              variant={BUTTONVARIANT.PRIMARY}
              onClick={() => handleAddDynamicItem(pricingId, pricingSetting)}
              className="btn-icon m-left-s"
              size="lg"
              as={Col}
              xs="12"
              lg="1"
            >
              <i className="fas fa-plus-square btn-add"></i>
            </Button>
          )}
          {index !== 0 &&
            values.name !== DYNAMIC_DEFAULT_OPTION.MIXED &&
            values.name !== DYNAMIC_DEFAULT_OPTION.FORKLIFT && (
              <Button
                variant={BUTTONVARIANT.PRIMARY}
                onClick={() =>
                  handleDeleteDynamicItem(values.id, pricingSetting)
                }
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

export default observer(DynamicItems);
