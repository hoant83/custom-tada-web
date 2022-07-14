import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';

import {
  SERVICE_TYPE,
  truckownerContainerSize,
  truckownerPayload,
} from '@/modules/truckowner/truckowner.enum';

import { Form, Row, Col, Container } from 'react-bootstrap';
import MultiSelect from 'react-multi-select-component';

import {
  getTruckownerContainerSize,
  getTruckownerPayload,
} from '@/modules/truckowner/truckowner.enum';

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
}

const AdminServiceForm = (props: ComponentProps) => {
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
  } = I18N;

  /*
   * Set current Page
   */
  const [serviceType, setServiceType] = React.useState<any>(
    initialValues?.serviceType ?? null
  );
  const [containerSizeSelected, setContainerSizeSelected] = React.useState([]);
  const [payloadSelected, setPayloadSelected] = React.useState([]);
  const [options, setOptions] = React.useState<any[]>([]);
  const [selected, setSelected] = React.useState(selectedValues ?? []);

  React.useEffect(() => {
    if (truckOwnerStore.provinces) {
      truckOwnerStore.provinces.forEach((item: any, index: number) => {
        truckOwnerStore.provinces[index].label = item.name;
        truckOwnerStore.provinces[index].value = item.id;
      });

      setOptions(truckOwnerStore.provinces);
    }

    if (truckOwnerStore.containerSize) {
      const values = truckOwnerStore.truckOwnerAdmin?.containerSize?.map(
        (s: any) => ({
          label: getTruckownerContainerSize(t, s),
          value: s,
        })
      );

      setContainerSizeSelected(values);
    }

    if (truckOwnerStore.truckPayload) {
      const values = truckOwnerStore.truckOwnerAdmin?.truckPayload?.map(
        (s: any) => ({
          label: getTruckownerPayload(t, +s),
          value: +s,
        })
      );

      setPayloadSelected(values);
    }
  }, [
    truckOwnerStore.provinces,
    truckOwnerStore.truckOwnerAdmin,
    truckOwnerStore.containerSize,
    truckOwnerStore.truckPayload,
    t,
  ]);

  React.useEffect(() => {
    if (truckOwnerStore.truckOwnerAdmin?.pickupZone && options) {
      let selectedValues: any[] = [];
      truckOwnerStore.truckOwnerAdmin.pickupZone.forEach(
        (item: any, index: number) => {
          selectedValues[index] = {
            value: +item,
            label: options.find((data: any) => data.id === +item)?.label,
          };
        }
      );
      setSelected(selectedValues);
    }
  }, [options, truckOwnerStore.truckOwnerAdmin]);

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
            {serviceType !== SERVICE_TYPE.NORMAL_TRUCK_VAN && (
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

            {serviceType !== SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK && (
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
          </Container>
        </Form.Row>
      </Form>
    </>
  );
};

export default observer(AdminServiceForm);
