import GoogleMapAutocomplete from '@/libs/components/GoogleMapAutocomplete';
import GoogleMapAutocompleteDynamic from '@/libs/components/GoogleMapAutoCompleteDynamic';
import { PHONE_REGEXP } from '@/libs/constants/rules.constants';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import { ServiceType } from '@/modules/order/order.constants';
import { ACTIONS_MODE, SERVICE_TYPE } from '@/modules/order/order.enum';
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
import AsyncSelect from 'react-select/async';
import { getDisplayName } from '@/libs/utils/normalize.ulti';
import customerService from '@/modules/customer/customer.service';

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

let timer: any = null;

const loadOptions = (inputValue: string, callback: any) => {
  clearTimeout(timer);
  if (inputValue && inputValue.trim() !== '') {
    timer = setTimeout(async () => {
      const data: any = await customerService.getFavoriteTruckOwnerByPublicId(
        inputValue
      );

      let options: any = [];
      if (data.data?.result) {
        options = [
          {
            label: getDisplayName(data.data.result),
            value: data.data.result.id,
          },
        ];
      }
      callback(options);
    }, 1000);
  }
};

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  initialValues: any;
  mode?: string;
  serviceType: SERVICE_TYPE;
  handleServiceType: any;
  handleSubmitForm: any;
  handleChangeDropOff: any;
  dropOffFields: any;
  handleChangeDynamic: any;
  handleClearData?: any;
}

