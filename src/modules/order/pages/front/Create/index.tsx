/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import ConfirmModal from '@/libs/components/ConfirmModal';
import { NUMBER_REGEXP, PHONE_REGEXP } from '@/libs/constants/rules.constants';
import { retrieveFromStorage } from '@/libs/utils/storage.util';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { SETTING_TYPE } from '@/modules/admin-user/admin.enum';
import { PAYMENT_TYPE } from '@/modules/customer/customer.enum';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { I18N } from '@/modules/lang/i18n.enum';
import MultipleOrder from '@/modules/order/components/MultipleOrder';
import QuickForm from '@/modules/order/components/QuickForm';
import SwitchOrder from '@/modules/order/components/SwichOrder';
import {
  ACTIONS_MODE,
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
import { Prompt } from 'react-router';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

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

const CreateOrderPage = () => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const customerStore = React.useContext(CustomerStoreContext);
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
    MESSAGES_REDIRECT_WARNING,
    BUTTONS_CONFIRM,
    BUTTONS_VERIFY_AND_CREATE,
    BUTTONS_BACK_STEP,
    BUTTONS_NEXT_STEP,
    ORDER_MIXED,
    ORDER_FORKLIFT,
    ADDRESS_NOT_VALID,
    MESSAGES_UPDATE_SUCCESS,
    MESSAGES_INCORRECT_IMPORT_DATA,
  } = I18N;

  const stepTitle = [ORDER_TRUCK_STEP, ORDER_ADDRESS_STEP, ORDER_PAYMENT_STEP];

  /*
   * Init data for creating order
   */
  const [initData, setInitData] = React.useState<any>({});

  /*
   * Init data for creating order
   */
  const [submitData, setSubmitData] = React.useState<any>({});

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

  const [pricingEnable, setPricingEnable] = React.useState<boolean>(false);

  const [useOtherPayment, setUseOtherPayment] = React.useState<boolean>(false);

  const [suggestedPriceValue, setSuggestedPriceValue] = React.useState<number>(
    0
  );

  const setPayment = (payment: PAYMENT_TYPE) => {
    if (+payment === PAYMENT_TYPE.OTHER) {
      setUseOtherPayment(true);
    } else {
      setUseOtherPayment(false);
    }
  };

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [isUpLoading, setIsUpLoading] = React.useState<boolean>(false);
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
    values.paymentType = +paymentDefault;
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
    let dropoffData = [...dropOffFields];

    for (let i = 0; i < dropoffData.length; i++) {
      if (!dropoffData[i].dropoffTime) {
        dropoffData[i].dropoffTime = '';
      }
    }
    values.vat = showVat;
    values.orderType = orderType;
    values.serviceType = serviceType;
    values.createdByCustomer = authStore.loggedUser?.id;
    values.ownerId = null;
    values.dropOffFields = dropoffData;
    values.suggestedPrice = suggestedPriceValue;
    values.useSuggestedPrice = suggestedPrice;
    values.price = showPrice;
    values.useQuotePrice = quotePrice;
    let array: any[] = [];
    selected.map((u) => {
      array.push(u.value);
    });
    values.specialRequests = array;
    values.paymentType = +values.paymentType;
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
    orderStore.setOrderRequestByCustomer(data);
    const result = await orderStore.createOrderByCustomer();
    if (result && data.orderType !== ORDER_TYPE.QUICK) {
      orderPhotos.map(async (orderPhoto: any, index: any) => {
        await orderStore.uploadDocumentWhenCreated(
          orderPhoto,
          orderStore.selectedOrder.id
        );
      });
      const editUrl = CUSTOMER_ORDER_ROUTERS.THANKYOU.replace(
        ':orderID',
        orderStore.selectedOrder.id
      );
      history.push(editUrl);
    }
    const editUrl = CUSTOMER_ORDER_ROUTERS.THANKYOU.replace(
      ':orderID',
      orderStore.selectedOrder.id
    );
    history.push(editUrl);
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
    await orderStore.cloneOrder(value);
    if (orderStore.dataCloneOrder) {
      setInitData(orderStore.dataCloneOrder);
      setQuotePrice(orderStore.dataCloneOrder.useQuotePrice);
      setSuggestedPrice(orderStore.dataCloneOrder.useSuggestedPrice);
      setShowPrice(orderStore.dataCloneOrder.price);
      onChange(orderStore.dataCloneOrder.pickupTime);
      if (orderStore.dataCloneOrder.serviceType === 'NORMAL_TRUCK_VAN') {
        setSchemaStep([schemaStepOne, schemaStepTwo, schemaStepThree]);
      }
      if (orderStore.dataCloneOrder.serviceType === 'TRAILOR_TRACTOR_TRUCK') {
        setSchemaStep([schemaStepOneTrailor, schemaStepTwo, schemaStepThree]);
      }
      setDropOffFields(orderStore.dataCloneOrder.dropOffFields);
      setShowVat(orderStore.dataCloneOrder.vat);
      setServiceType(orderStore.dataCloneOrder.serviceType);
      setOrderPhotos(orderStore.dataCloneOrder.metadata);
      setOrderType(orderStore.dataCloneOrder.orderType);
      setServiceType(orderStore.dataCloneOrder.serviceType);
    }
    setCopleted([true, true]);
    orderStore.cleanDataCloneOrder();
  };

  const setData = async (data: any) => {
    if (data) {
      if (data.typeOfTransport === 'NORMAL_TRUCK_VAN')
        setSchemaStep([schemaStepOne, schemaStepTwo, schemaStepThree]);
      if (data.typeOfTransport === 'TRAILOR_TRACTOR_TRUCK')
        setSchemaStep([schemaStepOneTrailor, schemaStepTwo, schemaStepThree]);
      setPaymentDefault(data.paymentType);
      setShowVat(data.needVATInvoice);
      setQuotePrice(data.useQuotePrice);
      setSuggestedPrice(data.useSuggestedPrice);
      setShowPrice(data.price);
      const values = [...dropOffFields];
      values[0].dropoffAddressText = data.dropoffAddressText;
      values[0].dropoffAddress = data.dropoffAddress;
      values[0].dropoffContact = data.personInChargeDropoff;
      values[0].dropoffContactNo = data.personInChargeDropoffNO;
      switch (data.typeOfTransport) {
        case SERVICE_TYPE.NORMAL_TRUCK_VAN:
          setInitData({
            truckType: data.truckType,
            truckPayload: data.truckPayload,
            pickupCity: data.pickupCity,
            inChargeName: data.orderManagerName,
            inChargeContactNo: data.orderManagerNo,
            pickupAddress: data.pickupAddress,
            pickupAddressText: data.pickupAddressText,
            personInChargePickup: data.personInChargePickup,
            pickupContactNo: data.personInChargePickupNO,
            personInChargeDropoff: data.personInChargeDropoff,
            dropoffContactNo: data.personInChargeDropoffNO,
            dropOffFields: dropOffFields,
            photos: [],
            paymentType: data.paymentType,
            needVATInvoice: data.needVATInvoice,
            email: data.email,
            companyName: data.companyName,
            bussinessLicenseNO: data.bussinessLicenseNO,
            address: data.address,
          });
          break;
        case SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK:
          setInitData({
            containerSize: data.containerSize,
            containerType: data.containerType,
            pickupCity: data.pickupCity,
            inChargeName: data.orderManagerName,
            inChargeContactNo: data.orderManagerNo,
            pickupAddress: data.pickupAddress,
            pickupAddressText: data.pickupAddressText,
            personInChargePickup: data.personInChargePickup,
            pickupContactNo: data.personInChargePickupNO,
            personInChargeDropoff: data.personInChargeDropoff,
            dropoffContactNo: data.personInChargeDropoffNO,
            dropOffFields: dropOffFields,
            photos: [],
            paymentType: data.paymentType,
            needVATInvoice: data.needVATInvoice,
            email: data.email,
            companyName: data.companyName,
            bussinessLicenseNO: data.bussinessLicenseNO,
            address: data.address,
          });
          break;
        case SERVICE_TYPE.NON_MOTORIZED:
          setInitData({
            nonMotorizedType: data.nonMotorizedType,
            orderManagerName: data.orderManagerName,
            orderManagerNo: data.orderManagerNo,
            pickupAddress: data.pickupAddress,
            pickupAddressText: data.pickupAddressText,
            personInChargePickup: data.personInChargePickup,
            pickupContactNo: data.personInChargePickupNO,
            personInChargeDropoff: data.personInChargeDropoff,
            dropoffContactNo: data.personInChargeDropoffNO,
            dropOffFields: dropOffFields,
            photos: [],
            paymentType: data.paymentType,
            needVATInvoice: data.needVATInvoice,
            email: data.email,
            companyName: data.companyName,
            bussinessLicenseNO: data.bussinessLicenseNO,
            address: data.address,
          });
          break;
        case SERVICE_TYPE.CONCATENATED_GOODS:
          setInitData({
            concatenatedGoodsType: data.concatenatedGoodsType,
            orderManagerName: data.orderManagerName,
            orderManagerNo: data.orderManagerNo,
            pickupAddress: data.pickupAddress,
            pickupAddressText: data.pickupAddressText,
            personInChargePickup: data.personInChargePickup,
            pickupContactNo: data.personInChargePickupNO,
            personInChargeDropoff: data.personInChargeDropoff,
            dropoffContactNo: data.personInChargeDropoffNO,
            dropOffFields: dropOffFields,
            photos: [],
            paymentType: data.paymentType,
            needVATInvoice: data.needVATInvoice,
            email: data.email,
            companyName: data.companyName,
            bussinessLicenseNO: data.bussinessLicenseNO,
            address: data.address,
          });
          break;
        case SERVICE_TYPE.CONTRACT_CAR:
          setInitData({
            contractCarType: data.contractCarType,
            orderManagerName: data.orderManagerName,
            orderManagerNo: data.orderManagerNo,
            pickupAddress: data.pickupAddress,
            pickupAddressText: data.pickupAddressText,
            personInChargePickup: data.personInChargePickup,
            pickupContactNo: data.personInChargePickupNO,
            personInChargeDropoff: data.personInChargeDropoff,
            dropoffContactNo: data.personInChargeDropoffNO,
            dropOffFields: dropOffFields,
            photos: [],
            paymentType: data.paymentType,
            needVATInvoice: data.needVATInvoice,
            email: data.email,
            companyName: data.companyName,
            bussinessLicenseNO: data.bussinessLicenseNO,
            address: data.address,
          });
          break;
        default:
          setSchemaStep([schemaStepOneTrailor, schemaStepTwo, schemaStepThree]);
          setInitData({
            orderManagerName: data.orderManagerName,
            orderManagerNo: data.orderManagerNo,
            pickupAddress: data.pickupAddress,
            pickupAddressText: data.pickupAddressText,
            personInChargePickup: data.personInChargePickup,
            pickupContactNo: data.personInChargePickupNO,
            personInChargeDropoff: data.personInChargeDropoff,
            dropoffContactNo: data.personInChargeDropoffNO,
            dropOffFields: dropOffFields,
            photos: [],
            paymentType: data.paymentType,
            needVATInvoice: data.needVATInvoice,
            email: data.email,
            companyName: data.companyName,
            bussinessLicenseNO: data.bussinessLicenseNO,
            address: data.address,
          });
      }
      setServiceType(
        data.typeOfTransport
          ? data.typeOfTransport
          : SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK
      );
    }
  };

  const getDefaultReference = React.useCallback(async () => {
    let data = null;
    const [result, payment] = await Promise.all([
      customerStore.getDefaultReference(),
      customerStore.getDefaultPayment(),
    ]);
    data = { ...result, ...payment };
    if (data) {
      setData(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropOffFields]);

  const [stepNumber, setStepNumber] = React.useState<number>(0);
  const [copleted, setCopleted] = React.useState<any[]>([false, false]);
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

  const handleSubmitQuick = async (values: any) => {
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
  };

  const handleSubmitMulti = async (values: any) => {
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

  const handleRemoveFields = (index: number, setFieldValues: any) => {
    const values = [...dropOffFields];
    values.splice(index, 1);
    initData.dropOffFields = values;
    setFieldValues('dropOffFields', values, false);
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
    pickupTime: yup.string().required(t(VALIDATE_REQUIRED)),
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
    otherPaymentType: useOtherPayment
      ? yup.string().required(t(VALIDATE_REQUIRED))
      : yup.string().notRequired(),
    suggestedPrice: yup.string().notRequired(),
  });

  const [schemaStep, setSchemaStep] = React.useState<any[]>([]);

  const [options, setOptions] = React.useState<any[]>([]);

  const [selected, setSelected] = React.useState<any[]>([]);

  const getDynamicCharges = React.useCallback(async () => {
    const data = await orderStore.getDynamicCharges();
    let array: any[] = [];
    if (data?.length > 0) {
      data.map((item: any) => {
        if (item.name !== null && item.name !== '') {
          array.push({
            value: item.id,
            label:
              item.name === 'Allow mixed loading'
                ? `${t(ORDER_MIXED)}`
                : item.name === 'Require forklift driver'
                ? `${t(ORDER_FORKLIFT)}`
                : `${t(item.name)}`,
          });
        }
      });
    }

    setOptions(array);
  }, [orderStore, t]);

  React.useEffect(() => {
    getDynamicCharges();
    getDefaultReference();
  }, [getDynamicCharges]);

  React.useEffect(() => {
    getDefaultReference();
  }, []);

  const getPricingEnable = React.useCallback(async () => {
    const data = await authStore.getSetting(SETTING_TYPE.PRICING);
    setPricingEnable(data.enabled);
  }, [authStore]);

  React.useEffect(() => {
    if (orderStore.dataCloneOrder) {
      setOrderType(initData.orderType);
      setServiceType(initData.serviceType);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDefaultReference, orderStore.dataCloneOrder]);

  React.useEffect(() => {
    getPricingEnable();
  }, [getPricingEnable]);

  const [shouldBlockNavigation, setShouldBlockNavigation] = React.useState<
    boolean
  >(false);

  const [showConfirmPopup, setShowConfirmPopup] = React.useState<boolean>(
    false
  );

  const [showConfirmAddressPopup, setShowConfirmAddressPopup] = React.useState<
    boolean
  >(false);

  const handleShow = async () => {
    setShowConfirmPopup(true);
  };

  React.useEffect(() => {
    if (stepNumber === 1 || stepNumber === 2) {
      setShouldBlockNavigation(true);
    } else {
      setShouldBlockNavigation(false);
    }
  }, [history, stepNumber]);

  const [confirmedNavigation, setConfirmedNavigation] = React.useState<boolean>(
    false
  );

  const [showMultipleOrder, setShowMultipleOrder] = React.useState<boolean>(
    false
  );

  const [lastLocation, setLastLocation] = React.useState<Location | null>(null);

  const handleBlockNavigation = (nextLocation: any): boolean => {
    if (!confirmedNavigation) {
      handleShow();
      setLastLocation(nextLocation);
      return false;
    }
    return true;
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
    return false;
  };

  const handleOkAddress = () => {
    setShowConfirmAddressPopup(false);
    handleSubmit(submitData);
  };

  const handleCancelAddress = () => {
    setShowConfirmAddressPopup(false);
  };

  const handleOk = () => {
    setShowConfirmPopup(false);
    setConfirmedNavigation(true);
  };

  const [dragFile, setDragFile] = React.useState({
    file: null,
  });

  const handleOpenMultipleOrder = () => {
    setShowMultipleOrder(true);
  };

  const handleCloseMultipleOrder = () => {
    setShowMultipleOrder(false);
  };

  const handleDragFile = (acceptedFile: any) => {
    setDragFile({ file: acceptedFile });
  };

  const handleUploadMultipleOrders = async () => {
    setIsUpLoading(true);
    try {
      const result = await orderStore.uploadxlsx(dragFile.file);
      if (result) {
        toast.dismiss();
        toast.success(t(MESSAGES_UPDATE_SUCCESS));
      }
    } catch (e) {
      toast.dismiss();
      toast.error(t(MESSAGES_INCORRECT_IMPORT_DATA));
      setIsUpLoading(false);
    }
    setIsUpLoading(false);
    setDragFile({ file: null });
    handleCloseMultipleOrder();
  };

  const handleDownloadTemplate = () => {
    const lang =
      retrieveFromStorage('lang') ?? process.env.REACT_APP_DEFAULT_LANG;
    window.location.href = `/${lang}_TADA%20Truck%20-%20Import%20orders%20template.xlsx`;
  };

  React.useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      history.push(lastLocation.pathname);
    }
  }, [confirmedNavigation, history, lastLocation]);

  React.useEffect(() => {
    customerStore.getAllFavoriteTruckOwner();
  }, [customerStore]);

  return (
    <>
      <WrapperTheme
        pageTitle={t(ORDER_CREATED_TITLE)}
        pageSubTitle={t(ORDER_CREATE_TITLENOTE)}
      >
        <Prompt
          when={shouldBlockNavigation}
          message={(location) => {
            return handleBlockNavigation(location);
          }}
        />
        <ConfirmModal
          show={showConfirmPopup}
          handleCancel={handleCancel}
          handleOk={handleOk}
        >
          <p>{t(MESSAGES_REDIRECT_WARNING)}</p>
        </ConfirmModal>
        <SwitchOrder
          orderType={orderType}
          handleOrderType={handleChangeOrderType}
          handleCloneAction={handleCloneAction}
          handleOpenMultipleOrder={handleOpenMultipleOrder}
        />
        <MultipleOrder
          show={showMultipleOrder}
          handleClose={handleCloseMultipleOrder}
          dragFile={dragFile}
          handleDragFile={handleDragFile}
          handleUploadMultipleOrders={handleUploadMultipleOrders}
          isUpLoading={isUpLoading}
          handleDownloadTemplate={handleDownloadTemplate}
        />
        <div className="form multi-step">
          {authStore.loggedUser && orderType === ORDER_TYPE.QUICK && (
            <>
              <QuickForm
                initialValues={initData}
                mode={mode}
                serviceType={serviceType}
                handleServiceType={handleChangeTransportation}
                handleSubmitForm={handleSubmitQuick}
                handleChangeDynamic={handleChangeDynamic}
                handleChangeDropOff={handleChangeDropOff}
                dropOffFields={dropOffFields}
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
          {authStore.loggedUser && orderType === ORDER_TYPE.STANDARD && (
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
                                if (index === 2) {
                                  handlePricing(values, initData);
                                }
                              }}
                              StepIconComponent={ColorlibStepIcon}
                            />
                          </Step>
                        ))}
                      </Stepper>
                      <Typography component="h4" variant="h4" align="center">
                        {t(stepTitle[stepNumber])}
                      </Typography>
                      {stepNumber === 0 &&
                        initData &&
                        Object.keys(initData).length > 0 && (
                          <StepOne
                            orderType={orderType}
                            handleChangeOrderType={handleChangeOrderType}
                            handleCloneAction={handleCloneAction}
                            initData={initData}
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
                            handleChangeTruckPayload={handleChangeTruckPayload}
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
                          suggestedPrice={suggestedPrice}
                          setSuggestedPrice={setSuggestedPrice}
                          quotePrice={quotePrice}
                          setQuotePrice={setQuotePrice}
                          pricingEnable={pricingEnable}
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
                          color="primary"
                          className="next-step-btn"
                          disabled={
                            (isLastStep && !validate) ||
                            +authStore.loggedUser.limitOrder <= 0
                              ? true
                              : false
                          }
                          onClick={() => {
                            isLastStep
                              ? setShouldBlockNavigation(false)
                              : setShouldBlockNavigation(true);
                            handleSubmit();
                          }}
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
          )}
        </div>
      </WrapperTheme>
    </>
  );
};

export default observer(CreateOrderPage);
