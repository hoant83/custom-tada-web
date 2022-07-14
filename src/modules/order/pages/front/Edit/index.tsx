/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import ConfirmModal from '@/libs/components/ConfirmModal';
import { NUMBER_REGEXP, PHONE_REGEXP } from '@/libs/constants/rules.constants';
import { isValidDate } from '@/libs/utils/time.util';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { SETTING_TYPE } from '@/modules/admin-user/admin.enum';
import { PAYMENT_TYPE } from '@/modules/customer/customer.enum';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { I18N } from '@/modules/lang/i18n.enum';
import QuickForm from '@/modules/order/components/QuickForm';
import SwitchOrder from '@/modules/order/components/SwichOrder';
import { OrderListDto } from '@/modules/order/order.dto';
import {
  ACTIONS_MODE,
  ORDER_STATUS,
  ORDER_TYPE,
  SERVICE_TYPE,
} from '@/modules/order/order.enum';
import { OrderStoreContext } from '@/modules/order/order.store';
import { CUSTOMER_ORDER_ROUTERS } from '@/modules/order/router.enum';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import {
  CircularProgress,
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
import { toast } from 'react-toastify';
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
      backgroundImage: 'linear-gradient(90deg, #fab91a 0%, #ffd424 100%)',
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
    backgroundImage: 'linear-gradient(90deg, #fab91a 0%, #ffd424 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active } = props;
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {props.icon}
    </div>
  );
}