const QuickForm = (props: ComponentProps) => {
  const customerStore = React.useContext(CustomerStoreContext);
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    initialValues,
    mode = 'created',
    serviceType,
    handleServiceType,
    handleSubmitForm,
    handleChangeDropOff,
    handleChangeDynamic,
    dropOffFields,
    handleClearData,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_REQUIRED,
    VALIDATE_PHONE,
    ORDER_DETAIL_REQUEST,
    ORDER_SERVICETYPE_LABELNOTE,
    ORDER_PICKUP_ADDRESS,
    ORDER_DROPOFF_ADDRESS,
    ORDER_INCHARGE_NAME,
    ORDER_INCHARGE_CONTACTNO,
    ORDER_OTHERGENERALNOTES,
    BUTTONS_CREATE,
    BUTTONS_UPDATE,
    ORDER_ADD_NEW_FAV,
    ORDER_ASSIGN_TO_FAV,
    ORDER_ENTER_YOUR_PARTNER_CODE,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    pickupAddressText: yup.string().required(t(VALIDATE_REQUIRED)),
    dropOffFields: yup.array().of(
      yup.object().shape({
        dropoffAddressText: yup.string().required(t(VALIDATE_REQUIRED)),
      })
    ),
    detailRequest: yup.string().required(t(VALIDATE_REQUIRED)),
    inChargeName: yup.string().notRequired(),
    inChargeContactNo: yup
      .string()
      .matches(PHONE_REGEXP, t(VALIDATE_PHONE))
      .notRequired(),
    otherGeneralNotes: yup.string().notRequired(),
  });

  const handleLocalStorage = (value: object, field: string) => {
    const a = [];
    if (localStorage.getItem(field)) {
      let data = JSON.parse(localStorage.getItem(field) || '');
      if (data.length > 4) {
        data = data.slice(0, 4);
      }
      data.unshift(value);
      localStorage.setItem(field, JSON.stringify(data));
    } else {
      a.push(value);
      localStorage.setItem(field, JSON.stringify(a));
    }
  };

  const handleChooseRecent = async (
    value: any,
    field: string,
    setFieldValue: any,
    index?: number
  ) => {
    if (value === 'address-book') {
      return true;
    }
    if (typeof index === 'number') {
      await handleChangeDropOff(value, index, true);
      return true;
    }
    handleChangePlace(value, field, setFieldValue, true);
  };

  const handleChooseAddressBook = (
    data: any,
    field: string,
    setFieldValue: any,
    index?: number
  ) => {
    const dataAddress = data.value;
    if (typeof index === 'number') {
      const currentAddress = [...dropOffFields];
      currentAddress[index].dropoffAddressText = dataAddress?.locationAddress;
      currentAddress[index].dropoffAddress = dataAddress?.dropoffAddress;
      setFieldValue('dropOffFields', currentAddress, false);
      return true;
    }
    setFieldValue(field, dataAddress?.locationAddress, false);
    if (field === 'pickupAddressText') {
      setFieldValue('pickupAddress', dataAddress.pickupAddress, false);
      setFieldValue('pickupCity', dataAddress.pickupCity, false);
    }
    if (field === 'dropoffAddressText') {
      setFieldValue('dropoffAddress', dataAddress.pickupAddress, false);
    }
  };

  const handleChangePlace = (
    value: any,
    field: string,
    setFieldValue: any,
    isJson: boolean
  ) => {
    setFieldValue(field, value?.formatted_address, false);
    handleLocalStorage(value, field);
    if (field === 'pickupAddressText') {
      if (!isJson) {
        setFieldValue(
          'pickupAddress',
          [value.geometry?.location?.lat(), value.geometry?.location?.lng()],
          false
        );
      } else {
        setFieldValue(
          'pickupAddress',
          [value.geometry?.location?.lat, value.geometry?.location?.lng],
          false
        );
      }

      value?.address_components.map((value: any) => {
        if (value.types[0] === 'administrative_area_level_1') {
          setFieldValue('pickupCity', value.short_name, false);
        }
      });
      const pickupField = document.getElementById('pickupAddressText');
      if (pickupField) {
        pickupField.classList.remove('no-google');
      }
    }
    if (field === 'dropoffAddressText') {
      if (!isJson) {
        setFieldValue(
          'dropoffAddress',
          [value.geometry?.location?.lat(), value.geometry?.location?.lng()],
          false
        );
      } else {
        setFieldValue(
          'dropoffAddress',
          [value.geometry?.location?.lat, value.geometry?.location?.lng],
          false
        );
      }
    }
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          handleSubmitForm(values, initialValues);
        }}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
          <Form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={`form form-order form-quick-order ${
              className ? className : ''
            }`}
            style={style}
          >
            <Form.Row className="service-type">
              <Container fluid>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="serviceType"
                    className="serviceType"
                    xs="12"
                    lg="8"
                  >
                    <Form.Label className="form-label-required">
                      {t(ORDER_SERVICETYPE_LABELNOTE)} <span>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="serviceType"
                      defaultValue={serviceType}
                      onChange={handleServiceType}
                    >
                      {ServiceType.map((value, index) => (
                        <option key={`service-type-${index}`} value={value.key}>
                          {t(value.label)}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    xs="12"
                    controlId="pickupAddressText"
                    className="pickupAddressText"
                  >
                    <Form.Label className="form-label-required">
                      {t(ORDER_PICKUP_ADDRESS)} <span>*</span>
                    </Form.Label>
                    <GoogleMapAutocomplete
                      handleChangePlace={handleChangePlace}
                      field="pickupAddressText"
                      setFieldValue={setFieldValue}
                      componentId="pickupAddressText"
                      value={values.pickupAddressText}
                      onChange={handleChange}
                      isInvalid={!!errors.pickupAddressText}
                      handleChooseRecent={handleChooseRecent}
                      handleChooseAddressBook={handleChooseAddressBook}
                      handleClearData={handleClearData}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.pickupAddressText}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    xs="12"
                    controlId="dropoffAddressText"
                    className="dropoffAddressText"
                  >
                    <Form.Label className="form-label-required">
                      {t(ORDER_DROPOFF_ADDRESS)} <span>*</span>
                    </Form.Label>
                    <GoogleMapAutocompleteDynamic
                      handleChangePlace={(values: any) => {
                        handleChangeDropOff(values, 0);
                      }}
                      field="dropoffAddressText"
                      setFieldValue={setFieldValue}
                      componentId={`dropoffAddressText-${0}`}
                      value={values.dropOffFields[0].dropoffAddressText}
                      onChange={(event: any) => {
                        handleChangeDynamic(0, event, 'dropoffAddressText');
                        handleClearData('dropoffAddressText', setFieldValue, 0);
                      }}
                      handleChooseRecent={async (value: any) => {
                        handleChooseRecent(
                          value,
                          'dropoffAddressText',
                          setFieldValue,
                          0
                        );
                      }}
                      handleChooseAddressBook={async (value: any) => {
                        handleChooseAddressBook(
                          value,
                          'dropoffAddressText',
                          setFieldValue,
                          0
                        );
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    xs="12"
                    controlId="detailRequest"
                    className="detailRequest"
                  >
                    <Form.Label className="form-label-required">
                      {t(ORDER_DETAIL_REQUEST)} <span>*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={values.detailRequest}
                      onChange={handleChange}
                      isInvalid={!!errors.detailRequest}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.detailRequest}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={12}
                    controlId="assignToFav"
                    className="form-group-paymentType"
                  >
                    <Form.Label className="form-label-required assign-to-fav">
                      {t(ORDER_ASSIGN_TO_FAV)}{' '}
                    </Form.Label>
                    <AsyncSelect
                      cacheOptions
                      isClearable
                      loadOptions={loadOptions}
                      defaultOptions={customerStore.favoriteTruckOwers.map(
                        (item: any) => ({
                          value: item.id,
                          label: getDisplayName(item),
                        })
                      )}
                      name="assignToFavSelect"
                      placeholder={t(ORDER_ENTER_YOUR_PARTNER_CODE)}
                      styles={customSelectStyles}
                      className="multi-select"
                      value={values.assignToFavSelect}
                      onChange={(selectedOption) => {
                        handleChange({
                          target: {
                            name: 'assignToFav',
                            value: selectedOption?.value ?? null,
                          },
                        });
                        handleChange({
                          target: {
                            name: 'assignToFavSelect',
                            value: selectedOption,
                          },
                        });
                      }}
                    />
                    <span
                      onClick={() => {
                        window.open(
                          `${CUSTOMER_ROUTERS.SETUP}?scroll=my-favourite`
                        );
                      }}
                      className="new-fav-redirect"
                    >
                      {t(ORDER_ADD_NEW_FAV)}
                    </span>
                  </Form.Group>
                </Row>
              </Container>
            </Form.Row>
            <Form.Row as={Row} className="created-by">
              <Container fluid>
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={7}
                    controlId="inChargeName"
                    className="inChargeName"
                  >
                    <Form.Label>{t(ORDER_INCHARGE_NAME)}</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.inChargeName}
                      onChange={handleChange}
                      isInvalid={!!errors.inChargeName}
                      defaultValue={initialValues.orderManagerName ?? ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.inChargeName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    controlId="inChargeContactNo"
                    className="inChargeContactNo"
                  >
                    <Form.Label>{t(ORDER_INCHARGE_CONTACTNO)}</Form.Label>
                    <Form.Control
                      type="text"
                      value={values.inChargeContactNo}
                      onChange={handleChange}
                      isInvalid={!!errors.inChargeContactNo}
                      defaultValue={initialValues.orderManagerNo ?? ''}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.inChargeContactNo}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    controlId="otherGeneralNotes"
                    className="otherGeneralNotes"
                  >
                    <Form.Label>{t(ORDER_OTHERGENERALNOTES)}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={values.otherGeneralNotes}
                      onChange={handleChange}
                      isInvalid={!!errors.otherGeneralNotes}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.otherGeneralNotes}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Container>
            </Form.Row>
            <ButtonGroup className="form-actions">
              <Button variant="primary" type="submit">
                <span>
                  {mode === ACTIONS_MODE.EDIT
                    ? t(BUTTONS_UPDATE)
                    : t(BUTTONS_CREATE)}
                </span>
                <i
                  className={`ico ${
                    mode === ACTIONS_MODE.EDIT ? 'ico-update' : 'ico-o-next'
                  }`}
                ></i>
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
      {children}
    </>
  );
};

export default observer(QuickForm);
