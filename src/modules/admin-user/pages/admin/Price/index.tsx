/* eslint-disable array-callback-return */
import ConfirmModal from '@/libs/components/ConfirmModal';
import Loading from '@/libs/components/Loading';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import {
  SETTING_TYPE,
  truckPayloadAdmin,
} from '@/modules/admin-user/admin.enum';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import BaseFare from '@/modules/admin-user/components/BaseFare';
import DistanceFare from '@/modules/admin-user/components/DistanceFare';
import DynamicItems from '@/modules/admin-user/components/DynamicItems';
import MultipleStopsCharges from '@/modules/admin-user/components/MultipleStopsCharges';
import PayloadFare from '@/modules/admin-user/components/PayloadFare';
import SurCharges from '@/modules/admin-user/components/SurCharges';
import ZonePrice from '@/modules/admin-user/components/ZonePrice';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import { truckTypeAll } from '@/modules/truck/truck.enum';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import { CircularProgress } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import { Formik } from 'formik';
import { observer } from 'mobx-react';
import React from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const Dashed = () => {
  return (
    <>
      <Row className="dashed bordered large"></Row>
    </>
  );
};

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}
const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: theme.palette.grey[50],
          opacity: 1,
          border: `1px solid ${theme.palette.grey[400]}`,
        },
      },
      '&$focusVisible $thumb': {
        color: theme.palette.grey[50],
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: '#fab91a',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const ManagePriceSetting = () => {
  const adminStore = React.useContext(AdminStoreContext);
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    PRICING_TITLE,
    BUTTONS_ADD_MORE,
    MESSAGES_UPDATE_SUCCESS,
    PRICING_ZONE_FARE_LABEL,
    PRICING_DISTANCE_FARE_LABEL,
    PRICING_BASE_FARE_TRACTOR_LABEL,
    PRICING_BASE_FARE_NORMAL_LABEL,
    PRICING_BASE_FARE_NONMOTORIZED_LABEL,
    PRICING_BASE_FARE_CONCATENATED_GOODS_LABEL,
    PRICING_BASE_FARE_CONTRACT_CAR_LABEL,
    PRICING_INPUT_PLACEHOLDER,
    PRICING_PAYLOAD_FARE_LABEL,
    PRICING_SURCHARGE,
    PRICING_DYNAMIC_ITEMS_TITLE,
    PRICING_USE_THIS_SETTING,
    BUTTONS_UPDATE,
    PRICING_ZONE_NOT_APPLICABLE,
    PRICING_ZONE_FARE_INFO,
    PRICING_ON_OFF,
    MESSAGES_CONFIRM_DELETE,
    PRICING_MULTIPLE_CHARGE,
    PRICING_BASE_FARE,
    PLACEHOLDER_PRICE_REQUEST,
  } = I18N;

  const [options, setOptions] = React.useState<any[]>([]);

  const [payloadOptions, setPayloadOptions] = React.useState<any[]>([]);

  const [provinces, setProvinces] = React.useState<any[]>([]);

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  /*
   * show hide delete popup
   */
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = React.useState<
    boolean
  >(false);

  const handleShowDelete = async () => {
    setShowConfirmDeletePopup(true);
  };

  const [selectedType, setSelectedType] = React.useState<any>({
    id: null,
    values: null,
    type: '',
  });

  const handleOkDelete = async () => {
    const type = selectedType.type;
    const values = selectedType.values;
    const id = selectedType.id;
    switch (type) {
      case 'TruckTypeFare':
        await handleUpdate(values);
        await adminStore.deleteTruckTypeFare(id);
        break;
      case 'PayloadFare':
        await handleUpdate(values);
        await adminStore.deletePayloadFare(id);
        break;
      case 'ZoneFare':
        await handleUpdate(values);
        await adminStore.deletePayloadZone(id);
        break;
      case 'DistanceFare':
        await handleUpdate(values);
        await adminStore.deleteDistancePrice(id);
        break;
      case 'Distance':
        await handleUpdate(values);
        await adminStore.deleteDistance(id);
        break;
      case 'DynamicItem':
        await handleUpdate(values);
        await adminStore.deleteDynamicItem(id);
        break;
      case 'pricing':
        await adminStore.deletePriceSetting(id);
        break;
      case 'multipleStops':
        await adminStore.deleteMultipleStops(id);
        break;
    }
    getPiceSettings();
    setSelectedType({
      id: null,
      values: null,
      type: '',
    });
    setShowConfirmDeletePopup(false);
    return true;
  };

  const handleCancelDelete = () => {
    setSelectedType({
      id: null,
      values: null,
      type: '',
    });
    setShowConfirmDeletePopup(false);
  };

  const handleAddFields = async () => {
    await adminStore.addPriceSetting();
    getPiceSettings();
  };

  const getPiceSettings = React.useCallback(async () => {
    await adminStore.getPriceSettings();
  }, [adminStore]);

  const handleUpdate = async (values: any, isUpdate?: boolean) => {
    setIsSubmitting(isUpdate ? true : false);
    const result = await adminStore.updatePriceSetting(values);
    if (result && isUpdate) {
      setIsSubmitting(false);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
      setTimeout(() => {
        toast.dismiss();
      }, 300);
    }
  };

  const handleRemoveFields = async (id: number) => {
    setSelectedType({
      id,
      values: null,
      type: 'pricing',
    });
    handleShowDelete();
    // await adminStore.deletePriceSetting(id);
    // getPiceSettings();
  };

  const handleAddTruckTypeFare = async (
    priceSettingId: number,
    values: any
  ) => {
    await handleUpdate(values);
    await adminStore.addTruckTypeFare(priceSettingId);
    getPiceSettings();
  };

  const handleCreateZone = async (priceSettingId: number, values: any) => {
    await handleUpdate(values);
    await adminStore.addZonePrice(priceSettingId);
    getPiceSettings();
  };

  const handleAddPayloadFare = async (priceSettingId: number, values: any) => {
    await handleUpdate(values);
    await adminStore.handleAddPayloadFare(priceSettingId);
    getPiceSettings();
  };

  const handleDeleteTruckTypeFare = async (id: number, values: any) => {
    setSelectedType({
      id,
      values,
      type: 'TruckTypeFare',
    });
    handleShowDelete();
  };

  const handleDeletePayloadFare = async (id: number, values: any) => {
    // await handleUpdate(values);
    // await adminStore.deletePayloadFare(id);
    // getPiceSettings();
    setSelectedType({
      id,
      values,
      type: 'PayloadFare',
    });
    handleShowDelete();
  };

  const handleDeleteZoneFare = async (id: number, values: any) => {
    // await handleUpdate(values);
    // await adminStore.deletePayloadZone(id);
    // getPiceSettings();
    setSelectedType({
      id,
      values,
      type: 'ZoneFare',
    });
    handleShowDelete();
  };

  const handleDeleteDistanceFare = async (id: number, values: any) => {
    // await handleUpdate(values);
    // await adminStore.deleteDistancePrice(id);
    // getPiceSettings();

    setSelectedType({
      id,
      values,
      type: 'DistanceFare',
    });
    handleShowDelete();
  };

  const handleCreateDistanceFare = async (id: number, values: any) => {
    await handleUpdate(values);
    await adminStore.createDistanceFare(id);
    getPiceSettings();
  };

  const handleCreateDistance = async (id: number, values: any) => {
    await handleUpdate(values);
    await adminStore.createDistance(id);
    getPiceSettings();
  };

  const handleDeleteDistance = async (id: number, values: any) => {
    // await handleUpdate(values);
    // await adminStore.deleteDistance(id);
    // getPiceSettings();

    setSelectedType({
      id,
      values,
      type: 'Distance',
    });
    handleShowDelete();
  };

  const handleDeleteDynamicItem = async (id: number, values: any) => {
    // await handleUpdate(values);
    // await adminStore.deleteDynamicItem(id);
    // getPiceSettings();

    setSelectedType({
      id,
      values,
      type: 'DynamicItem',
    });
    handleShowDelete();
  };

  const handlCreateDynamicItem = async (id: number, values: any) => {
    await handleUpdate(values);
    await adminStore.createDynamicItem(id);
    getPiceSettings();
  };

  const handleDeleteMultipleStopsCharges = async (id: number, values: any) => {
    setSelectedType({
      id,
      values,
      type: 'multipleStops',
    });
    handleShowDelete();
  };

  const handleCreateMultipleStopsCharges = async (id: number, values: any) => {
    await handleUpdate(values);
    await adminStore.createMultipleStops(id);
    getPiceSettings();
  };

  const [setting, setSetting] = React.useState<boolean>(false);

  const handleUpdateSetting = async (value: boolean, data: any) => {
    data.enabled = value;
    const result = await adminStore.updateSetting(data);
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
      setTimeout(() => {
        toast.dismiss();
      }, 300);
    }
  };

  const getProvinces = React.useCallback(async () => {
    await truckOwnerStore.getProvince();
    truckOwnerStore.provinces.forEach((item: any, index: number) => {
      truckOwnerStore.provinces[index].label = item.name;
      truckOwnerStore.provinces[index].key = item.id;
    });
    setProvinces(truckOwnerStore.provinces);
  }, [truckOwnerStore]);

  const getSetting = React.useCallback(
    async (type: number) => {
      const data = await adminStore.getSetting(type);
      setSetting(data.enabled);
    },
    [adminStore]
  );

  React.useEffect(() => {
    getSetting(SETTING_TYPE.PRICING);
    getProvinces();
    truckTypeAll.slice(1).map((item, index) => {
      adminStore.truckTypes.push({ value: '', label: '' });
      adminStore.truckTypes[index].label = t(item.label);
      adminStore.truckTypes[index].value = `${item.key}`;
      setOptions(adminStore.truckTypes);
    });
    truckPayloadAdmin.slice(1).map((item, index) => {
      adminStore.truckPayload.push({ value: '', label: '' });
      adminStore.truckPayload[index].label = t(item.label);
      adminStore.truckPayload[index].value = item.key;
      setPayloadOptions(adminStore.truckPayload);
    });
  }, [
    adminStore.truckPayload,
    adminStore.truckTypes,
    getProvinces,
    getSetting,
    t,
    truckOwnerStore,
  ]);

  React.useEffect(() => {
    getPiceSettings();
  }, [getPiceSettings]);
  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <AdminWrapper pageTitle={t(PRICING_TITLE)}>
          <FormControlLabel
            control={
              <IOSSwitch
                checked={!setting}
                onChange={() => {
                  setSetting(!setting);
                  handleUpdateSetting(!setting, adminStore.pricingSetting);
                }}
                className="form-switch"
              />
            }
            label={t(PRICING_ON_OFF)}
          />
          {adminStore.pricingSettings &&
            adminStore.pricingSettings.length > 0 &&
            adminStore.pricingSettings.map((u, index) => (
              <>
                <Formik
                  onSubmit={(values) => {
                    handleUpdate(values, true);
                  }}
                  enableReinitialize
                  initialValues={u}
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
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className={'form form-custom pricing-setting'}
                    >
                      <Form.Row>
                        <Container fluid>
                          <Row>
                            <Form.Group
                              as={Col}
                              xs={12}
                              lg={12}
                              controlId=""
                              className="c-align title"
                            >
                              <Form.Label className="form-label">
                                {t(PRICING_BASE_FARE)}
                              </Form.Label>
                            </Form.Group>
                            <Button
                              variant={BUTTONVARIANT.PRIMARY}
                              onClick={() => handleRemoveFields(u.id)}
                              className="btn-icon dynamic-remove right-ico"
                            >
                              <i className="ico ico-delete font-lg"></i>
                            </Button>
                          </Row>
                          <Row>
                            <Form.Group
                              as={Col}
                              xs={12}
                              lg={6}
                              controlId="baseFareTractor"
                              className="form-group-tractor"
                            >
                              <Form.Label className="form-label">
                                {t(PRICING_BASE_FARE_TRACTOR_LABEL)}
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={values.baseFareTractor}
                                onChange={handleChange}
                                placeholder={t(PLACEHOLDER_PRICE_REQUEST)}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.baseFareTractor}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              xs={12}
                              lg={6}
                              controlId="baseFareNormal"
                              className="form-group-normal"
                            >
                              <Form.Label className="form-label">
                                {t(PRICING_BASE_FARE_NORMAL_LABEL)}
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={values.baseFareNormal}
                                onChange={handleChange}
                                placeholder={t(PRICING_INPUT_PLACEHOLDER)}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.baseFareNormal}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>

                          <Row>
                            <Form.Group
                              as={Col}
                              xs={12}
                              lg={6}
                              controlId="baseFareNonMotorized"
                              className="form-group-tractor"
                            >
                              <Form.Label className="form-label">
                                {t(PRICING_BASE_FARE_NONMOTORIZED_LABEL)}
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={values.baseFareNonMotorized}
                                onChange={handleChange}
                                placeholder={t(PLACEHOLDER_PRICE_REQUEST)}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.baseFareNonMotorized}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>

                          <Row>
                            <Form.Group
                              as={Col}
                              xs={12}
                              lg={6}
                              controlId="baseFareConcatenatedGoods"
                              className="form-group-tractor"
                            >
                              <Form.Label className="form-label">
                                {t(PRICING_BASE_FARE_CONCATENATED_GOODS_LABEL)}
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={values.baseFareConcatenatedGoods}
                                onChange={handleChange}
                                placeholder={t(PLACEHOLDER_PRICE_REQUEST)}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.baseFareConcatenatedGoods}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>

                          <Row>
                            <Form.Group
                              as={Col}
                              xs={12}
                              lg={6}
                              controlId="baseFareContractCar"
                              className="form-group-tractor"
                            >
                              <Form.Label className="form-label">
                                {t(PRICING_BASE_FARE_CONTRACT_CAR_LABEL)}
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={values.baseFareContractCar}
                                onChange={handleChange}
                                placeholder={t(PLACEHOLDER_PRICE_REQUEST)}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.baseFareContractCar}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>

                          {values.truckTypeFares &&
                            values.truckTypeFares.length > 0 &&
                            values.truckTypeFares.map(
                              (truckTypeFare: any, indexer: number) => {
                                return (
                                  <React.Fragment key={`${indexer}`}>
                                    <BaseFare
                                      options={options}
                                      index={indexer}
                                      errors={errors}
                                      handleChange={handleChange}
                                      values={truckTypeFare}
                                      handleDeleteTruckTypeFare={
                                        handleDeleteTruckTypeFare
                                      }
                                      handleAddTruckTypeFare={
                                        handleAddTruckTypeFare
                                      }
                                      pricingId={values.id}
                                      pricingSetting={values}
                                    />
                                  </React.Fragment>
                                );
                              }
                            )}
                          <Dashed />

                          <Form.Label className="form-label bold">
                            {t(PRICING_PAYLOAD_FARE_LABEL)}
                          </Form.Label>
                          {values.payloadFares.length > 0 &&
                            values.payloadFares.map(
                              (payloadFare: any, index: number) => {
                                return (
                                  <>
                                    <PayloadFare
                                      options={payloadOptions}
                                      index={index}
                                      handleChange={handleChange}
                                      values={payloadFare}
                                      errors={errors}
                                      handleDeletePayloadFare={
                                        handleDeletePayloadFare
                                      }
                                      pricingId={values.id}
                                      handleAddPayloadFare={
                                        handleAddPayloadFare
                                      }
                                      pricingSetting={values}
                                    />
                                  </>
                                );
                              }
                            )}
                          <Form.Label className="form-label bold">
                            {t(PRICING_ZONE_FARE_LABEL)}
                            <OverlayTrigger
                              key={'right'}
                              placement={'right'}
                              overlay={
                                <Tooltip id="tooltip-info">
                                  {t(PRICING_ZONE_FARE_INFO)}
                                </Tooltip>
                              }
                            >
                              <div className="tooltip-icon">
                                <span className="ico ico-faq"></span>
                              </div>
                            </OverlayTrigger>
                          </Form.Label>
                          {values.zonePrices.length > 0 &&
                            values.zonePrices.map((u: any, index: number) => {
                              return (
                                <>
                                  {provinces.length > 0 && (
                                    <ZonePrice
                                      options={payloadOptions}
                                      provinces={provinces}
                                      index={index}
                                      handleChange={handleChange}
                                      values={u}
                                      errors={errors}
                                      length={values.payloadFares.length}
                                      handleDeleteZoneFare={
                                        handleDeleteZoneFare
                                      }
                                      priceSettingId={values.id}
                                      handleCreateZone={handleCreateZone}
                                      pricingSetting={values}
                                      handleUpdate={handleUpdate}
                                    />
                                  )}
                                </>
                              );
                            })}
                          <Form.Label className="form-label bold">
                            {t(PRICING_DISTANCE_FARE_LABEL)}
                            <OverlayTrigger
                              key={'right'}
                              placement={'right'}
                              overlay={
                                <Tooltip id="tooltip-info">
                                  {t(PRICING_ZONE_NOT_APPLICABLE)}
                                </Tooltip>
                              }
                            >
                              <div className="tooltip-icon">
                                <span className="ico ico-faq"></span>
                              </div>
                            </OverlayTrigger>
                          </Form.Label>
                          {values.distancePrices.length > 0 &&
                            values.distancePrices.map(
                              (u: any, index: number) => {
                                return (
                                  <>
                                    <DistanceFare
                                      options={payloadOptions}
                                      truckTypeOptions={options}
                                      index={index}
                                      handleChange={handleChange}
                                      values={u}
                                      handleDeleteDistanceFare={
                                        handleDeleteDistanceFare
                                      }
                                      handleDeleteDistance={
                                        handleDeleteDistance
                                      }
                                      handleCreateDistance={
                                        handleCreateDistance
                                      }
                                      handleCreateDistanceFare={
                                        handleCreateDistanceFare
                                      }
                                      priceSettingId={values.id}
                                      pricingSetting={values}
                                    />
                                  </>
                                );
                              }
                            )}
                          <Form.Label className="form-label bold">
                            {t(PRICING_MULTIPLE_CHARGE)}
                          </Form.Label>
                          {values.multipleStopsCharges.length > 0 &&
                            values.multipleStopsCharges.map(
                              (u: any, index: number) => {
                                return (
                                  <>
                                    <MultipleStopsCharges
                                      options={payloadOptions}
                                      truckTypeOptions={options}
                                      index={index}
                                      handleChange={handleChange}
                                      values={u}
                                      priceSettingId={values.id}
                                      pricingSetting={values}
                                      handleDeleteMultipleStopsCharges={
                                        handleDeleteMultipleStopsCharges
                                      }
                                      handleCreateMultipleStopsCharges={
                                        handleCreateMultipleStopsCharges
                                      }
                                    />
                                  </>
                                );
                              }
                            )}

                          <Row>
                            <Form.Group
                              as={Col}
                              xs={12}
                              lg={12}
                              controlId=""
                              className="c-align title title-sm bordered-no-shadow top"
                            >
                              <Form.Label className="form-label">
                                {t(PRICING_SURCHARGE)}
                              </Form.Label>
                            </Form.Group>
                          </Row>
                          <SurCharges
                            values={values.surCharges[0]}
                            handleChange={handleChange}
                          />
                          <Row>
                            <Form.Group
                              as={Col}
                              xs={12}
                              lg={12}
                              controlId=""
                              className="c-align title title-sm bordered-no-shadow top"
                            >
                              <Form.Label className="form-label">
                                {t(PRICING_DYNAMIC_ITEMS_TITLE)}
                              </Form.Label>
                            </Form.Group>
                          </Row>

                          {values.dynamicCharges.length > 0 &&
                            values.dynamicCharges.map(
                              (u: any, index: number) => {
                                return (
                                  <>
                                    <DynamicItems
                                      index={index}
                                      values={u}
                                      handleChange={handleChange}
                                      handleAddDynamicItem={
                                        handlCreateDynamicItem
                                      }
                                      handleDeleteDynamicItem={
                                        handleDeleteDynamicItem
                                      }
                                      pricingId={values.id}
                                      pricingSetting={values}
                                    />
                                  </>
                                );
                              }
                            )}
                          <Row className="bordered-no-shadow top padding-space ">
                            <Form.Group
                              as={Col}
                              xs={12}
                              lg={6}
                              controlId={`isUsing${index}`}
                              id={`use-this-setting-${index}`}
                            >
                              <Form.Check
                                value={values.isUsing}
                                defaultChecked={values.isUsing}
                                onChange={handleChange}
                                name={'isUsing'}
                                type="checkbox"
                                label={t(PRICING_USE_THIS_SETTING)}
                              />
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              xs={12}
                              lg={6}
                              controlId=""
                              id=""
                              className="r-align"
                            >
                              <Button
                                type="submit"
                                color="primary"
                                className="submit-btn"
                                disabled={isSubmitting}
                              >
                                {isSubmitting && <CircularProgress size={20} />}
                                {!isSubmitting && (
                                  <>
                                    <span className="dropoff-addition">
                                      {t(BUTTONS_UPDATE)}
                                    </span>
                                    <i className="ico ico-update"></i>
                                  </>
                                )}
                              </Button>
                            </Form.Group>
                          </Row>
                        </Container>
                      </Form.Row>
                      <Row className="more-dropoff">
                        <Button
                          onClick={handleAddFields}
                          className="add-dropoff-btn"
                        >
                          <span className="dropoff-addition">
                            {t(BUTTONS_ADD_MORE)}
                          </span>
                          <span className="fas fa-plus-square dropoff-addition"></span>
                        </Button>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </>
            ))}
          {adminStore.pricingSettings.length === 0 && (
            <Button onClick={handleAddFields} className="add-dropoff-btn">
              <span className="dropoff-addition">{t(BUTTONS_ADD_MORE)}</span>
              <span className="fas fa-plus-square dropoff-addition"></span>
            </Button>
          )}
          <ConfirmModal
            show={showConfirmDeletePopup}
            handleCancel={handleCancelDelete}
            handleOk={handleOkDelete}
          >
            <p>{t(MESSAGES_CONFIRM_DELETE)}</p>
          </ConfirmModal>
        </AdminWrapper>
      </React.Suspense>
    </>
  );
};

export default observer(ManagePriceSetting);