const EditOrderPage = () => {
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
    MESSAGES_DELETE_SUCCESS,
    VALIDATE_REQUIRED,
    VALIDATE_PHONE,
    VALIDATE_NUMBER,
    ORDER_TRUCK_STEP,
    ORDER_ADDRESS_STEP,
    ORDER_PAYMENT_STEP,
    MESSAGES_CONFIRM_DELETE,
    BUTTONS_CONFIRM,
    BUTTONS_BACK_STEP,
    BUTTONS_NEXT_STEP,
    ADDRESS_NOT_VALID,
  } = I18N;

  const stepTitle = [ORDER_TRUCK_STEP, ORDER_ADDRESS_STEP, ORDER_PAYMENT_STEP];

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
    orderStore.editingOrder?.serviceType ?? SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  /*
   * action of changing order type
   *
   * @param ORDER_TYPE value
   * @return void
   */
  const handleChangeOrderType = (value: ORDER_TYPE) => {};

  /*
   * action of type of transportation
   *
   * @param any event
   * @return void
   */
  const handleChangeTransportation = (event: any) => {
    if (orderStore.editingOrder.status === ORDER_STATUS.CREATED) {
      orderStore.editingOrder.serviceType = event.target.value;
    }
    setServiceType(event.target.value);
  };

  const deleteInitValuesInQuickOrder = async (values: any) => {
    delete values.containerSize;
    delete values.containerQuantity;
    delete values.containerType;
    delete values.dropoffEmptyAddress;
    delete values.dropoffEmptyContainer;
    delete values.pickupEmptyAddress;
    delete values.pickupEmptyContainer;
    delete values.truckPayLoad;
    delete values.truckQuantity;
    delete values.truckSpecialType;
    delete values.cargoName;
    delete values.cargoType;
    delete values.pickupContactNo;
    delete values.dropoffContactNo;
    delete values.address;
    delete values.paymentType;
    delete values.companyName;
    delete values.bussinessLicenseNO;
    for (let i = 0; i < values.dropOffFields.length; i++) {
      values.dropOffFields[i].dropoffContact = null;
      values.dropOffFields[i].dropoffContactNo = null;
    }
    values.vat = false;
    return values;
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

  const [submitData, setSubmitData] = React.useState<any>({});

  const [, setSuggestedPriceValue] = React.useState<number>(0);

  const [showConfirmAddressPopup, setShowConfirmAddressPopup] = React.useState<
    boolean
  >(false);

  const handleCancelAddress = () => {
    setShowConfirmAddressPopup(false);
  };

  const handleOkAddress = () => {
    setShowConfirmAddressPopup(false);
    handleSubmit(submitData, orderStore.editingOrder);
  };

  const handlePricing = async (values: any, initValue: any) => {
    values.serviceType = serviceType;
    let array: any[] = [];
    selected.map((u) => {
      array.push(u.value);
    });
    values.specialRequests = array;
    let data = values;
    if (values.orderType === ORDER_TYPE.QUICK) {
      data = await deleteInitValuesInQuickOrder(values);
    } else {
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
    }
    orderStore.setOrderRequestDto(data);
    const result = await orderStore.getPricing();
    values.suggestedPrice = result;
    setSuggestedPriceValue(result);
  };
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
    if (
      orderStore.editingOrder &&
      orderStore.editingOrder.orderType !== ORDER_TYPE.QUICK
    ) {
      values.paymentType = +values.paymentType;
    } else {
      values.paymentType = PAYMENT_TYPE.INSTANT_CASH;
    }
    values.paymentType = +values.paymentType;

    values.useSuggestedPrice = suggestedPrice;
    values.price = showPrice;
    values.useQuotePrice = quotePrice;
    values.dropOffFields = dropoffData;
    if (!suggestedPrice) {
      values.suggestedPrice = null;
    }
    if (!showPrice) {
      values.priceRequest = null;
    }

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
      delete values.truckLoad;
      delete values.truckQuantity;
      delete values.truckSpecialType;
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
      delete values.truckLoad;
      delete values.truckQuantity;
      delete values.truckSpecialType;
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
      delete values.truckLoad;
      delete values.truckQuantity;
      delete values.truckSpecialType;
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
    const result = await orderStore.updateOrder(values, orderID);
    if (result) {
      if (
        orderStore.editingOrder &&
        orderStore.editingOrder.orderType !== ORDER_TYPE.QUICK
      ) {
        orderPhotos.map(async (orderPhoto: any, index: any) => {
          if (orderPhoto.size) {
            await orderStore.uploadDocument(orderPhoto, orderID);
          }
        });
      }
      history.push(CUSTOMER_ORDER_ROUTERS.MANAGE);
    }
  };

  /*
   * show hide new/edit driver popup
   */
  const [showConfirmPopup, setShowConfirmPopup] = React.useState<boolean>(
    false
  );

  /*
   * action of delete button
   *
   * @param void
   * @return void
   */
  const handleDelete = () => {
    setShowConfirmPopup(true);
  };

  const handleOk = async () => {
    setShowConfirmPopup(false);
    if (orderID) {
      const result = await orderStore.adminDeleteOrder(orderID);
      if (result) {
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
        history.push(CUSTOMER_ORDER_ROUTERS.MANAGE);
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  const [showVat, setShowVat] = React.useState<boolean>(
    orderStore.editingOrder?.vat ? orderStore.editingOrder?.vat : false
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

  const [useOtherPayment, setUseOtherPayment] = React.useState<boolean>(false);

  const setPayment = (payment: PAYMENT_TYPE) => {
    if (+payment === PAYMENT_TYPE.OTHER) {
      setUseOtherPayment(true);
    } else {
      setUseOtherPayment(false);
    }
  };

  const handleChangeTruckPayload = (event: any) => {
    setTruckPayloadDefault(event.target.value);
  };

  const handleChangeTruckType = (event: any) => {
    setTruckTypeDefault(event.target.value);
  };

  /*
   * action of delete button
   *
   * @param void
   * @return void
   */
  const handleCloneAction = (value: string) => {};

  const schemaStepOne = yup.object({
    status: yup.string().notRequired(),
    referenceNo: yup.string().notRequired(),
    truckType: yup.string().required(t(VALIDATE_REQUIRED)),
    truckQuantity: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .required(t(VALIDATE_REQUIRED)),
    truckPayload: yup.string().required(),
    cargoType: yup.string().required(t(VALIDATE_REQUIRED)),
    cargoName: yup.string().required(t(VALIDATE_REQUIRED)),
    cargoWeight: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired(),
    packageSize: yup.string().notRequired(),
    referenceNote: yup.string().notRequired(),
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
    referenceNo: yup.string().notRequired(),
    containerSize: yup.string().required(t(VALIDATE_REQUIRED)),
    containerQuantity: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .required(t(VALIDATE_REQUIRED)),
    containerType: yup.string().required(),
    cargoType: yup.string().required(t(VALIDATE_REQUIRED)),
    cargoName: yup.string().required(t(VALIDATE_REQUIRED)),
    cargoWeight: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired(),
    packageSize: yup.string().notRequired(),
    referenceNote: yup.string().notRequired(),
  });

  const schemaStepTwo = yup.object().shape({
    pickupAddressText: yup.string().required(t(VALIDATE_REQUIRED)),
    pickupContactNo: yup
      .string()
      .matches(PHONE_REGEXP, t(VALIDATE_PHONE))
      .required(t(VALIDATE_REQUIRED)),
    pickupTime: yup.string().notRequired(),
    dropOffFields: yup.array().of(
      yup.object().shape({
        dropoffContact: yup.string().notRequired(),
        dropoffTime: yup.string().notRequired(),
        dropoffAddressText: yup.string().required(t(VALIDATE_REQUIRED)),
        dropoffContactNo: yup
          .string()
          .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
          .required(t(VALIDATE_REQUIRED)),
      })
    ),
  });

  const schemaStepThree = yup.object({
    TADAPrice: yup.string().notRequired(),
    ownPrice: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired(),
    email: yup.string().notRequired(),
    bussinessLicenseNO: yup.string().notRequired(),
    address: yup.string().notRequired(),
    companyName: yup.string().notRequired(),
    vat: yup.boolean().notRequired(),
    vatInfo: yup.string().notRequired(),
    inChargeName: yup.string().notRequired(),
    inChargeContactNo: yup
      .string()
      .matches(PHONE_REGEXP, t(VALIDATE_PHONE))
      .notRequired(),
    otherGeneralNotes: yup.string().notRequired(),
    paymentType: yup.string().required(t(VALIDATE_REQUIRED)),
    suggestedPrice: yup.string().notRequired(),
  });
  const [schemaStep, setSchemaStep] = React.useState([
    serviceType === SERVICE_TYPE.NORMAL_TRUCK_VAN
      ? schemaStepOne
      : serviceType === SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK
      ? schemaStepOneTrailor
      : schemaStepOneNonMoto
      ? schemaStepOneNonMoto
      : schemaStepOneTrailor
      ? schemaStepOneTrailor
      : schemaStepOneConcatenatedGoods
      ? schemaStepOneConcatenatedGoods
      : schemaStepOneContractCar,
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

  const handleSubmitMulti = async (values: any) => {
    orderStore.editingOrder = values;
    if (stepNumber === 1) {
      const data = await authStore.getSetting(SETTING_TYPE.PRICING);
      if (data.enabled) {
        setIsLoading(true);
        await handlePricing(values, orderStore.editingOrder);
        setIsLoading(false);
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
        handleSubmit(values, orderStore.editingOrder);
      } else {
        setShowConfirmAddressPopup(true);
      }
    } else {
      await handleNext();
    }
  };

  const [pickupTime, onChange] = React.useState(null);

  const [dropoffTime, onChangeDropoff] = React.useState(null);

  const handleChangeDropOffTime = (value: any, index: number) => {
    const date = new Date(value);
    orderStore.editingOrder.dropOffFields[index].dropoffTime = date;
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
      // setDropOffFields(currentAddress);
      orderStore.editingOrder.dropOffFields = currentAddress;
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
    const data = [...dropOffFields];
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
    orderStore.editingOrder.dropOffFields = data;
    setDropOffFields(data);
  };

  const handleAddFields = (setFieldValues: any) => {
    const values = [...dropOffFields];
    values.push({
      dropoffAddress: [],
      dropoffAddressText: '',
      dropoffTime: '',
      dropoffContact: '',
      dropoffContactNo: '',
    });
    setFieldValues('dropOffFields', values, false);
    orderStore.editingOrder.dropOffFields = values;
    setDropOffFields(values);
  };

  const handleRemoveFields = (index: number, setFieldValues: any) => {
    const values = [...dropOffFields];
    values.splice(index, 1);
    setFieldValues('dropOffFields', values, false);
    orderStore.editingOrder.dropOffFields = values;
    setDropOffFields(values);
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

  const [dropOffFields, setDropOffFields] = React.useState(
    orderStore.dynamicDropoff
  );

  const handleChangeDynamic = (
    index: number,
    event: any,
    fieldName: string
  ) => {
    const values = [...dropOffFields];

    if (fieldName === 'dropoffAddressText') {
      values[index].dropoffAddressText = event.target.value;
    } else if (fieldName === 'dropoffContact') {
      values[index].dropoffContact = event.target.value;
    } else if (fieldName === 'dropoffContactNo') {
      values[index].dropoffContactNo = event.target.value;
    }
    orderStore.editingOrder.dropOffFields = values;
    setDropOffFields(values);
  };

  const [options, setOptions] = React.useState<any[]>([]);

  const [selected, setSelected] = React.useState<any[]>([]);

  React.useEffect(() => {
    orderStore.editingOrder = null;
    orderStore.getOrderByIdByCustomer(orderID);
  }, [orderStore, criteriaDto, orderID]);

  React.useEffect(() => {
    if (orderStore.editingOrder) {
      setQuotePrice(orderStore.editingOrder.useQuotePrice);
      setSuggestedPrice(orderStore.editingOrder.useSuggestedPrice);
      setShowPrice(orderStore.editingOrder.price);
      onChange(orderStore.editingOrder.pickupTime);
      setPayment(orderStore.editingOrder.paymentType);
      if (
        orderStore.editingOrder.serviceType === SERVICE_TYPE.NORMAL_TRUCK_VAN
      ) {
        setTruckPayloadDefault(orderStore.editingOrder.truckPayload);
        setTruckTypeDefault(orderStore.editingOrder.truckType);
        setSchemaStep([schemaStepOne, schemaStepTwo, schemaStepThree]);
      }
      if (
        orderStore.editingOrder.serviceType ===
        SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK
      )
        setSchemaStep([schemaStepOneTrailor, schemaStepTwo, schemaStepThree]);
      if (orderStore.editingOrder.serviceType === SERVICE_TYPE.NON_MOTORIZED)
        setSchemaStep([schemaStepOneNonMoto, schemaStepTwo, schemaStepThree]);
      if (
        orderStore.editingOrder.serviceType === SERVICE_TYPE.CONCATENATED_GOODS
      )
        setSchemaStep([
          schemaStepOneConcatenatedGoods,
          schemaStepTwo,
          schemaStepThree,
        ]);
      if (orderStore.editingOrder.serviceType === SERVICE_TYPE.CONTRACT_CAR)
        setSchemaStep([
          schemaStepOneContractCar,
          schemaStepTwo,
          schemaStepThree,
        ]);

      setDropOffFields(orderStore.editingOrder.dropOffFields);
      setShowVat(orderStore.editingOrder.vat);
      setServiceType(orderStore.editingOrder.serviceType);
      setOrderPhotos(orderStore.editingOrder.metadata);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderStore, orderStore.editingOrder, orderID]);

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
    if (
      orderStore.editingOrder &&
      orderStore.editingOrder.orderType !== ORDER_TYPE.QUICK
    ) {
      if (orderStore.editingOrder && options.length > 0) {
        let a: any[] = [];
        orderStore.editingOrder.specialRequests.forEach((item: any) => {
          const data = options.find((data: any) => +data.value === +item)
            ?.label;
          if (data) {
            a.push({
              value: +item,
              label: t(`${data}`),
            });
          }
        });
        setSelected(a);
      }
    }
  }, [orderStore.editingOrder, t]);

  const [priceEnabled, setPriceEnabled] = React.useState<boolean>(false);

  const getPriceOption = React.useCallback(async () => {
    const data = await authStore.getSetting(SETTING_TYPE.PRICING);
    setPriceEnabled(data.enabled);
  }, [authStore]);

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
      const dropoffField = dropOffFields;
      dropoffField[index].dropoffAddress = null;
      const pickupField = document.getElementById(
        `dropoffAddressText-${index}`
      );
      if (pickupField) {
        pickupField.classList.add('no-google');
      }
    }
  };

  const handleSubmitQuick = async (values: any) => {
    setSubmitData(values);
    if (values.pickupAddress) {
      for (let i = 0; i < values.dropOffFields.length; i++) {
        if (!values.dropOffFields[i].dropoffAddress) {
          setShowConfirmAddressPopup(true);
          return;
        }
      }
      handleSubmit(values, orderStore.editingOrder);
    } else {
      setShowConfirmAddressPopup(true);
    }
  };

  React.useEffect(() => {
    getPriceOption();
  }, [stepNumber]);

  React.useEffect(() => {
    customerStore.getAllFavoriteTruckOwner();
  }, [customerStore]);

  React.useEffect(() => {
    getDynamicCharges();
    setSelectedData();
  }, [getDynamicCharges, setSelectedData]);

  return (
    <>
      <WrapperTheme
        pageTitle={t(ORDER_EDIT_TITLE)}
        pageSubTitle={t(ORDER_CREATE_TITLENOTE)}
      >
        <ConfirmModal
          show={showConfirmPopup}
          handleCancel={handleCancel}
          handleOk={handleOk}
        >
          <p>{t(MESSAGES_CONFIRM_DELETE)}</p>
        </ConfirmModal>
        {orderStore.editingOrder && (
          <SwitchOrder
            orderType={orderStore.editingOrder.orderType}
            handleOrderType={handleChangeOrderType}
            handleCloneAction={handleCloneAction}
            mode="edit"
          />
        )}
        <div className="form multi-step">
          {orderStore.editingOrder &&
            orderStore.editingOrder.serviceType &&
            orderStore.editingOrder.orderType === ORDER_TYPE.QUICK && (
              <>
                <QuickForm
                  initialValues={orderStore.editingOrder}
                  mode={mode}
                  serviceType={serviceType}
                  handleServiceType={handleChangeTransportation}
                  handleSubmitForm={handleSubmitQuick}
                  handleChangeDynamic={handleChangeDynamic}
                  handleChangeDropOff={handleChangeDropOff}
                  dropOffFields={orderStore.editingOrder.dropOffFields}
                  handleClearData={handleClearData}
                />

                <ConfirmModal
                  show={showConfirmAddressPopup}
                  handleCancel={handleCancelAddress}
                  handleOk={handleOkAddress}
                >
                  <p>{t(ADDRESS_NOT_VALID)}</p>
                </ConfirmModal>
              </>
            )}
          {orderStore.editingOrder &&
            orderStore.editingOrder.orderType === ORDER_TYPE.STANDARD && (
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
                      initialValues={orderStore.editingOrder}
                      validationSchema={schemaStep[stepNumber]}
                      onSubmit={(values) => {
                        handleSubmitMulti(values);
                      }}
                      enableReinitialize
                    >
                      {({
                        isSubmitting,
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                        setFieldValue,
                      }) => (
                        <Form
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
                              values={values}
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
                              dropOffFields={dropOffFields}
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
                              setSuggestedPrice={setSuggestedPrice}
                              suggestedPrice={suggestedPrice}
                              quotePrice={quotePrice}
                              setQuotePrice={setQuotePrice}
                              pricingEnable={priceEnabled}
                              setPayment={setPayment}
                              useOtherPayment={useOtherPayment}
                              setFieldValue={setFieldValue}
                            />
                          )}
                          <div className="step-container">
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
                              {!isLoading &&
                                (isLastStep
                                  ? `${t(BUTTONS_CONFIRM)}`
                                  : `${t(BUTTONS_NEXT_STEP)}`)}
                              {isLoading && <CircularProgress size={20} />}
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
      </WrapperTheme>
    </>
  );
};

export default observer(EditOrderPage);
