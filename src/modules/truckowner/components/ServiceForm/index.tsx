/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';

import {
  getTruckownerConcatenatedGoods,
  getTruckownerContainerSize,
  getTruckownerNonMotoried,
  getTruckownerContractCar,
  getTruckownerPayload,
  SERVICE_TYPE,
  truckNonMotorizedType,
} from '@/modules/truckowner/truckowner.enum';

import { Form, Row, Col, Container } from 'react-bootstrap';
import MultiSelect from 'react-multi-select-component';
import {
  truckownerContainerSize,
  truckownerPayload,
} from '@/modules/truckowner/truckowner.enum';
import {
  concatenatedGoodsType,
  contractCarType,
} from '@/modules/truck/truck.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  initialValues?: any;
  handleSubmitForm?: any;
  handleChangeServiceType?: any;
  handleChangePickupZone?: any;
  handleChangeContainerSize?: any;
  handleChangePayload?: any;
  title?: string;
  selectedValues?: any;
  selectedContainerSizeValues?: any;
  selectedPayloadValues?: any;
  handleChangeNonMotorizedType?: any;
  handleChangeConcatenatedGoodsType?: any;
  handleChangeContractCarType?: any;
}

const TruckOwnerAccountForm = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    initialValues,
    handleChangeServiceType,
    handleChangePickupZone,
    handleChangeContainerSize,
    handleChangePayload,
    title,
    selectedValues,
    handleChangeNonMotorizedType,
    handleChangeConcatenatedGoodsType,
    handleChangeContractCarType,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    TRUCKOWNER_TRUCKSERVICE_LABEL,
    TRUCKOWNER_TRUCKSERVICE_ALL,
    TRUCKOWNER_TRUCKSERVICE_TRAILORTRACTOR,
    TRUCKOWNER_TRUCKSERVICE_NORMAL,
    TRUCKOWNER_PICKUPZONE_LABEL,
    ACCOUNT_SELECT_ALL,
    ACCOUNT_SELECT,
    TRUCKOWNER_CONTAINERSIZE_LABEL,
    TRUCKOWNER_TRUCKPAYLOAD_LABEL,
    TRUCKOWNER_TRUCKSERVICE_NON_MOTORIZED,
    ORDER_NON_MOTORIZED_TYPE,
    TRUCKOWNER_TRUCKSERVICE_CONCATENATED_GOODS,
    ORDER_CONCATENATED_GOODS_TYPE,
    TRUCKOWNER_TRUCKSERVICE_CONTRACT_CAR,
    ORDER_CONTRACT_CAR_TYPE,
  } = I18N;

  /*
   * Set current Page
   */
  const [serviceType, setServiceType] = React.useState<any>(
    initialValues?.serviceType ?? null
  );

  const [options, setOptions] = React.useState<any[]>([]);
  const [selected, setSelected] = React.useState(selectedValues ?? []);
  const [containerSizeSelected, setContainerSizeSelected] = React.useState([]);
  const [payloadSelected, setPayloadSelected] = React.useState([]);
  const [
    nonMotorizedTypeSelected,
    setNonMotorizedTypeSelected,
  ] = React.useState([]);
  const [
    concatenatedGoodsTypeSelected,
    setConcatenatedGoodsTypeSelected,
  ] = React.useState([]);
  const [contractCarTypeSelected, setContractCarTypeSelected] = React.useState(
    []
  );

  React.useEffect(() => {
    if (truckOwnerStore.provinces) {
      truckOwnerStore.provinces.forEach((item: any, index: number) => {
        truckOwnerStore.provinces[index].label = item.name;
        truckOwnerStore.provinces[index].value = item.id;
      });
      setOptions(truckOwnerStore.provinces);
    }

    if (truckOwnerStore.containerSize) {
      const values = truckOwnerStore.currentUserDetail?.containerSize?.map(
        (s: any) => ({
          label: getTruckownerContainerSize(t, s),
          value: s,
        })
      );

      setContainerSizeSelected(values);
    }

    if (truckOwnerStore.truckPayload) {
      const values = truckOwnerStore.currentUserDetail?.truckPayload?.map(
        (s: any) => ({
          label: getTruckownerPayload(t, +s),
          value: +s,
        })
      );

      setPayloadSelected(values);
    }

    if (truckOwnerStore.nonMotorizedType) {
      const values = truckOwnerStore.currentUserDetail?.nonMotorizedType?.map(
        (s: any) => ({
          label: getTruckownerNonMotoried(t, s),
          value: s,
        })
      );

      setNonMotorizedTypeSelected(values);
    }

    if (truckOwnerStore.concatenatedGoodsType) {
      const values = truckOwnerStore.currentUserDetail?.concatenatedGoodsType?.map(
        (s: any) => ({
          label: getTruckownerConcatenatedGoods(t, s),
          value: s,
        })
      );

      setConcatenatedGoodsTypeSelected(values);
    }

    if (truckOwnerStore.contractCarType) {
      const values = truckOwnerStore.currentUserDetail?.contractCarType?.map(
        (s: any) => ({
          label: getTruckownerContractCar(t, s),
          value: s,
        })
      );

      setContractCarTypeSelected(values);
    }
  }, [
    truckOwnerStore.provinces,
    truckOwnerStore.currentUserDetail,
    authStore.loggedUser,
  ]);

  React.useEffect(() => {
    if (authStore.loggedUser.pickupZone && options) {
      let selectedValues: any[] = [];
      authStore.loggedUser.pickupZone.forEach((item: any, index: number) => {
        selectedValues[index] = {
          value: +item,
          label: options.find((data: any) => data.id === +item)?.label,
        };
      });
      setSelected(selectedValues);
    }
  }, [options, authStore.loggedUser]);

  return (
    <>
      <Form
        noValidate
        className={`form form-custom ${className ? className : ''}`}
        style={style}
      >
        {children}
        <Form.Row className="service-info">
          {title && <h3 className="block-title">{title}</h3>}
          <Container fluid>
            <Row>
              <Form.Group
                as={Col}
                xs={12}
                controlId="serviceType"
                className="serviceType"
              >
                <Form.Label>
                  <span>{t(TRUCKOWNER_TRUCKSERVICE_LABEL)}</span>
                </Form.Label>
                <Form.Check
                  className="form-checkbox"
                  inline
                  type="checkbox"
                  onChange={() => {
                    setServiceType(null);
                    handleChangeServiceType(null);
                  }}
                  label={t(TRUCKOWNER_TRUCKSERVICE_ALL)}
                  checked={serviceType === null ? true : false}
                  name="serviceType1"
                  id="serviceType1"
                  defaultValue="all"
                />

                <Form.Check
                  className="form-checkbox"
                  inline
                  type="checkbox"
                  onChange={() => {
                    setServiceType(SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK);
                    handleChangeServiceType(SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK);
                  }}
                  label={t(TRUCKOWNER_TRUCKSERVICE_TRAILORTRACTOR)}
                  checked={
                    serviceType === SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK
                      ? true
                      : false
                  }
                  name="serviceType2"
                  id="serviceType2"
                />

                <Form.Check
                  className="form-checkbox"
                  inline
                  type="checkbox"
                  onChange={() => {
                    setServiceType(SERVICE_TYPE.NORMAL_TRUCK_VAN);
                    handleChangeServiceType(SERVICE_TYPE.NORMAL_TRUCK_VAN);
                  }}
                  label={t(TRUCKOWNER_TRUCKSERVICE_NORMAL)}
                  checked={
                    serviceType === SERVICE_TYPE.NORMAL_TRUCK_VAN ? true : false
                  }
                  name="serviceType3"
                  id="serviceType3"
                />

                <Form.Check
                  className="form-checkbox"
                  inline
                  type="checkbox"
                  onChange={() => {
                    setServiceType(SERVICE_TYPE.NON_MOTORIZED);
                    handleChangeServiceType(SERVICE_TYPE.NON_MOTORIZED);
                  }}
                  label={t(TRUCKOWNER_TRUCKSERVICE_NON_MOTORIZED)}
                  checked={
                    serviceType === SERVICE_TYPE.NON_MOTORIZED ? true : false
                  }
                  name="serviceType4"
                  id="serviceType4"
                />
                <Form.Check
                  className="form-checkbox"
                  inline
                  type="checkbox"
                  onChange={() => {
                    setServiceType(SERVICE_TYPE.CONCATENATED_GOODS);
                    handleChangeServiceType(SERVICE_TYPE.CONCATENATED_GOODS);
                  }}
                  label={t(TRUCKOWNER_TRUCKSERVICE_CONCATENATED_GOODS)}
                  checked={
                    serviceType === SERVICE_TYPE.CONCATENATED_GOODS
                      ? true
                      : false
                  }
                  name="serviceType5"
                  id="serviceType5"
                />
                <Form.Check
                  className="form-checkbox"
                  inline
                  type="checkbox"
                  onChange={() => {
                    setServiceType(SERVICE_TYPE.CONTRACT_CAR);
                    handleChangeServiceType(SERVICE_TYPE.CONTRACT_CAR);
                  }}
                  label={t(TRUCKOWNER_TRUCKSERVICE_CONTRACT_CAR)}
                  checked={
                    serviceType === SERVICE_TYPE.CONTRACT_CAR ? true : false
                  }
                  name="serviceType6"
                  id="serviceType6"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                xs={12}
                controlId="pickupZone"
                className="pickupZone"
              >
                <Form.Label>
                  <span>{t(TRUCKOWNER_PICKUPZONE_LABEL)}</span>
                </Form.Label>
                {truckOwnerStore.provinces && (
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={(value: any) => {
                      setSelected(value);
                      handleChangePickupZone(value);
                    }}
                    overrideStrings={{
                      selectSomeItems: t(ACCOUNT_SELECT),
                      allItemsAreSelected: t(ACCOUNT_SELECT_ALL),
                    }}
                    disableSearch={true}
                    labelledBy={''}
                    selectAllLabel={t(ACCOUNT_SELECT_ALL)}
                  />
                )}
              </Form.Group>
            </Row>
            {(serviceType === SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK ||
              serviceType === null) && (
              <Row>
                <Form.Group
                  as={Col}
                  xs={12}
                  controlId="containerSize"
                  className="containerSize"
                >
                  <Form.Label>
                    <span>{t(TRUCKOWNER_CONTAINERSIZE_LABEL)}</span>
                  </Form.Label>
                  <MultiSelect
                    options={truckownerContainerSize}
                    value={containerSizeSelected}
                    onChange={(value: any) => {
                      setContainerSizeSelected(value);
                      handleChangeContainerSize(value);
                    }}
                    overrideStrings={{
                      selectSomeItems: t(ACCOUNT_SELECT),
                      allItemsAreSelected: t(ACCOUNT_SELECT_ALL),
                    }}
                    disableSearch={true}
                    labelledBy={''}
                    selectAllLabel={t(ACCOUNT_SELECT_ALL)}
                  />
                </Form.Group>
              </Row>
            )}

            {(serviceType === SERVICE_TYPE.NORMAL_TRUCK_VAN ||
              serviceType === null) && (
              <Row>
                <Form.Group
                  as={Col}
                  xs={12}
                  controlId="truckPayload"
                  className="truckPayload"
                >
                  <Form.Label>
                    <span>{t(TRUCKOWNER_TRUCKPAYLOAD_LABEL)}</span>
                  </Form.Label>

                  <MultiSelect
                    options={truckownerPayload.map((p) => ({
                      label: getTruckownerPayload(t, +p.value),
                      value: +p.value,
                    }))}
                    value={payloadSelected}
                    onChange={(value: any) => {
                      setPayloadSelected(value);
                      handleChangePayload(value);
                    }}
                    overrideStrings={{
                      selectSomeItems: t(ACCOUNT_SELECT),
                      allItemsAreSelected: t(ACCOUNT_SELECT_ALL),
                    }}
                    disableSearch={true}
                    labelledBy={''}
                    selectAllLabel={t(ACCOUNT_SELECT_ALL)}
                  />
                </Form.Group>
              </Row>
            )}
            {(serviceType === SERVICE_TYPE.NON_MOTORIZED ||
              serviceType === null) && (
              <Row>
                <Form.Group
                  as={Col}
                  xs={12}
                  controlId="nonMotorizedType"
                  className="nonMotorizedType"
                >
                  <Form.Label>
                    <span>{t(ORDER_NON_MOTORIZED_TYPE)}</span>
                  </Form.Label>

                  <MultiSelect
                    options={truckNonMotorizedType.slice(1).map((p) => ({
                      label: t(p.label),
                      value: p.value,
                    }))}
                    value={nonMotorizedTypeSelected}
                    onChange={(value: any) => {
                      setNonMotorizedTypeSelected(value);
                      handleChangeNonMotorizedType(value);
                    }}
                    overrideStrings={{
                      selectSomeItems: t(ACCOUNT_SELECT),
                      allItemsAreSelected: t(ACCOUNT_SELECT_ALL),
                    }}
                    disableSearch={true}
                    labelledBy={''}
                    selectAllLabel={t(ACCOUNT_SELECT_ALL)}
                  />
                </Form.Group>
              </Row>
            )}
            {(serviceType === SERVICE_TYPE.CONCATENATED_GOODS ||
              serviceType === null) && (
              <Row>
                <Form.Group
                  as={Col}
                  xs={12}
                  controlId="concatenatedGoodsType"
                  className="concatenatedGoodsType"
                >
                  <Form.Label>
                    <span>{t(ORDER_CONCATENATED_GOODS_TYPE)}</span>
                  </Form.Label>

                  <MultiSelect
                    options={concatenatedGoodsType.slice(1).map((p) => ({
                      label: t(p.label),
                      value: p.key,
                    }))}
                    value={concatenatedGoodsTypeSelected}
                    onChange={(value: any) => {
                      setConcatenatedGoodsTypeSelected(value);
                      handleChangeConcatenatedGoodsType(value);
                    }}
                    overrideStrings={{
                      selectSomeItems: t(ACCOUNT_SELECT),
                      allItemsAreSelected: t(ACCOUNT_SELECT_ALL),
                    }}
                    disableSearch={true}
                    labelledBy={''}
                    selectAllLabel={t(ACCOUNT_SELECT_ALL)}
                  />
                </Form.Group>
              </Row>
            )}
            {(serviceType === SERVICE_TYPE.CONTRACT_CAR ||
              serviceType === null) && (
              <Row>
                <Form.Group
                  as={Col}
                  xs={12}
                  controlId="contractCarType"
                  className="contractCarType"
                >
                  <Form.Label>
                    <span>{t(ORDER_CONTRACT_CAR_TYPE)}</span>
                  </Form.Label>

                  <MultiSelect
                    options={contractCarType.slice(1).map((p) => ({
                      label: t(p.label),
                      value: p.key,
                    }))}
                    value={contractCarTypeSelected}
                    onChange={(value: any) => {
                      setContractCarTypeSelected(value);
                      handleChangeContractCarType(value);
                    }}
                    overrideStrings={{
                      selectSomeItems: t(ACCOUNT_SELECT),
                      allItemsAreSelected: t(ACCOUNT_SELECT_ALL),
                    }}
                    disableSearch={true}
                    labelledBy={''}
                    selectAllLabel={t(ACCOUNT_SELECT_ALL)}
                  />
                </Form.Group>
              </Row>
            )}
          </Container>
        </Form.Row>
      </Form>
    </>
  );
};

export default observer(TruckOwnerAccountForm);
