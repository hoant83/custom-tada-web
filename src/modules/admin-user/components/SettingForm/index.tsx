import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import bsCustomFileInput from 'bs-custom-file-input';
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
import Image from 'react-bootstrap/Image';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { colors } from '../../admin.constants';
import { ACCOUNT_ROLE } from '../../admin.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  initialValues?: any;
  handleSubmitForm?: any;
  handleUploadLogo?: any;
  handleUploadQR?: any;
  handleDeleteFiles?: any;
  systemFile?: any;
}

const SettingForm = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);
  /*
   * Props of Component
   */
  const {
    initialValues,
    handleSubmitForm,
    handleUploadLogo,
    handleUploadQR,
    handleDeleteFiles,
    systemFile,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_UPDATE,
    BUTTONS_CHOOSE_IMAGE,
    SETTINGS_EMAIL,
    SETTINGS_FACEBOOK_LINK,
    SETTINGS_FACEBOOK_TEXT,
    SETTINGS_LOGO,
    SETTINGS_PHONE_NUMBER,
    SETTINGS_QR,
    SETTINGS_QR_TEXT,
    SETTINGS_IMAGE_SIZE,
    SETTINGS_IMAGE_SIZE_QR,
    SETTINGS_DEFAULT_COLOR,
    SETTINGS_MONTHLY_ORDER,
    SETTINGS_FOOTER,
    SETTINGS_THEME_AND_LOGO,
    SETTINGS_ORDER_QUANTITY,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    phoneNumber: yup.string().nullable(true).notRequired(),
    fbLabel: yup.string().nullable(true).notRequired(),
    fbLink: yup.string().nullable(true).notRequired(),
    qrLabel: yup.string().nullable(true).notRequired(),
    email: yup.string().nullable(true).notRequired(),
    companyName: yup.string().nullable(true).notRequired(),
  });

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  return (
    <>
      {initialValues && (
        <>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              handleSubmitForm(values);
            }}
            initialValues={initialValues}
          >
            {({ handleSubmit, handleChange, setFieldValue, values }) => (
              <Form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="form form-custom"
              >
                <Form.Row className="company-info">
                  <Container fluid>
                    <h4>{t(SETTINGS_FOOTER)}</h4>
                    <Row>
                      <Form.Group
                        as={Col}
                        xs={12}
                        lg={7}
                        controlId="email"
                        className="form-group-email"
                      >
                        <Form.Label className="form-label">
                          {t(SETTINGS_EMAIL)}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          value={values?.email ?? ''}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={12}
                        lg={5}
                        controlId="phoneNumber"
                        className="form-group-phoneNumber"
                      >
                        <Form.Label className="form-label">
                          {t(SETTINGS_PHONE_NUMBER)}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={values?.phoneNumber ?? ''}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        xs={12}
                        lg={7}
                        controlId="fbLink"
                        className="form-group-cardNo"
                      >
                        <Form.Label className="form-label">
                          {t(SETTINGS_FACEBOOK_LINK)}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={values?.fbLink ?? ''}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={12}
                        lg={5}
                        controlId="fbLabel"
                        className="form-group-phoneNumber"
                      >
                        <Form.Label className="form-label">
                          {t(SETTINGS_FACEBOOK_TEXT)}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={values?.fbLabel ?? ''}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group
                        as={Col}
                        xs={12}
                        lg={7}
                        controlId="qrLabel"
                        className="form-group-phoneNumber"
                      >
                        <Form.Label className="form-label">
                          {t(SETTINGS_QR_TEXT)}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={values?.qrLabel ?? ''}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        xs={12}
                        lg={5}
                        controlId="businessLicenseUrl"
                        className="form-group-businessLicenseUrl"
                      >
                        <div className="form-image-wrapper">
                          <Form.Label className="form-label">
                            {t(SETTINGS_QR)}
                            <span className="image-size">
                              {t(SETTINGS_IMAGE_SIZE_QR)}
                            </span>
                          </Form.Label>
                          {systemFile?.qr && (
                            <div className="image">
                              <a
                                className="zoom-image"
                                href={systemFile?.qrUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Image src={`${systemFile?.qrUrl}`} />
                              </a>
                              <Button
                                className="btn-icon"
                                onClick={() => {
                                  handleDeleteFiles(REFERENCE_TYPE.FOOTER_QR);
                                }}
                              >
                                <i className="ico ico-o-close"></i>
                              </Button>
                            </div>
                          )}
                          <Form.File
                            id="iconCompany"
                            label={t(BUTTONS_CHOOSE_IMAGE)}
                            onChange={handleUploadQR}
                            custom
                          />
                        </div>
                      </Form.Group>
                    </Row>
                    <h4>{t(SETTINGS_THEME_AND_LOGO)}</h4>
                    <Row>
                      <Form.Group
                        as={Col}
                        xs={12}
                        lg={7}
                        controlId="defaultColor"
                        className="form-group-phoneNumber"
                      >
                        <Form.Label className="form-label">
                          {t(SETTINGS_DEFAULT_COLOR)}
                        </Form.Label>
                        <Form.Control
                          as="select"
                          value={values.defaultColor}
                          onChange={handleChange}
                        >
                          {colors.map((value, index) => {
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
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        xs={12}
                        lg={7}
                        controlId="companyIconUrl"
                        className="form-group-companyIconUrl"
                      >
                        <div className="form-image-wrapper">
                          <Form.Label className="form-label">
                            {t(SETTINGS_LOGO)}
                            <span className="image-size">
                              {t(SETTINGS_IMAGE_SIZE)}
                            </span>
                          </Form.Label>
                          {systemFile?.logo && (
                            <div className="image">
                              <a
                                className="zoom-image"
                                href={systemFile?.logoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Image src={`${systemFile?.logoUrl}`} />
                              </a>
                              <Button
                                className="btn-icon"
                                onClick={() => {
                                  systemFile.logo = null;
                                  handleDeleteFiles(
                                    REFERENCE_TYPE.CUSTOMER_LOGO
                                  );
                                }}
                              >
                                <i className="ico ico-o-close"></i>
                              </Button>
                            </div>
                          )}
                          <Form.File
                            id="companyIconUrl"
                            label={t(BUTTONS_CHOOSE_IMAGE)}
                            onChange={handleUploadLogo}
                            custom
                          />
                        </div>
                      </Form.Group>
                    </Row>
                    <h4>{t(SETTINGS_ORDER_QUANTITY)}</h4>
                    <Row>
                      <Form.Group
                        as={Col}
                        xs={12}
                        lg={7}
                        controlId="monthlyOrder"
                        className="form-group-phoneNumber"
                      >
                        <Form.Label className="form-label">
                          {t(SETTINGS_MONTHLY_ORDER)}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={values?.monthlyOrder ?? ''}
                          onChange={handleChange}
                          readOnly={
                            authStore.loggedUser?.userType !==
                            ACCOUNT_ROLE.SUPERADMIN
                          }
                        />
                      </Form.Group>
                    </Row>
                    <ButtonGroup className="form-actions">
                      <Button variant={BUTTONVARIANT.PRIMARY} type="submit">
                        <span>{t(BUTTONS_UPDATE)}</span>
                        <i className="ico ico-update"></i>
                      </Button>
                    </ButtonGroup>
                  </Container>
                </Form.Row>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default observer(SettingForm);
