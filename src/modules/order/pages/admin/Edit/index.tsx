/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import ConfirmModal from '@/libs/components/ConfirmModal';
import { NUMBER_REGEXP, PHONE_REGEXP } from '@/libs/constants/rules.constants';
import { isValidDate } from '@/libs/utils/time.util';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { SETTING_TYPE } from '@/modules/admin-user/admin.enum';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { I18N } from '@/modules/lang/i18n.enum';
import { OrderListDto } from '@/modules/order/order.dto';
import {
  ACTIONS_MODE,
  ORDER_STATUS,
  SERVICE_TYPE,
} from '@/modules/order/order.enum';
import { OrderStoreContext } from '@/modules/order/order.store';
import { ADMIN_ORDER_ROUTERS } from '@/modules/order/router.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import {
  makeStyles,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
  withStyles,
} from '@material-ui/core';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import { Formik } from 'formik';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import StepOne from '../Create/StepOne';
import StepThree from '../Create/StepThree';
import StepTwo from '../Create/StepTwo';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient(-90deg, #fab91a 0, #fab91a 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient(-90deg, #fab91a 0, #fab91a 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 35,
    height: 35,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage: 'linear-gradient(-90deg, #fab91a 0, #fab91a 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage: 'linear-gradient(-90deg, #fab91a 0, #fab91a 100%)',
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {props.icon}
    </div>
  );
}

