import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import {
  Form,
  Row,
  Col,
  Button,
  ButtonGroup,
  Container,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import { Formik } from 'formik';
import * as yup from 'yup';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
  handleSubmitForm?: any;
}

const FavouriteForm = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { className, handleSubmitForm } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_REQUIRED,
    CUSTOMER_FAVOURITE_NEW,
    CUSTOMER_FAVOURITE_NOTE,
    CUSTOMER_PLACEHOLDER_FAVOURITE,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    publicId: yup.string().required(t(VALIDATE_REQUIRED)),
  });

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          handleSubmitForm(values);
        }}
        initialValues={{
          publicId: '',
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={`form form-custom col-12 ${className ? className : ''}`}
          >
            <Container fluid>
              <Row>
                <Form.Group
                  as={Col}
                  xs={12}
                  className="form-group-verifiedStatus"
                >
                  <Form.Label className="form-label">
                    <span>{t(CUSTOMER_FAVOURITE_NEW)}</span>
                    <OverlayTrigger
                      key={'right'}
                      placement={'right'}
                      overlay={
                        <Tooltip id="tooltip-right">
                          {t(CUSTOMER_FAVOURITE_NOTE)}
                        </Tooltip>
                      }
                    >
                      <div className="tooltip-icon">
                        <span className="ico ico-faq"></span>
                      </div>
                    </OverlayTrigger>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="publicId"
                    value={values.publicId}
                    onChange={handleChange}
                    isInvalid={!!errors.publicId}
                    placeholder={t(CUSTOMER_PLACEHOLDER_FAVOURITE)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.publicId}
                  </Form.Control.Feedback>
                </Form.Group>
                <ButtonGroup className="form-actions">
                  <Button type="submit">
                    <i className="ico ico-plus"></i>
                  </Button>
                </ButtonGroup>
              </Row>
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(FavouriteForm);
