import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import { Modal, Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { PHONE_REGEXP, NUMBER_REGEXP } from '@/libs/constants/rules.constants';
import bsCustomFileInput from 'bs-custom-file-input';

import { ACTION_MODE } from '@/libs/enums/action.enum';

import { NewAdminDto } from '@/modules/admin-user/admin.dto';
import {
  AdminType,
  newAdminFormInit,
} from '@/modules/admin-user/admin.constants';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import { ACCOUNT_ROLE } from '../../admin.enum';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';

interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  handleSubmit?: any;
  handleDelete?: any;
  show?: boolean;
  handleClose?: any;
  mode?: string;
}

const AdminAccountFormModal = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    handleSubmit,
    handleDelete,
    show,
    handleClose,
    mode,
  } = props;

  const adminStore = React.useContext(AdminStoreContext);
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_REQUIRED,
    VALIDATE_PHONE,
    VALIDATE_NUMBER,
    VALIDATE_EMAIL,
    ADMIN_NEW_ACCOUNT,
    ADMIN_EDIT_ACCOUNT,
    CUSTOMER_NAME,
    CUSTOMER_EMAIL,
    CUSTOMER_PHONE,
    CUSTOMER_ROLE_LABEL,
    CUSTOMER_ADMIN_CARDNO,
    BUTTONS_CREATE,
    BUTTONS_DELETE,
    BUTTONS_UPDATE,
    ACCOUNT_PASSWORD,
    ACCOUNT_CONFIRM_PASSWORD,
    VALIDATE_CONFIRM_PASSWORD,
  } = I18N;

  const [initialValues, setInitValues] = React.useState<NewAdminDto>(
    newAdminFormInit
  );
  /*
   * Validation
   */
  const schema = yup.object({
    firstName: yup.string().required(t(VALIDATE_REQUIRED)),
    email: yup.string().required(t(VALIDATE_REQUIRED)).email(t(VALIDATE_EMAIL)),
    phoneNumber: yup
      .string()
      .required()
      .matches(PHONE_REGEXP, t(VALIDATE_PHONE)),
    cardNo: yup
      .string()
      .required(t(VALIDATE_REQUIRED))
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER)),
    userType: yup
      .string()
      .required(t(VALIDATE_REQUIRED))
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER)),
    password: yup.string(),
    confirmPassword: yup
      .string()
      .when('password', {
        is: (val) => val && val.length > 0,
        then: yup.string().required(t(VALIDATE_CONFIRM_PASSWORD)),
      })
      .oneOf([yup.ref('password')], t(VALIDATE_CONFIRM_PASSWORD)),
  });

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  React.useEffect(() => {
    setInitValues(adminStore.adminForm);
  }, [adminStore.adminForm]);

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`modal-custom modal-employee ${className ? className : ''}`}
      style={style}
    >
      <Modal.Header>
        {mode === ACTION_MODE.CREATE
          ? t(ADMIN_NEW_ACCOUNT)
          : t(ADMIN_EDIT_ACCOUNT)}
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          initialValues={initialValues}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
            <Form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className={`form form-employee ${className ? className : ''}`}
              style={style}
            >
              {children}
              <Form.Group
                as={Col}
                md="12"
                controlId="firstName"
                className="form-group-name"
              >
                <Form.Label className="form-label-required">
                  {t(CUSTOMER_NAME)} <span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="email"
                className="form-group-email"
              >
                <Form.Label className="form-label-required">
                  {t(CUSTOMER_EMAIL)} <span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="phoneNumber"
                className="form-group-phoneNumber"
              >
                <Form.Label className="form-label-required">
                  {t(CUSTOMER_PHONE)} <span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="cardNo"
                className="form-group-cardNo"
              >
                <Form.Label className="form-label-required">
                  {t(CUSTOMER_ADMIN_CARDNO)} <span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={values.cardNo}
                  onChange={handleChange}
                  isInvalid={!!errors.cardNo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cardNo}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="userType"
                className="form-group-userType"
              >
                <Form.Label className="form-label-required">
                  {t(CUSTOMER_ROLE_LABEL)} <span>*</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="userType"
                  defaultValue={values.userType}
                  onChange={handleChange}
                  isInvalid={!!errors.userType}
                >
                  {authStore.loggedUser?.userType === ACCOUNT_ROLE.SUPERADMIN
                    ? AdminType.map((value, index) => {
                        return (
                          <option
                            key={`account-type-${index}`}
                            value={value.key}
                          >
                            {t(value.label)}
                          </option>
                        );
                      })
                    : AdminType.filter((x) => x.isAdmin).map((value, index) => {
                        return (
                          <option
                            key={`account-type-${index}`}
                            value={value.key}
                          >
                            {t(value.label)}
                          </option>
                        );
                      })}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.userType}
                </Form.Control.Feedback>
              </Form.Group>
              {mode === ACTION_MODE.EDIT && (
                <>
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="password"
                    className="form-group-password"
                  >
                    <Form.Label className="form-label-required">
                      {t(ACCOUNT_PASSWORD)}
                    </Form.Label>
                    <Form.Control
                      type="password"
                      autoComplete="new-password"
                      value={values.password || ''}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="confirmPassword"
                    className="form-group-password"
                  >
                    <Form.Label className="form-label-required">
                      {t(ACCOUNT_CONFIRM_PASSWORD)}
                    </Form.Label>
                    <Form.Control
                      type="password"
                      autoComplete="new-password"
                      value={values.confirmPassword || ''}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                </>
              )}

              <ButtonGroup className="form-actions">
                {mode === ACTION_MODE.CREATE && (
                  <Button variant="primary" type="submit">
                    <span>{t(BUTTONS_CREATE)}</span>
                    <i className="ico ico-plus"></i>
                  </Button>
                )}
                {mode === ACTION_MODE.EDIT && (
                  <Button variant="primary" type="submit">
                    <span>{t(BUTTONS_UPDATE)}</span>
                    <i className="ico ico-plus"></i>
                  </Button>
                )}
                {mode === ACTION_MODE.EDIT && (
                  <Button onClick={handleDelete}>
                    <span>{t(BUTTONS_DELETE)}</span>
                    <i className="ico ico-delete"></i>
                  </Button>
                )}
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default observer(AdminAccountFormModal);
