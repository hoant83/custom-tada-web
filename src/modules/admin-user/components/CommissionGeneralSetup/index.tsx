import React, { useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import * as yup from 'yup';
import adminService from '@/modules/admin-user/admin.service';
import MultiSelect from 'react-multi-select-component';
import { toast } from 'react-toastify';
import { AdminGeneralSetupCommissionDto } from '../../admin.dto';

/**
 * Props of Component
 */
interface ComponentProps {}

/**
 * Interface of General Setting
 */
interface IGeneralSetting {
  enabled: boolean;
  default: boolean;
}

const CommissionGeneralSetup = (props: ComponentProps) => {
  /**
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_UPDATE,
    VALIDATE_NUMBER,
    PRICING_PERCENT_COMMISSION,
    PRICING_FIXED_COMMISSION,
    COMMISSION_GENERAL_SETUP,
    COMMISSION_CHECK_ENABLE_FEATURE,
    COMMISSION_CHECK_SETUP_DEFAULT,
    COMMISSION_APPLY_TO,
    COMMISSION_SELECT_ALL,
    COMMISSION_DEFAULT_CHOOSE_APPLY,
    MESSAGES_UPDATE_SUCCESS,
  } = I18N;

  /**
   * State storage setting commisson
   */
  const [commission, setCommission] = React.useState<
    AdminGeneralSetupCommissionDto | any
  >(null);

  /**
   * State storage list all truck owners
   */
  const [truckOwners, setTruckOwners] = React.useState<any[] | null>(null);

  /**
   * State storage list truck owners selected
   */
  const [selected, setSelected] = React.useState<any[]>([]);

  /**
   * State storage general setting
   */
  const [generalSetting, setGeneralSetting] = React.useState<IGeneralSetting>({
    enabled: false,
    default: false,
  });

  /**
   * Schema validate of form setting
   */
  const schema = yup.object({
    percentCommission: yup
      .number()
      .typeError(t(VALIDATE_NUMBER))
      .min(0)
      .max(100),
    fixedCommission: yup.number().typeError(t(VALIDATE_NUMBER)),
  });

  /**
   * Handle when save General Setting
   */
  const handleSave = async (values: any) => {
    type TypeValues = {
      enabled?: boolean;
      default?: boolean;
      allTruckOwnersCommission?: boolean;
      percentCommission?: number;
      fixedCommission?: number;
      truckOwnersId?: number[];
    };
    const allValues: TypeValues = {
      ...values,
      ...generalSetting,
      truckOwnersId: selected.map((e) => e.value),
    };
    const isAllTruckOwners =
      allValues.truckOwnersId?.length === truckOwners?.length ? true : false;
    const data: AdminGeneralSetupCommissionDto = allValues.enabled
      ? {
          isEnableCommissionFeature: true,
          isEnableAllTruckOwnersCommission: isAllTruckOwners,
          isEnableSetupDefaultDriversCommission: allValues.default,
          defaultPercentCommission: Number(allValues.percentCommission),
          defaultFixedCommission: Number(allValues.fixedCommission),
          truckOwnersId: allValues.truckOwnersId,
        }
      : { isEnableCommissionFeature: false };
    if (isAllTruckOwners) delete data.truckOwnersId;
    if (!allValues.default) {
      delete data.defaultPercentCommission;
      delete data.defaultFixedCommission;
    }
    const result = await adminService.updateCommission(data);
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  /**
   * Get setting commission
   */
  const getCommissionSettings = async () => {
    const result: AdminGeneralSetupCommissionDto = await adminService.getCommission();
    if (result) {
      setCommission(result);
      if (result.isEnableCommissionFeature) {
        if (result.isEnableSetupDefaultDriversCommission) {
          handleSetDefaultSetting();
        }
        handleEnableSetting();
      }
    }
  };

  /**
   * Get all truck owners for multiple select
   */
  const handleGetAllTruckOwners = async () => {
    if (truckOwners && truckOwners.length) return;
    const owners = await adminService.getAllTruckOWners();
    const ownersMap = owners.map((owner: any) => ({
      label: owner.email,
      value: owner.id,
    }));
    setTruckOwners(ownersMap);
  };

  /**
   * Handle enable General Setting Commisson
   */
  const handleEnableSetting = () => {
    setGeneralSetting((prev) => ({
      ...prev,
      enabled: !prev.enabled,
    }));
    handleGetAllTruckOwners();
  };

  /**
   * Set default General Setting commission
   */
  const handleSetDefaultSetting = () => {
    setGeneralSetting((prev) => ({
      ...prev,
      default: !prev.default,
    }));
  };

  /**
   * UseEffect: Initial get general settings
   */
  useEffect(() => {
    getCommissionSettings();
  }, []);

  /**
   * UseEffect: Re-update truck owners selected
   */
  useEffect(() => {
    if (commission && truckOwners) {
      const truckOwnersSelected = commission.isEnableAllTruckOwnersCommission
        ? truckOwners
        : truckOwners?.filter((e) =>
            commission.truckOwnersId?.includes(e.value)
          ) || [];
      setSelected(truckOwnersSelected);
    }
  }, [commission, truckOwners]);

  return (
    <Container
      fluid
      className={'block block-table black-box-type table-smaller '}
      id="black-box-container"
    >
      <Formik
        enableReinitialize
        validationSchema={schema}
        onSubmit={(values) => {
          handleSave(values);
        }}
        initialValues={{
          percentCommission: commission?.defaultPercentCommission ?? 0,
          fixedCommission: commission?.defaultFixedCommission ?? 0,
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Row>
              <Col xs={12}>
                <h3 className="block-title">{t(COMMISSION_GENERAL_SETUP)}</h3>
              </Col>
            </Row>
            <Container fluid>
              <Row>
                <Form.Check
                  className="form-checkbox mb-3"
                  type="checkbox"
                  onChange={() => handleEnableSetting()}
                  label={t(COMMISSION_CHECK_ENABLE_FEATURE)}
                  checked={generalSetting.enabled}
                  name="enableFeature"
                  id="enableFeature"
                  disabled={false}
                />
              </Row>
              {generalSetting.enabled && (
                <>
                  <Row>
                    <Form.Check
                      className="form-checkbox mb-3"
                      type="checkbox"
                      onChange={handleSetDefaultSetting}
                      label={t(COMMISSION_CHECK_SETUP_DEFAULT)}
                      checked={generalSetting.default}
                      name="setDefault"
                      id="setDefault"
                      disabled={false}
                    />
                  </Row>

                  {generalSetting.default && (
                    <>
                      <Row>
                        <Form.Group
                          as={Col}
                          xs={12}
                          lg={6}
                          controlId="percentCommission"
                        >
                          <Form.Label>
                            <span>{t(PRICING_PERCENT_COMMISSION)}</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={values.percentCommission}
                            onChange={handleChange}
                            placeholder={t(PRICING_PERCENT_COMMISSION)}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.percentCommission}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          xs={12}
                          lg={6}
                          controlId="fixedCommission"
                        >
                          <Form.Label>
                            <span>{t(PRICING_FIXED_COMMISSION)}</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={values.fixedCommission}
                            onChange={handleChange}
                            placeholder={t(PRICING_FIXED_COMMISSION)}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.fixedCommission}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group
                          as={Col}
                          xs={12}
                          lg={12}
                          controlId="multi-select-truck-owners"
                          className="multi-select-truck-owners"
                        >
                          <Form.Label>
                            <span>{t(COMMISSION_APPLY_TO)}</span>
                          </Form.Label>
                          {truckOwners && truckOwners.length > 0 && (
                            <MultiSelect
                              options={truckOwners}
                              value={selected}
                              onChange={(value: any) => {
                                setSelected(value);
                              }}
                              overrideStrings={{
                                selectSomeItems: t(
                                  COMMISSION_DEFAULT_CHOOSE_APPLY
                                ),
                                allItemsAreSelected: t(COMMISSION_SELECT_ALL),
                              }}
                              disableSearch={true}
                              labelledBy={''}
                              selectAllLabel={t(COMMISSION_SELECT_ALL)}
                            />
                          )}
                        </Form.Group>
                      </Row>
                    </>
                  )}
                </>
              )}
            </Container>
            <Row>
              <Col className="d-flex justify-content-end mt-3">
                <Button variant="primary" type="submit">
                  <span>{t(BUTTONS_UPDATE)}</span>
                  <i className="ico ico-update"></i>
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CommissionGeneralSetup;
