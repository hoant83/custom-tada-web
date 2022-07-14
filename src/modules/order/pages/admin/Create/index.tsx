/* eslint-disable array-callback-return */
import ConfirmModal from '@/libs/components/ConfirmModal';
import { NUMBER_REGEXP, PHONE_REGEXP } from '@/libs/constants/rules.constants';
import { toTimePicker } from '@/libs/utils/time.util';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { SETTING_TYPE } from '@/modules/admin-user/admin.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import {
  ACTIONS_MODE,
  ORDER_TYPE,
  SERVICE_TYPE,
} from '@/modules/order/order.enum';
import { OrderStoreContext } from '@/modules/order/order.store';
import { ADMIN_ORDER_ROUTERS } from '@/modules/order/router.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import {
  CircularProgress,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Typography,
  withStyles,
} from '@material-ui/core';
import StepConnector from '@material-ui/core/StepConnector';
import { StepIconProps } from '@material-ui/core/StepIcon';
import clsx from 'clsx';
import { Formik } from 'formik';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  showMap?: boolean;
  data: any;
  orderType?: string;
  mode?: string;
}

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
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

const CreateOrderAdminPage = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const orderStore = React.useContext(OrderStoreContext);
  const history = useHistory();

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_CREATED_TITLE,
    ORDER_CREATE_TITLENOTE,
    VALIDATE_REQUIRED,
    VALIDATE_PHONE,
    VALIDATE_NUMBER,
    ORDER_TRUCK_STEP,
    ORDER_ADDRESS_STEP,
    ORDER_PAYMENT_STEP,
    BUTTONS_CONFIRM,
    BUTTONS_VERIFY_AND_CREATE,
    BUTTONS_BACK_STEP,
    BUTTONS_NEXT_STEP,
    ADDRESS_NOT_VALID,
  } = I18N;

  const stepTitle = [ORDER_TRUCK_STEP, ORDER_ADDRESS_STEP, ORDER_PAYMENT_STEP];

  /*
   * Init data for creating order
   */
  const [initData, setInitData] = React.useState<any>(
    orderStore.orderRequestByAdmin
  );

  /*
   * set mode to created
   */
  const [mode] = React.useState<ACTIONS_MODE>(ACTIONS_MODE.CREATE);

  /*
   * set order type
   */
  const [orderType, setOrderType] = React.useState<ORDER_TYPE>(
    ORDER_TYPE.STANDARD
  );

  /*
   * set type of transportation
   */
  const [serviceType, setServiceType] = React.useState<SERVICE_TYPE>(
    SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK
  );

  const [truckTypeDefault, setTruckTypeDefault] = React.useState<any>(-1);

  const [truckPayloadDefault, setTruckPayloadDefault] = React.useState<any>(-1);

  const [paymentDefault, setPaymentDefault] = React.useState<any>(-1);

  const [submitData, setSubmitData] = React.useState<any>({});

  /*
   * action of changing order type
   *
   * @param ORDER_TYPE value
   * @return void
   */
  const handleChangeOrderType = (value: ORDER_TYPE) => {
    setOrderType(value);
  };

  /*
   * action of type of transportation
   *
   * @param any event
   * @return void
   */
  const handleChangeTransportation = (event: any) => {
    if (event.target.value === 'NORMAL_TRUCK_VAN')
      setSchemaStep([schemaStepOne, schemaStepTwo, schemaStepThree]);
    if (event.target.value === 'TRAILOR_TRACTOR_TRUCK')
      setSchemaStep([schemaStepOneTrailor, schemaStepTwo, schemaStepThree]);
    if (event.target.value === 'NON_MOTORIZED_VEHICLE')
      setSchemaStep([schemaStepOneNonMoto, schemaStepTwo, schemaStepThree]);
    if (event.target.value === 'CONCATENATED_GOODS')
      setSchemaStep([
        schemaStepOneConcatenatedGoods,
        schemaStepTwo,
        schemaStepThree,
      ]);
    if (event.target.value === 'CONTRACT_CAR')
      setSchemaStep([schemaStepOneContractCar, schemaStepTwo, schemaStepThree]);
    setServiceType(event.target.value);
  };

  const handleChangeTruckPayload = (event: any) => {
    setTruckPayloadDefault(event.target.value);
  };

  const handleChangeTruckType = (event: any) => {
    setTruckTypeDefault(event.target.value);
  };

  const handleChangePaymentType = (event: any) => {
    setPaymentDefault(event.target.value);
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
    delete values.nonMotorizedType;
    delete values.nonMotorizedQuantity;
    delete values.concatenatedGoodsType;
    delete values.concatenatedGoodsQuantity;
    delete values.contractCarType;
    delete values.contractCarQuantity;
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

  const [dropOffFields, setDropOffFields] = React.useState(
    orderStore.dynamicDropoff
  );

  /*
   * show/hide Price option
   */
  const [showPrice, setShowPrice] = React.useState<boolean>(
    initData.price ?? false
  );

  const [suggestedPrice, setSuggestedPrice] = React.useState<boolean>(
    initData.useSuggestedPrice ?? false
  );

  const [quotePrice, setQuotePrice] = React.useState<boolean>(
    initData.useQuotePrice ?? false
  );

  /*
   * show/hide VAT option
   */
  const [showVat, setShowVat] = React.useState<boolean>(initData.vat ?? true);

  const [suggestedPriceValue, setSuggestedPriceValue] = React.useState<number>(
    0
  );

  const [pricingEnable, setPricingEnable] = React.useState<boolean>(false);

  /*
   * action of create button
   *
   * @param any values
   * @return void
   */

  const handlePricing = async (values: any, initValue: any) => {
    values.orderType = orderType;
    values.serviceType = serviceType;
    values.createdByCustomer = authStore.loggedUser?.id;
    values.ownerId = null;
    values.dropOffFields = dropOffFields;
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
    setInitData(values);
    setShowPrice(false);
    setQuotePrice(false);
    setSuggestedPrice(true);
  };

  const handleSubmit = async (values: any) => {
    values.vat = showVat;
    values.orderType = orderType;
    values.serviceType = serviceType;
    values.createdByCustomer = authStore.loggedUser?.id;
    values.ownerId = null;
    values.dropOffFields = dropOffFields;
    values.suggestedPrice = suggestedPriceValue;
    values.paymentType = +values.paymentType;
    values.useSuggestedPrice = suggestedPrice;
    values.price = showPrice;
    values.useQuotePrice = quotePrice;

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
    orderStore.cleanDataCloneOrder();
    orderStore.setOrderRequestByAdmin(data);
    const result = await orderStore.createOrderByAdmin();
    if (result) {
      orderPhotos.map(async (orderPhoto: any, index: any) => {
        await orderStore.uploadDocumentWhenCreated(
          orderPhoto,
          orderStore.selectedOrder.id
        );
      });
      const editUrl = ADMIN_ORDER_ROUTERS.ORDERDETAIL.replace(
        ':orderID',
        orderStore.selectedOrder.id
      );
      history.push(editUrl);
    }
  };
  /*
   * action of delete button
   *
   * @param void
   * @return void
   */
  const handleDelete = () => {};

  /*
   * action of delete button
   *
   * @param void
   * @return void
   */
  const handleCloneAction = async (value: string) => {
    const result = await orderStore.cloneOrder(value);
    setDropOffFields(result.dropOffFields);
    if (result.serviceType === 'NORMAL_TRUCK_VAN')
      setSchemaStep([schemaStepOne, schemaStepTwo, schemaStepThree]);
    if (result.serviceType === 'TRAILOR_TRACTOR_TRUCK')
      setSchemaStep([schemaStepOneTrailor, schemaStepTwo, schemaStepThree]);
    if (result.serviceType === 'NON_MOTORIZED_VEHICLE')
      setSchemaStep([schemaStepOneNonMoto, schemaStepTwo, schemaStepThree]);
    if (result.serviceType === 'CONCATENATED_GOODS')
      setSchemaStep([
        schemaStepOneConcatenatedGoods,
        schemaStepTwo,
        schemaStepThree,
      ]);
    if (result.serviceType === 'CONTRACT_CAR')
      setSchemaStep([schemaStepOneContractCar, schemaStepTwo, schemaStepThree]);
    setInitData(result);
    setOrderType(result.orderType);
    setServiceType(result.serviceType);
    onChange(new Date(toTimePicker(result.pickupTime)));
    orderStore.cleanDataCloneOrder();
  };

  const [stepNumber, setStepNumber] = React.useState<number>(0);
  const [copleted] = React.useState<any[]>([false, false]);
  const steps = [0, 1, 2];

  const isLastStep = stepNumber === steps.length - 1;

  const handleNext = () => {
    setStepNumber(stepNumber + 1);
  };

  const handleBack = () => {
    setStepNumber(stepNumber - 1);
  };

  const validate = copleted.every((i) => {
    return i === true;
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [showConfirmAddressPopup, setShowConfirmAddressPopup] = React.useState<
    boolean
  >(false);

  const handlePreNextStep = async (values: any) => {
    const data = await authStore.getSetting(SETTING_TYPE.PRICING);
    if (data.enabled) {
      setIsLoading(true);
      await handlePricing(values, initData);
      setIsLoading(false);
    }
    copleted[stepNumber] = true;
    await handleNext();
  };

  const handleSubmitMulti = async (values: any) => {
    console.log(
      '🚀 ~ file: index.tsx ~ line 553 ~ handleSubmitMulti ~ values',
      values
    );
    setInitData(values);
    if (stepNumber === 1) {
      handlePreNextStep(values);
    } else {
      copleted[stepNumber] = true;
      if (isLastStep) {
        setSubmitData(values);

        if (values.pickupAddress) {
          for (let i = 0; i < values.dropOffFields.length; i++) {
            if (!values.dropOffFields[i].dropoffAddress) {
              setShowConfirmAddressPopup(true);
              return;
            }
          }
          handleSubmit(values);
        } else {
          setShowConfirmAddressPopup(true);
        }
      } else {
        await handleNext();
      }
    }
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

  const handleOkAddress = () => {
    setShowConfirmAddressPopup(false);
    handleSubmit(submitData);
  };

  const handleCancelAddress = () => {
    setShowConfirmAddressPopup(false);
  };

  const [pickupTime, onChange] = React.useState(
    initData.pickupTime ? new Date(initData.pickupTime) : null
  );

  const [dropoffTime, onChangeDropoff] = React.useState(
    initData.dropOffFields ? new Date(initData.pickupTime) : null
  );

  const handleChangeDropOffTime = (value: any, index: number) => {
    const date = new Date(value);
    initData.dropOffFields[index].dropoffTime = date;
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
      currentAddress[index].dropoffContact = dataAddress?.inChargeName;
      currentAddress[index].dropoffContactNo = dataAddress?.inChargeNo;
      setDropOffFields(currentAddress);
      return true;
    }
    setFieldValue(field, dataAddress?.locationAddress, false);
    if (field === 'pickupAddressText') {
      setFieldValue('pickupAddress', dataAddress.pickupAddress, false);
      setFieldValue('pickupCity', dataAddress.pickupCity, false);
      setFieldValue('pickupContactNo', dataAddress?.inChargeNo, false);
      setFieldValue('pickupContact', dataAddress?.inChargeName, false);
    }
    if (field === 'dropoffAddressText') {
      setFieldValue('dropoffAddress', dataAddress.dropoffAddress, false);
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
    const pickupField = document.getElementById('pickupAddressText');
    if (pickupField) {
      pickupField.classList.remove('no-google');
    }
  };

  const handleChangeDropOff = async (
    value: any,
    index: number,
    isJson?: boolean
  ) => {
    const data = [...dropOffFields];
    data[index].dropoffAddressText = value?.formatted_address || '';
    handleLocalStorage(value, 'dropoffAddressText');
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
    const pickupField = document.getElementById(`dropoffAddressText-${index}`);
    if (pickupField) {
      pickupField.classList.remove('no-google');
    }
    initData.dropOffFields = data;
    setDropOffFields(data);
  };

  const handleAddFields = () => {
    const values = [...dropOffFields];
    values.push({
      dropoffAddress: [],
      dropoffAddressText: '',
      dropoffTime: '',
      dropoffContact: '',
      dropoffContactNo: '',
    });
    setDropOffFields(values);
    initData.dropOffFields = values;
  };

  const handleRemoveFields = (index: number) => {
    const values = [...dropOffFields];
    values.splice(index, 1);
    initData.dropOffFields = values;
    setInitData(initData);
    setDropOffFields(values);
  };

  const [orderPhotos, setOrderPhotos] = React.useState<any>([]);

  const handleUploadPhotos = (event: any) => {
    const values = [...orderPhotos];
    values.push(event.target.files[0]);
    setOrderPhotos(values);
  };

  const handleRemovePhoto = (index: number) => {
    const values = [...orderPhotos];
    values.splice(index, 1);
    setOrderPhotos(values);
  };

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
    initData.dropOffFields = values;
    setDropOffFields(values);
  };

  /*
   * Validation
   */
  const schemaStepOne = yup.object({
    status: yup.string().notRequired(),
    referenceNo: yup.string().notRequired(),
    truckType: yup.string().required(t(VALIDATE_REQUIRED)).nullable(),
    truckQuantity: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .required(t(VALIDATE_REQUIRED)),
    truckPayload: yup.string().required(t(VALIDATE_REQUIRED)).nullable(),
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

  const schemaStepOneNonMoto = yup.object({
    status: yup.string().notRequired(),
    referenceNo: yup.string().notRequired(),
    nonMotorizedType: yup.string().required(t(VALIDATE_REQUIRED)).nullable(),
    nonMotorizedQuantity: yup
      .string()
      .required(t(VALIDATE_REQUIRED))
      .nullable(),
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
    containerType: yup.string().required(t(VALIDATE_REQUIRED)),
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
    paymentType: yup.string().required(t(VALIDATE_REQUIRED)).nullable(),
    suggestedPrice: yup.string().notRequired(),
  });

  const [schemaStep, setSchemaStep] = React.useState<any[]>([]);

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

  const getPricingEnable = React.useCallback(async () => {
    const data = await authStore.getSetting(SETTING_TYPE.PRICING);
    setPricingEnable(data.enabled);
  }, [authStore]);

  React.useEffect(() => {
    getDynamicCharges();
    getPricingEnable();
  }, [getDynamicCharges, getPricingEnable]);

  React.useEffect(() => {
    if (orderStore.dataCloneOrder) {
      setOrderType(initData.orderType);
      setServiceType(initData.serviceType);
    }
    initData.dropOffFields = dropOffFields;
    setInitData(initData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderStore.dataCloneOrder]);

  return (
    <>
      <AdminWrapper
        pageTitle={t(ORDER_CREATED_TITLE)}
        pageSubTitle={t(ORDER_CREATE_TITLENOTE)}
      >
        <div className="form multi-step">
          <React.Fragment>
            <React.Fragment>
              <Formik
                initialValues={initData}
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
                    <Stepper
                      activeStep={stepNumber}
                      connector={<QontoConnector />}
                      className="steper-new-order"
                    >
                      {steps.map((step, index) => (
                        <Step key={index}>
                          <StepLabel
                            onClick={async () => {
                              setStepNumber(index);
                            }}
                            StepIconComponent={ColorlibStepIcon}
                          />
                        </Step>
                      ))}
                    </Stepper>
                    <Typography component="h4" variant="h4" align="center">
                      {t(stepTitle[stepNumber])}
                    </Typography>
                    {stepNumber === 0 && (
                      <StepOne
                        orderType={orderType}
                        handleChangeOrderType={handleChangeOrderType}
                        handleCloneAction={handleCloneAction}
                        initData={values}
                        mode={mode}
                        serviceType={serviceType}
                        handleChangeTransportation={handleChangeTransportation}
                        handleSubmit={handleSubmit}
                        handleDelete={handleDelete}
                        handleChange={handleChange}
                        errors={errors}
                        truckTypeDefault={truckTypeDefault}
                        handleChangeTruckType={handleChangeTruckType}
                        truckPayloadDefault={truckPayloadDefault}
                        handleChangeTruckPayload={handleChangeTruckPayload}
                        options={options}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    )}
                    {stepNumber === 1 && (
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
                        handleChangePaymentType={handleChangePaymentType}
                        paymentDefault={paymentDefault}
                        suggestedPrice={suggestedPrice}
                        setSuggestedPrice={setSuggestedPrice}
                        quotePrice={quotePrice}
                        setQuotePrice={setQuotePrice}
                        pricingEnable={pricingEnable}
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
                        disabled={isLastStep && !validate ? true : false}
                      >
                        {!isLoading &&
                          (isLastStep
                            ? `${t(
                                authStore.settings?.autoVerifyOrder
                                  ? BUTTONS_CONFIRM
                                  : BUTTONS_VERIFY_AND_CREATE
                              )}`
                            : `${t(BUTTONS_NEXT_STEP)}`)}
                        {isLoading && <CircularProgress size={20} />}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <ConfirmModal
                show={showConfirmAddressPopup}
                handleCancel={handleCancelAddress}
                handleOk={handleOkAddress}
              >
                <p>{t(ADDRESS_NOT_VALID)}</p>
              </ConfirmModal>
            </React.Fragment>
          </React.Fragment>
        </div>
      </AdminWrapper>
    </>
  );
};

export default observer(CreateOrderAdminPage);