const EditOrderAdminPage = () => {
  const orderStore = React.useContext(OrderStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);
  const customerStore = React.useContext(CustomerStoreContext);
  const history = useHistory();
  const { orderID } = useParams() as any;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_EDIT_TITLE,
    ORDER_CREATE_TITLENOTE,
    ORDER_TRUCK_STEP,
    ORDER_ADDRESS_STEP,
    ORDER_PAYMENT_STEP,
    VALIDATE_PHONE,
    VALIDATE_NUMBER,
    BUTTONS_CANCEL,
    BUTTONS_CONFIRM,
    BUTTONS_BACK_STEP,
    BUTTONS_NEXT_STEP,
    ADDRESS_NOT_VALID,
    VALIDATE_REQUIRED,
  } = I18N;

  /*
   * Get list by criteria
   */
  const [criteriaDto] = React.useState<OrderListDto>({
    order: { id: orderID },
  });

  /*
   * set mode to created
   */
  const [mode] = React.useState<ACTIONS_MODE>(ACTIONS_MODE.EDIT);

  /*
   * set type of transportation
   */
  const [serviceType, setServiceType] = React.useState<SERVICE_TYPE>(
    orderStore.orders[0]?.orderType ?? SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK
  );

  const [pickupTime, onChange] = React.useState(null);

  const [dropoffTime, onChangeDropoff] = React.useState(null);

  /*
   * action of type of transportation
   *
   * @param any event
   * @return void
   */
  const handleChangeTransportation = (event: any) => {
    if (orderStore.editingAdminOrder.status === ORDER_STATUS.CREATED) {
      orderStore.editingAdminOrder.serviceType = event.target.value;
    }
    setServiceType(event.target.value);
  };

  const deleteEmptyValue = (values: any) => {
    Object.keys(values).forEach((key) => {
      if (values[key] === '') values[key] = null;
    });
    return values;
  };

  const handlePricing = async (values: any) => {
    values.serviceType = serviceType;
    let array: any[] = [];
    selected.map((u) => {
      array.push(u.value);
    });
    values.specialRequests = array;
    let data = values;
    if (serviceType === SERVICE_TYPE.NORMAL_TRUCK_VAN) {
      data = await deleteInitWithNormalTruck(values);
    }

    if (serviceType === SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK) {
      data = await deleteInitWithTracktorTruck(values);
    }

    if (serviceType === SERVICE_TYPE.NON_MOTORIZED) {
      data = await deleteInitWithNonMotorized(values);
    }

    if (serviceType === SERVICE_TYPE.CONCATENATED_GOODS) {
      data = await deleteInitWithConcatenatedGoods(values);
    }

    if (serviceType === SERVICE_TYPE.CONTRACT_CAR) {
      data = await deleteInitWithContractCar(values);
    }
    orderStore.setOrderRequestDto(data);
    const result = await orderStore.getPricing();
    values.suggestedPrice = result;
  };

  const deleteInitWithNormalTruck = async (values: any) => {
    delete values.containerSize;
    delete values.containerQuantity;
    delete values.containerType;
    delete values.dropoffEmptyAddress;
    delete values.dropoffEmptyContainer;
    delete values.pickupEmptyAddress;
    delete values.pickupEmptyContainer;
    delete values.nonMotorizedType;
    delete values.nonMotorizedQuantity;
    delete values.concatenatedGoodsType;
    delete values.concatenatedGoodsQuantity;
    delete values.contractCarType;
    delete values.contractCarQuantity;
    return values;
  };

  const deleteInitWithTracktorTruck = async (values: any) => {
    delete values.truckPayload;
    delete values.truckQuantity;
    delete values.truckSpecialType;
    delete values.truckType;
    delete values.nonMotorizedType;
    delete values.nonMotorizedQuantity;
    delete values.concatenatedGoodsType;
    delete values.concatenatedGoodsQuantity;
    delete values.contractCarType;
    delete values.contractCarQuantity;
    return values;
  };

  const deleteInitWithNonMotorized = async (values: any) => {
    delete values.truckPayload;
    delete values.truckQuantity;
    delete values.truckSpecialType;
    delete values.truckType;
    delete values.containerSize;
    delete values.containerQuantity;
    delete values.containerType;
    delete values.dropoffEmptyAddress;
    delete values.dropoffEmptyContainer;
    delete values.pickupEmptyAddress;
    delete values.pickupEmptyContainer;
    delete values.concatenatedGoodsType;
    delete values.concatenatedGoodsQuantity;
    delete values.contractCarType;
    delete values.contractCarQuantity;
    return values;
  };

  const deleteInitWithConcatenatedGoods = async (values: any) => {
    delete values.truckPayload;
    delete values.truckQuantity;
    delete values.truckSpecialType;
    delete values.truckType;
    delete values.containerSize;
    delete values.containerQuantity;
    delete values.containerType;
    delete values.dropoffEmptyAddress;
    delete values.dropoffEmptyContainer;
    delete values.pickupEmptyAddress;
    delete values.pickupEmptyContainer;
    delete values.nonMotorizedType;
    delete values.nonMotorizedQuantity;
    delete values.contractCarType;
    delete values.contractCarQuantity;
    return values;
  };

  const deleteInitWithContractCar = async (values: any) => {
    delete values.truckPayload;
    delete values.truckQuantity;
    delete values.truckSpecialType;
    delete values.truckType;
    delete values.containerSize;
    delete values.containerQuantity;
    delete values.containerType;
    delete values.dropoffEmptyAddress;
    delete values.dropoffEmptyContainer;
    delete values.pickupEmptyAddress;
    delete values.pickupEmptyContainer;
    delete values.nonMotorizedType;
    delete values.nonMotorizedQuantity;
    delete values.concatenatedGoodsType;
    delete values.concatenatedGoodsQuantity;
    return values;
  };

  /*
   * action of create button
   *
   * @param any values
   * @return void
   */
  const handleSubmit = async (values: any, initValue: any) => {
    let dropoffData = [...values.dropOffFields];

    for (let i = 0; i < dropoffData.length; i++) {
      if (!isValidDate(dropoffData[i].dropoffTime)) {
        dropoffData[i].dropoffTime = '';
      }
    }

    values.price = initValue.price;
    values.vat = initValue.vat;
    values.serviceType = serviceType;
    values.truckPayload = truckPayloadDefault;
    values.truckType = truckTypeDefault;
    values.paymentType = +values.paymentType;
    values.useSuggestedPrice = suggestedPrice;
    values.price = showPrice;
    values.useQuotePrice = quotePrice;
    values.dropOffFields = dropoffData;
    let array: any[] = [];
    selected.map((u) => {
      array.push(u.value);
    });
    values.specialRequests = array;
    if (!suggestedPrice) {
      values.suggestedPrice = null;
    }
    if (!showPrice) {
      values.priceRequest = null;
    }
    values.containerSize =
      values.containerSize !== '' ? values.containerSize : null;
    values.containerType =
      values.containerType !== '' ? values.containerType : null;
    values.containerQuantity =
      values.containerQuantity !== '' ? values.containerQuantity : null;
    values.nonMotorizedType =
      values.nonMotorizedType !== '' ? values.nonMotorizedType : null;
    values.nonMotorizedQuantity =
      values.nonMotorizedQuantity !== '' ? values.nonMotorizedQuantity : null;
    values.concatenatedGoodsType =
      values.concatenatedGoodsType !== '' ? values.concatenatedGoodsType : null;
    values.concatenatedGoodsQuantity =
      values.concatenatedGoodsQuantity !== ''
        ? values.concatenatedGoodsQuantity
        : null;
    values.contractCarType =
      values.contractCarType !== '' ? values.contractCarType : null;
    values.contractCarQuantity =
      values.contractCarQuantity !== '' ? values.contractCarQuantity : null;
    values.cargoType = values.cargoType !== '' ? values.cargoType : null;
    values.cargoName = values.cargoName !== '' ? values.cargoName : null;
    values.truckSpecialType =
      values.truckSpecialType !== '' ? values.truckSpecialType : null;

    delete values.metadata;

    if (serviceType === SERVICE_TYPE.NORMAL_TRUCK_VAN) {
      delete values.containerSize;
      delete values.containerQuantity;
      delete values.containerType;
      delete values.dropoffEmptyAddress;
      delete values.dropoffEmptyContainer;
      delete values.pickupEmptyAddress;
      delete values.pickupEmptyContainer;
      delete values.nonMotorizedType;
      delete values.nonMotorizedQuantity;
      delete values.concatenatedGoodsType;
      delete values.concatenatedGoodsQuantity;
      delete values.contractCarType;
      delete values.contractCarQuantity;
    }

    if (serviceType === SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK) {
      delete values.truckLoad;
      delete values.truckQuantity;
      delete values.truckSpecialType;
      delete values.nonMotorizedType;
      delete values.nonMotorizedQuantity;
      delete values.concatenatedGoodsType;
      delete values.concatenatedGoodsQuantity;
      delete values.contractCarType;
      delete values.contractCarQuantity;
    }

    if (serviceType === SERVICE_TYPE.NON_MOTORIZED) {
      delete values.truckPayload;
      delete values.truckQuantity;
      delete values.truckSpecialType;
      delete values.truckType;
      delete values.containerSize;
      delete values.containerQuantity;
      delete values.containerType;
      delete values.dropoffEmptyAddress;
      delete values.dropoffEmptyContainer;
      delete values.pickupEmptyAddress;
      delete values.pickupEmptyContainer;
      delete values.concatenatedGoodsType;
      delete values.concatenatedGoodsQuantity;
      delete values.contractCarType;
      delete values.contractCarQuantity;
    }

    if (serviceType === SERVICE_TYPE.CONCATENATED_GOODS) {
      delete values.truckPayload;
      delete values.truckQuantity;
      delete values.truckSpecialType;
      delete values.truckType;
      delete values.containerSize;
      delete values.containerQuantity;
      delete values.containerType;
      delete values.dropoffEmptyAddress;
      delete values.dropoffEmptyContainer;
      delete values.pickupEmptyAddress;
      delete values.pickupEmptyContainer;
      delete values.nonMotorizedType;
      delete values.nonMotorizedQuantity;
      delete values.contractCarType;
      delete values.contractCarQuantity;
    }

    if (serviceType === SERVICE_TYPE.CONTRACT_CAR) {
      delete values.truckPayload;
      delete values.truckQuantity;
      delete values.truckSpecialType;
      delete values.truckType;
      delete values.containerSize;
      delete values.containerQuantity;
      delete values.containerType;
      delete values.dropoffEmptyAddress;
      delete values.dropoffEmptyContainer;
      delete values.pickupEmptyAddress;
      delete values.pickupEmptyContainer;
      delete values.nonMotorizedType;
      delete values.nonMotorizedQuantity;
      delete values.concatenatedGoodsType;
      delete values.concatenatedGoodsQuantity;
    }

    values = await deleteEmptyValue(values);
    const result = await orderStore.updateOrder(values, orderID);
    if (result) {
      orderPhotos.map(async (orderPhoto: any) => {
        if (orderPhoto.size) {
          await orderStore.uploadDocument(orderPhoto, orderID);
        }
      });
      history.push(ADMIN_ORDER_ROUTERS.ADMIN_MANAGE);
    }
  };
  const stepTitle = [ORDER_TRUCK_STEP, ORDER_ADDRESS_STEP, ORDER_PAYMENT_STEP];

  /*
   * show hide new/edit driver popup
   */
  const [, setShowConfirmPopup] = React.useState<boolean>(false);

  const [showVat, setShowVat] = React.useState<boolean>(
    orderStore.editingAdminOrder?.vat
      ? orderStore.editingAdminOrder?.vat
      : false
  );

  const [showPrice, setShowPrice] = React.useState<boolean>(
    orderStore.editingOrder?.price ?? false
  );

  const [suggestedPrice, setSuggestedPrice] = React.useState<boolean>(
    orderStore.editingOrder?.useSuggestedPrice ?? false
  );

  const [quotePrice, setQuotePrice] = React.useState<boolean>(
    orderStore.editingOrder?.useQuotePrice ?? false
  );

  const [truckTypeDefault, setTruckTypeDefault] = React.useState<number>(-1);

  const [truckPayloadDefault, setTruckPayloadDefault] = React.useState<number>(
    -1
  );

  const [, setPaymentDefault] = React.useState<number>(-1);

  const handleChangeTruckPayload = (event: any) => {
    setTruckPayloadDefault(event.target.value);
  };

  const handleChangeTruckType = (event: any) => {
    setTruckTypeDefault(event.target.value);
  };

  const handleChangePaymentType = (event: any) => {
    setPaymentDefault(event.target.value);
  };

  const handleChangeDropOffTime = (value: any, index: number) => {
    const date = new Date(value);
    orderStore.editingAdminOrder.dropOffFields[index].dropoffTime = date;
  };

  /*
   * action of changing order type
   *
   * @param ORDER_TYPE value
   * @return void
   */
  const handleChangeOrderType = () => {};

  /*
   * action of delete button
   *
   * @param void
   * @return void
   */
  const handleCloneAction = () => {};

  const schemaStepOne = yup.object({
    status: yup.string().notRequired(),
    referenceNo: yup.string().notRequired().nullable(),
    truckType: yup.string().notRequired().nullable(),
    truckQuantity: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired()
      .nullable(),
    truckPayload: yup.string().notRequired().nullable(),
    cargoType: yup.string().notRequired().nullable(),
    cargoName: yup.string().notRequired().nullable(),
    cargoWeight: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired()
      .nullable(),
    packageSize: yup.string().notRequired().nullable(),
    referenceNote: yup.string().notRequired().nullable(),
  });

  const schemaStepOneNonMoto = yup.object({
    status: yup.string().notRequired(),
    referenceNo: yup.string().notRequired(),
    nonMotorizedType: yup.string().required(t(VALIDATE_REQUIRED)).nullable(),
    nonMotorizedQuantity: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .required(t(VALIDATE_REQUIRED)),
    cargoType: yup.string().required(t(VALIDATE_REQUIRED)),
    cargoName: yup.string().required(t(VALIDATE_REQUIRED)),
    cargoWeight: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired(),
    packageSize: yup.string().notRequired(),
    packageSizeText: yup.string().notRequired(),
    referenceNote: yup.string().notRequired(),
  });

  const schemaStepOneConcatenatedGoods = yup.object({
    status: yup.string().notRequired(),
    referenceNo: yup.string().notRequired(),
    concatenatedGoodsType: yup
      .string()
      .required(t(VALIDATE_REQUIRED))
      .nullable(),
    concatenatedGoodsQuantity: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .required(t(VALIDATE_REQUIRED)),
    cargoType: yup.string().required(t(VALIDATE_REQUIRED)),
    cargoName: yup.string().required(t(VALIDATE_REQUIRED)),
    cargoWeight: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired(),
    packageSize: yup.string().notRequired(),
    packageSizeText: yup.string().notRequired(),
    referenceNote: yup.string().notRequired(),
  });

  const schemaStepOneContractCar = yup.object({
    status: yup.string().notRequired(),
    referenceNo: yup.string().notRequired(),
    contractCarType: yup.string().required(t(VALIDATE_REQUIRED)).nullable(),
    contractCarQuantity: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .required(t(VALIDATE_REQUIRED)),
    cargoType: yup.string().required(t(VALIDATE_REQUIRED)),
    cargoName: yup.string().required(t(VALIDATE_REQUIRED)),
    cargoWeight: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired(),
    packageSize: yup.string().notRequired(),
    packageSizeText: yup.string().notRequired(),
    referenceNote: yup.string().notRequired(),
  });

  const schemaStepOneTrailor = yup.object({
    status: yup.string().notRequired(),
    referenceNo: yup.string().notRequired().nullable(),
    containerSize: yup.string().notRequired().nullable(),
    containerQuantity: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired()
      .nullable(),
    containerType: yup.string().notRequired().nullable(),
    cargoType: yup.string().notRequired().nullable(),
    cargoName: yup.string().notRequired().nullable(),
    cargoWeight: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired()
      .nullable(),
    packageSize: yup.string().notRequired().nullable(),
    referenceNote: yup.string().notRequired().nullable(),
  });

  const schemaStepTwo = yup.object().shape({
    pickupAddressText: yup.string().notRequired(),
    pickupContactNo: yup
      .string()
      .matches(PHONE_REGEXP, t(VALIDATE_PHONE))
      .notRequired()
      .nullable(),
    pickupTime: yup.string().notRequired().nullable(),
    dropOffFields: yup.array().of(
      yup.object().shape({
        dropoffContact: yup.string().notRequired().nullable(),
        dropoffTime: yup.string().notRequired().nullable(),
        dropoffAddressText: yup.string().notRequired().nullable(),
        dropoffContactNo: yup
          .string()
          .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
          .notRequired()
          .nullable(),
      })
    ),
  });

  const schemaStepThree = yup.object({
    TADAPrice: yup.string().notRequired().nullable(),
    ownPrice: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired()
      .nullable(),
    email: yup.string().notRequired().nullable(),
    bussinessLicenseNO: yup.string().notRequired().nullable(),
    address: yup.string().notRequired().nullable(),
    companyName: yup.string().notRequired().nullable(),
    vat: yup.boolean().notRequired().nullable(),
    vatInfo: yup.string().notRequired().nullable(),
    inChargeName: yup.string().notRequired().nullable(),
    inChargeContactNo: yup
      .string()
      .matches(PHONE_REGEXP, t(VALIDATE_PHONE))
      .notRequired()
      .nullable(),
    otherGeneralNotes: yup.string().notRequired().nullable(),
    paymentType: yup.string().notRequired().nullable(),
    suggestedPrice: yup.string().notRequired().nullable(),
  });
  const [schemaStep, setSchemaStep] = React.useState([
    serviceType === SERVICE_TYPE.NORMAL_TRUCK_VAN
      ? schemaStepOne
      : serviceType === SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK
      ? schemaStepOneTrailor
      : schemaStepOneNonMoto,
    schemaStepTwo,
    schemaStepThree,
  ]);

  const [stepNumber, setStepNumber] = React.useState<number>(0);
  const steps = [0, 1, 2];

  const isLastStep = stepNumber === steps.length - 1;

  const handleNext = () => {
    setStepNumber(stepNumber + 1);
  };

  const handleBack = () => {
    setStepNumber(stepNumber - 1);
  };

  const handleClearData = (
    field: string,
    setFieldValue: any,
    index?: number
  ) => {
    if (field === 'pickupAddressText') {
      setFieldValue('pickupAddress', null, false);
      setFieldValue('pickupCity', null, false);

      const pickupField = document.getElementById('pickupAddressText');
      if (pickupField) {
        pickupField.classList.add('no-google');
      }
    }

    if (field === 'dropoffAddressText' && index !== undefined) {
      const dropoffField = orderStore.editingAdminOrder.dropOffFields;
      dropoffField[index].dropoffAddress = null;
      const pickupField = document.getElementById(
        `dropoffAddressText-${index}`
      );
      if (pickupField) {
        pickupField.classList.add('no-google');
      }
    }
  };

  const [submitData, setSubmitData] = React.useState<any>({});

  const [showConfirmAddressPopup, setShowConfirmAddressPopup] = React.useState<
    boolean
  >(false);

  const handleCancelAddress = () => {
    setShowConfirmAddressPopup(false);
  };

  const handleOkAddress = () => {
    setShowConfirmAddressPopup(false);
    handleSubmit(submitData, orderStore.editingAdminOrder);
  };

  const handleSubmitMulti = async (values: any) => {
    orderStore.editingAdminOrder = values;
    if (stepNumber === 1) {
      const data = await authStore.getSetting(SETTING_TYPE.PRICING);
      if (data.enabled) {
        await handlePricing(values);
      }
    }
    if (isLastStep) {
      setSubmitData(values);
      if (values.pickupAddress) {
        for (let i = 0; i < values.dropOffFields.length; i++) {
          if (!values.dropOffFields[i].dropoffAddress) {
            setShowConfirmAddressPopup(true);
            return;
          }
        }
        handleSubmit(values, orderStore.editingAdminOrder);
      } else {
        setShowConfirmAddressPopup(true);
      }
    } else {
      await handleNext();
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
      const currentAddress = [...orderStore.editingAdminOrder.dropOffFields];
      currentAddress[index].dropoffAddressText = dataAddress?.locationAddress;
      currentAddress[index].dropoffAddress = dataAddress?.dropoffAddress;
      // setDropOffFields(currentAddress);
      orderStore.editingAdminOrder.dropOffFields = currentAddress;
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

  const handleChangePlace = (
    value: any,
    field: string,
    setFieldValue: any,
    isJson?: boolean
  ) => {
    if (field === 'pickupAddressText') {
      setFieldValue(field, value?.formatted_address, false);
    }
    handleLocalStorage(value, field);
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
  };

  const handleChangeDropOff = async (
    value: any,
    index: number,
    isJson?: boolean
  ) => {
    const data = [...orderStore.editingAdminOrder.dropOffFields];
    data[index].dropoffAddressText = value?.formatted_address || '';

    if (!isJson) {
      data[index].dropoffAddress = [
        value.geometry?.location?.lat(),
        value.geometry?.location?.lng(),
      ];
    }
    if (isJson) {
      data[index].dropoffAddress = [
        value.geometry?.location?.lat,
        value.geometry?.location?.lng,
      ];
    }
    orderStore.editingAdminOrder.dropOffFields = data;
  };

  const handleAddFields = () => {
    const values = [...orderStore.editingAdminOrder.dropOffFields];
    values.push({
      dropoffAddress: [],
      dropoffAddressText: '',
      dropoffTime: '',
      dropoffContact: '',
      dropoffContactNo: '',
    });
    orderStore.editingAdminOrder.dropOffFields = values;
  };

  const handleRemoveFields = (index: number) => {
    const values = [...orderStore.editingAdminOrder.dropOffFields];
    values.splice(index, 1);
    orderStore.editingAdminOrder.dropOffFields = values;
  };

  const [orderPhotos, setOrderPhotos] = React.useState<any>([]);

  const handleUploadPhotos = (event: any) => {
    const values = [...orderPhotos];
    values.push(event.target.files[0]);
    setOrderPhotos(values);
  };

  const handleRemovePhoto = async (index: number) => {
    const values = [...orderPhotos];
    await orderStore.deleteDocument(values[index].id);
    values.splice(index, 1);
    setOrderPhotos(values);
  };

  const handleChangeDynamic = (
    index: number,
    event: any,
    fieldName: string
  ) => {
    const values = [...orderStore.editingAdminOrder.dropOffFields];
    if (fieldName === 'dropoffAddressText') {
      values[index].dropoffAddressText = event.target.value;
    } else if (fieldName === 'dropoffContact') {
      values[index].dropoffContact = event.target.value;
    } else if (fieldName === 'dropoffContactNo') {
      values[index].dropoffContactNo = event.target.value;
    }
    orderStore.editingAdminOrder.dropOffFields = values;
    // setDropOffFields(values);
  };

  /*
   * action of delete button
   *
   * @param void
   * @return void
   */
  const handleDelete = () => {
    setShowConfirmPopup(true);
  };

  const handleCancel = () => {
    history.push(ADMIN_ORDER_ROUTERS.ADMIN_MANAGE);
  };

  const [options, setOptions] = React.useState<any[]>([]);

  const [selected, setSelected] = React.useState<any[]>([]);

  const getDynamicCharges = React.useCallback(async () => {
    const data = await orderStore.getDynamicCharges();
    let array: any[] = [];

    if (data.length > 0) {
      data.map((item: any) => {
        if (item.name !== null && item.name !== '') {
          array.push({ value: item.id, label: `${t(item.name)}` });
        }
      });
    }

    setOptions(array);
  }, [orderStore, t]);

  const setSelectedData = React.useCallback(async () => {
    if (orderStore.editingAdminOrder && options.length > 0) {
      let a: any[] = [];
      orderStore.editingAdminOrder.specialRequests.forEach((item: any) => {
        const data = options.find((data: any) => +data.value === +item)?.label;
        if (data) {
          a.push({
            value: +item,
            label: t(`${data}`),
          });
        }
      });
      setSelected(a);
    }
  }, [orderStore.editingAdminOrder, t]);

  const [priceEnabled, setPriceEnabled] = React.useState<boolean>(false);

  const getPriceOption = React.useCallback(async () => {
    const data = await authStore.getSetting(SETTING_TYPE.PRICING);
    setPriceEnabled(data.enabled);
  }, [authStore]);

  React.useEffect(() => {
    getDynamicCharges();
    setSelectedData();
    getPriceOption();
  }, [getDynamicCharges, getPriceOption, setSelectedData]);

  React.useEffect(() => {
    if (!orderStore.editingAdminOrder?.createdByAdminId) {
      customerStore.getAllFavoriteTruckOwnerByAdmin(orderID);
    }
  }, [customerStore]);

  React.useEffect(() => {
    orderStore.editingAdminOrder = null;
    orderStore.getOrderByIdByAdmin(orderID);
  }, [orderStore, criteriaDto, orderID]);

  React.useEffect(() => {
    if (orderStore.editingAdminOrder) {
      setQuotePrice(orderStore.editingAdminOrder.useQuotePrice);
      setSuggestedPrice(orderStore.editingAdminOrder.useSuggestedPrice);
      setShowPrice(orderStore.editingAdminOrder.price);
      onChange(orderStore.editingAdminOrder.pickupTime);
      if (
        orderStore.editingAdminOrder.serviceType === 'TRAILOR_TRACTOR_TRUCK'
      ) {
        setSchemaStep([schemaStepOneTrailor, schemaStepTwo, schemaStepThree]);
      } else {
        setTruckPayloadDefault(orderStore.editingAdminOrder.truckPayload);
        setTruckTypeDefault(orderStore.editingAdminOrder.truckType);
        setSchemaStep([schemaStepOne, schemaStepTwo, schemaStepThree]);
      }
      setShowVat(orderStore.editingAdminOrder.vat);
      setServiceType(orderStore.editingAdminOrder.serviceType);
      setOrderPhotos(orderStore.editingAdminOrder.metadata);
    }
  }, [orderStore, orderStore.editingAdminOrder, orderID]);

  return (
    <>
      <AdminWrapper
        pageTitle={t(ORDER_EDIT_TITLE)}
        pageSubTitle={t(ORDER_CREATE_TITLENOTE)}
      >
        <div className="form multi-step">
          {orderStore.editingAdminOrder &&
            Object.keys(orderStore.editingAdminOrder).length > 0 && (
              <React.Fragment>
                <Stepper
                  activeStep={stepNumber}
                  connector={<QontoConnector />}
                  className="steper-new-order"
                >
                  {steps.map((step, index) => (
                    <Step>
                      <StepLabel
                        onClick={async () => {
                          setStepNumber(index);
                        }}
                        StepIconComponent={ColorlibStepIcon}
                      ></StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <React.Fragment>
                  <Typography component="h4" variant="h4" align="center">
                    {t(stepTitle[stepNumber])}
                  </Typography>
                  {stepNumber === steps.length ? (
                    <>success</>
                  ) : (
                    <Formik
                      initialValues={orderStore.editingAdminOrder}
                      validationSchema={schemaStep[stepNumber]}
                      onSubmit={(values) => {
                        handleSubmitMulti(values);
                      }}
                      enableReinitialize
                    >
                      {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                        setFieldValue,
                      }) => (
                        <Form
                          noValidate
                          autoComplete="off"
                          className={`form-step-${stepNumber} multiple-step-form`}
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                          }}
                        >
                          {stepNumber === 0 && (
                            <StepOne
                              orderType={values.orderType}
                              handleChangeOrderType={handleChangeOrderType}
                              handleCloneAction={handleCloneAction}
                              initData={values}
                              mode={mode}
                              serviceType={serviceType}
                              handleChangeTransportation={
                                handleChangeTransportation
                              }
                              handleSubmit={handleSubmit}
                              handleDelete={handleDelete}
                              handleChange={handleChange}
                              errors={errors}
                              truckTypeDefault={truckTypeDefault}
                              handleChangeTruckType={handleChangeTruckType}
                              truckPayloadDefault={truckPayloadDefault}
                              handleChangeTruckPayload={
                                handleChangeTruckPayload
                              }
                              options={options}
                              selected={selected}
                              setSelected={setSelected}
                            />
                          )}
                          {stepNumber === 1 && orderPhotos && (
                            <StepTwo
                              values={values}
                              onChange={handleChange}
                              onChangeTime={onChange}
                              errors={errors}
                              handleChangePlace={handleChangePlace}
                              setFieldValue={setFieldValue}
                              pickupTime={pickupTime}
                              dropOffFields={values.dropOffFields}
                              handleChangeDynamic={handleChangeDynamic}
                              handleAddFields={handleAddFields}
                              handleRemoveFields={handleRemoveFields}
                              dropoffTime={dropoffTime}
                              onChangeDropoff={onChangeDropoff}
                              handleChangeDropOff={handleChangeDropOff}
                              handleChooseAddressBook={handleChooseAddressBook}
                              handleChooseRecent={handleChooseRecent}
                              handleUploadPhotos={handleUploadPhotos}
                              orderPhotos={orderPhotos}
                              handleRemovePhoto={handleRemovePhoto}
                              handleChangeDropOffTime={handleChangeDropOffTime}
                              handleClearData={handleClearData}
                            />
                          )}

                          {stepNumber === 2 && (
                            <StepThree
                              errors={errors}
                              initData={values}
                              handleChange={handleChange}
                              showPrice={showPrice}
                              setShowPrice={setShowPrice}
                              showVat={showVat}
                              setShowVat={setShowVat}
                              handleChangePaymentType={handleChangePaymentType}
                              paymentDefault={values.paymentType}
                              setSuggestedPrice={setSuggestedPrice}
                              suggestedPrice={suggestedPrice}
                              quotePrice={quotePrice}
                              setQuotePrice={setQuotePrice}
                              pricingEnable={priceEnabled}
                            />
                          )}
                          <div className="step-container">
                            <Button
                              className="cancel-btn"
                              onClick={handleCancel}
                            >
                              {t(BUTTONS_CANCEL)}
                            </Button>
                            {stepNumber !== 0 && (
                              <Button
                                className="previous-step-btn"
                                onClick={handleBack}
                              >
                                {t(BUTTONS_BACK_STEP)}
                              </Button>
                            )}
                            <Button
                              type="submit"
                              color="primary"
                              className="next-step-btn"
                            >
                              {isLastStep
                                ? `${t(BUTTONS_CONFIRM)}`
                                : `${t(BUTTONS_NEXT_STEP)}`}
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  )}
                  <ConfirmModal
                    show={showConfirmAddressPopup}
                    handleCancel={handleCancelAddress}
                    handleOk={handleOkAddress}
                  >
                    <p>{t(ADDRESS_NOT_VALID)}</p>
                  </ConfirmModal>
                </React.Fragment>
              </React.Fragment>
            )}
        </div>
      </AdminWrapper>
    </>
  );
};

export default observer(EditOrderAdminPage);
