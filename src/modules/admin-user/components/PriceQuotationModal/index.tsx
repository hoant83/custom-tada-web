import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import {
  Modal,
  Form,
  Col,
  Button,
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncSelect from 'react-select/async';
import adminService from '@/modules/admin-user/admin.service';
import { LICENSE } from '@/libs/constants/price-quotation';
import { getDisplayName, sortOptions } from '@/libs/utils/normalize.ulti';

interface ComponentProps {
  handleSubmit?: any;
  show?: boolean;
  license?: number;
  handleClose?: any;
  defaultData?: any;
  mode?: string;
  handleShowLicense?: any;
}

let timer: any = null;

const loadOptions = (inputValue: string, callback: any) => {
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const data: any = await adminService.getCustomerOptions(inputValue);

    let options = [];
    if (data.data?.result) {
      options = data.data.result.map((item: any) => ({
        label: getDisplayName(item),
        value: item.id,
      }));
    }
    options.sort(sortOptions);
    callback(options);
  }, 1000);
};

const PriceQuotationModal = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    handleSubmit,
    show,
    license,
    handleClose,
    defaultData,
    mode,
    handleShowLicense,
  } = props;

  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      background: '#f8f8f8',
      border: '0 solid #f8f8f8',
      minHeight: '46px',
      boxShadow: 'none',
      borderRadius: '12px',
      padding: '5px 0',
      paddingLeft: '10px',
      '&:hover': {
        border: '0 solid #f8f8f8',
      },
    }),
  };

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_REQUIRED,
    PRICE_QUOTATION_ADD_NEW_POPUP_TITLE,
    PRICE_QUOTATION_EDIT_POPUP_TITLE,
    PRICE_QUOTATION_NAME,
    PRICE_QUOTATION_TO_CUSTOMER,
    PRICE_QUOTATION_OK,
    PRICE_QUOTATION_CANCEL,
    PRICE_QUOTATION_ALL_CUSTOMER,
    PRICE_QUOTATION_UPGRADE_LICENSE_MODAL,
    TRACKING_UPGRADE,
  } = I18N;
  /*
   * Validation
   */
  const schema = yup.object({
    name: yup.string().required(t(VALIDATE_REQUIRED)),
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-custom modal-employee"
    >
      <Modal.Header>
        {mode === 'edit'
          ? t(PRICE_QUOTATION_EDIT_POPUP_TITLE)
          : t(PRICE_QUOTATION_ADD_NEW_POPUP_TITLE)}
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          initialValues={{
            id: defaultData?.id ? defaultData.id : null,
            name: defaultData?.name ? defaultData.name : '',
            toCustomers: defaultData?.toCustomers
              ? defaultData.toCustomers
              : [],
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
            <Form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="form form-employee"
            >
              <Form.Group
                as={Col}
                md="12"
                controlId="name"
                className="form-group-name"
              >
                <Form.Label className="form-label-required">
                  {t(PRICE_QUOTATION_NAME)} <span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="toCustomers"
                className="form-group-email"
              >
                <Form.Label className="form-label-required">
                  {t(PRICE_QUOTATION_TO_CUSTOMER)} <span>*</span>
                  <OverlayTrigger
                    key={'bottom'}
                    placement={'bottom'}
                    trigger={'click'}
                    rootClose
                    overlay={
                      <Tooltip
                        id="tooltip-info"
                        className="upgrade-tool-tip in-modal"
                      >
                        {t(PRICE_QUOTATION_UPGRADE_LICENSE_MODAL)}
                        <div>
                          <Button variant="primary" onClick={handleShowLicense}>
                            <i className="ico ico-verified mr-3"></i>
                            <span>{t(TRACKING_UPGRADE)}</span>
                          </Button>
                        </div>
                      </Tooltip>
                    }
                  >
                    <div className="tooltip-icon mr-5">
                      <span className="ico ico-faq"></span>
                    </div>
                  </OverlayTrigger>
                </Form.Label>
                <AsyncSelect
                  cacheOptions
                  loadOptions={loadOptions}
                  defaultOptions
                  isMulti
                  name="toCustomers"
                  placeholder={t(PRICE_QUOTATION_ALL_CUSTOMER)}
                  styles={customSelectStyles}
                  value={values.toCustomers}
                  onChange={(selectedOption) => {
                    handleChange({
                      target: { name: 'toCustomers', value: selectedOption },
                    });
                  }}
                  isDisabled={license === LICENSE.STANDARD}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.toCustomers}
                </Form.Control.Feedback>
              </Form.Group>
              <ButtonGroup className="form-actions">
                <Button variant="primary" type="button" onClick={handleClose}>
                  <span>{t(PRICE_QUOTATION_CANCEL)}</span>
                </Button>
                <Button variant="primary" type="submit">
                  <span>{t(PRICE_QUOTATION_OK)}</span>
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default observer(PriceQuotationModal);
