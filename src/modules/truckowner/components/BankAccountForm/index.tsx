import { NUMBER_REGEXP } from '@/libs/constants/rules.constants';
import { ACTION_MODE } from '@/libs/enums/action.enum';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import { newBankAccountInit } from '@/modules/truckowner/truckowner.constants';
import { NewBankAccountRequestDto } from '@/modules/truckowner/truckowner.dto';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  mode: string;
  handleSubmitForm: any;
  initialValues: NewBankAccountRequestDto;
}

const BankAccountForm = (props: ComponentProps) => {
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    mode,
    handleSubmitForm,
    initialValues = newBankAccountInit,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_REQUIRED,
    VALIDATE_NUMBER,
    BUTTONS_UPDATE,
    BUTTONS_CREATE,
    BANK_ACCOUNT_TITLE,
    BANK_NAME,
    BANK_BRANCH,
    BANK_ACCOUNT_NUMBER,
    COMPANY_PLACEHOLDER,
    BUSSINESS_PLACEHOLDER,
    BANK_ACCOUNT_HOLDER_NAME,
  } = I18N;

  /*
   * Validation
   */

  const schema = yup.object({
    companyName: yup.string().required(t(VALIDATE_REQUIRED)),
    businessLicenseNo: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .required(t(VALIDATE_REQUIRED)),
    bankName: yup.string().required(t(VALIDATE_REQUIRED)),
    bankAccountHolderName: yup.string().required(t(VALIDATE_REQUIRED)),
    bankBranch: yup.string().required(t(VALIDATE_REQUIRED)),
    bankAccountNumber: yup.string().required(t(VALIDATE_REQUIRED)),
  });

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          handleSubmitForm(values);
        }}
        initialValues={initialValues}
        enableReinitialize
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={`form form-custom ${className ? className : ''}`}
            style={style}
          >
            {children}
            <Form.Row className="company-info">
              <Container fluid>
                <Row>
                  <Col xs={12}>
                    <h3 className="block-title">{t(BANK_ACCOUNT_TITLE)}</h3>
                  </Col>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={6}
                    controlId="companyName"
                    className="form-group-name"
                  >
                    <Form.Label className="form-label form-label-required">
                      {t(COMPANY_PLACEHOLDER)} <span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="companyName"
                      value={values.companyName}
                      onChange={handleChange}
                      isInvalid={!!errors.companyName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.companyName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={6}
                    controlId="businessLicenseNo"
                    className="form-group-phone"
                  >
                    <Form.Label className="form-label">
                      {t(BUSSINESS_PLACEHOLDER)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.businessLicenseNo}
                      onChange={handleChange}
                      isInvalid={!!errors.businessLicenseNo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.businessLicenseNo}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={6}
                    controlId="bankName"
                    className="form-group-address"
                  >
                    <Form.Label className="form-label">
                      {t(BANK_NAME)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="bankName"
                      value={values.bankName}
                      onChange={handleChange}
                      isInvalid={!!errors.bankName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bankName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={6}
                    controlId="bankBranch"
                    className="form-group-address"
                  >
                    <Form.Label className="form-label">
                      {t(BANK_BRANCH)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="bankBranch"
                      value={values.bankBranch}
                      onChange={handleChange}
                      isInvalid={!!errors.bankBranch}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bankBranch}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={6}
                    controlId="bankAccountHolderName"
                    className="form-group-licenseNo"
                  >
                    <Form.Label className="form-label">
                      {t(BANK_ACCOUNT_HOLDER_NAME)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="bankAccountHolderName"
                      value={values.bankAccountHolderName}
                      onChange={handleChange}
                      isInvalid={!!errors.bankAccountHolderName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bankAccountHolderName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={6}
                    controlId="bankAccountNumber"
                    className="form-group-address"
                  >
                    <Form.Label className="form-label">
                      {t(BANK_ACCOUNT_NUMBER)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="bankAccountNumber"
                      value={values.bankAccountNumber}
                      onChange={handleChange}
                      isInvalid={!!errors.bankAccountNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bankAccountNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <ButtonGroup className="form-actions">
                  <Button variant={BUTTONVARIANT.PRIMARY} type="submit">
                    <span>
                      {mode === ACTION_MODE.EDIT
                        ? t(BUTTONS_UPDATE)
                        : t(BUTTONS_CREATE)}
                    </span>
                    <i
                      className={`ico ${
                        mode === ACTION_MODE.EDIT ? 'ico-update' : 'ico-o-next'
                      }`}
                    ></i>
                  </Button>
                </ButtonGroup>
              </Container>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(BankAccountForm);
