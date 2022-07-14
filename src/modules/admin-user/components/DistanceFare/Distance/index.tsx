import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface ComponentProps {
  index: number;
  values: any;
  handleChange: any;
  handleDeleteDistance: any;
  handleCreateDistance: any;
  indexer: number;
  distancePriceId: number;
  pricingSetting: any;
}

const Distance = (props: ComponentProps) => {
  const {
    index,
    values,
    handleChange,
    handleDeleteDistance,
    handleCreateDistance,
    indexer,
    distancePriceId,
    pricingSetting,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { PRICING_FROM, PRICING_TO, PRICING_COST_PER_KM } = I18N;
  return (
    <>
      <Row>
        <Form.Group
          as={Col}
          xs={12}
          lg={2}
          controlId={`distancePrices.${index}.distances.${indexer}.from`}
          className="same-zone"
        >
          <Form.Label className="width-sm">
            <span>{t(PRICING_FROM)}</span>
          </Form.Label>
          <Form.Control
            type="text"
            className="input-km"
            value={values.from}
            onChange={handleChange}
            placeholder={t('X')}
          />
        </Form.Group>

        <Form.Group
          as={Col}
          xs={12}
          lg={3}
          controlId={`distancePrices.${index}.distances.${indexer}.to`}
        >
          <Form.Label className="width-sm">
            <span>{t(PRICING_TO)}</span>
          </Form.Label>
          <Form.Control
            type="text"
            className="input-km"
            value={values.to}
            onChange={handleChange}
            placeholder={t('Y')}
          />
        </Form.Group>

        <Form.Group as={Col} xs={2} lg={2} controlId="" className="">
          <Form.Label className="width-sm">
            <span>{t('Km')}</span>
          </Form.Label>
        </Form.Group>

        <Form.Group
          as={Col}
          xs={12}
          lg={4}
          controlId={`distancePrices.${index}.distances.${indexer}.costPerKm`}
          className="same-zone"
        >
          <Form.Label>
            <span>{t(PRICING_COST_PER_KM)}</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={values.costPerKm}
            onChange={handleChange}
            placeholder={t('Y')}
          />
        </Form.Group>
        {indexer === 0 && (
          <Button
            variant={BUTTONVARIANT.PRIMARY}
            onClick={() =>
              handleCreateDistance(distancePriceId, pricingSetting)
            }
            className="btn-icon dynamic-remove m-auto"
            size="lg"
            as={Col}
            xs="12"
            lg="1"
          >
            <i className="far fa-plus-square btn-add"></i>
          </Button>
        )}

        {indexer !== 0 && (
          <Button
            variant={BUTTONVARIANT.PRIMARY}
            onClick={() => handleDeleteDistance(values.id, pricingSetting)}
            className="btn-icon dynamic-remove m-auto"
            size="lg"
            as={Col}
            xs="12"
            lg="1"
          >
            <i className="far fa-minus-square btn-remove"></i>
          </Button>
        )}
      </Row>
    </>
  );
};

export default observer(Distance);
