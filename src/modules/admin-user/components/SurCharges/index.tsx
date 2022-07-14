import { I18N } from '@/modules/lang/i18n.enum';
import { heavyCargoLoad } from '@/modules/truck/truck.enum';
import { observer } from 'mobx-react';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { priceOpions } from '../../admin.constants';

/*
 * Props of Component
 */
interface ComponentProps {
  values: any;
  handleChange: any;
}

const SurCharges = (props: ComponentProps) => {
  const { values, handleChange } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    PRICING_SPECIAL_DANGEROUS_GOODS,
    PRICING_HEAVY_CARGO,
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
          controlId={'surCharges.0.multipleStop'}
          className="pick-up-zone"
        >
          <Form.Label>
            <span>{t(PRICING_SPECIAL_DANGEROUS_GOODS)}</span>
          </Form.Label>
        </Form.Group>
        <Form.Group
          as={Col}
          xs={12}
          lg={4}
          controlId={'surCharges.0.specialGoodsPriceOption'}
          className="pick-up-zone"
        >
          <Form.Label>
            <span>{t(PRICING_PRICE_OPTION)}</span>
          </Form.Label>
          <Form.Control
            as="select"
            defaultValue={values?.specialGoodsPriceOption || ''}
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
          controlId={'surCharges.0.specialGoodsPrice'}
          className="cost"
        >
          <Form.Label>
            <span>{t(PRICING_COST)}</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={values?.specialGoodsPrice || ''}
            onChange={handleChange}
            placeholder={t(PLACEHOLDER_PRICE_REQUEST)}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group
          as={Col}
          xs={12}
          lg={4}
          controlId={'surCharges.0.payloadMoreThan'}
          className="pick-up-zone"
        >
          <Form.Label>
            <span>{t(PRICING_HEAVY_CARGO)} &#8805;</span>
          </Form.Label>
          <Form.Control
            as="select"
            defaultValue={values?.payloadMoreThan || ''}
            onChange={handleChange}
          >
            {heavyCargoLoad.map((value: any, index: number) => {
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
          controlId={'surCharges.0.heavyCargoPriceOption'}
          className="pick-up-zone"
        >
          <Form.Label>
            <span>{t(PRICING_PRICE_OPTION)}</span>
          </Form.Label>
          <Form.Control
            as="select"
            defaultValue={values?.heavyCargoPriceOption || ''}
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
          controlId={'surCharges.0.heavyCargoPrice'}
          className="cost"
        >
          <Form.Label>
            <span>{t(PRICING_COST)}</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={values?.heavyCargoPrice || ''}
            onChange={handleChange}
            placeholder={t(PLACEHOLDER_PRICE_REQUEST)}
          />
        </Form.Group>
      </Row>
    </>
  );
};

export default observer(SurCharges);
