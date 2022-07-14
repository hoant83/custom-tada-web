import Loading from '@/libs/components/Loading';
import { LICENSE } from '@/libs/constants/price-quotation';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import LicenseModal from '@/modules/account/components/LicenseModal';
import { LicenseMail } from '@/modules/admin-user/admin.dto';
import {
  ACCOUNT_ROLE,
  BLACK_BOX_TYPE,
  DISPLAY_ON,
} from '@/modules/admin-user/admin.enum';
import adminService from '@/modules/admin-user/admin.service';
import adminStore from '@/modules/admin-user/admin.store';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import { observer } from 'mobx-react';
import React from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
const TrackingSettings = () => {
  const authStore = React.useContext(AuthenticationStoreContext);

  const { t } = useTranslation();
  const {
    MESSAGES_UPDATE_SUCCESS,
    PRICE_QUOTATION_STANDARD_LICENSE,
    PRICE_QUOTATION_PREMIUM_LICENSE,
    BUTTONS_UPDATE,
  } = I18N;
  const [license, setLicense] = React.useState(
    authStore.license ? authStore.license : LICENSE.STANDARD
  );
  const [complete, setComplete] = React.useState<boolean>(false);
  const [showLicense, setShowLicense] = React.useState<boolean>(false);
  const [showToolTip, setShowToolTip] = React.useState<boolean>(false);
  const [blackBoxType, setBlackBoxType] = React.useState<any>(
    authStore?.blackBoxType
  );

  const [displayOn, setDisplayOn] = React.useState<any>(authStore?.displayOn);

  const {
    TRACKING_UPGRADE,
    TRACKING_DISPLAY_FROM,
    TRACKING_DISPLAY_ON,
    TRACKING_ON_CUSTOMER,
    TRACKING_ON_TRUCKOWNER,
    TRACKING_REQUEST_UPGRADE,
    TRACKING_SETUP,
    TRACKING_SUB_TITLE,
    TRACKING_UPGRADE_HEADER,
    TRACKING_UPGRADE_REQUEST,
  } = I18N;

  React.useEffect(() => {}, [adminStore]);

  const setStandard = async () => {
    setLicense(LICENSE.STANDARD);
    const model = { license: LICENSE.STANDARD };
    const result = await adminService.updateLicenseSettings(model);
    if (result) {
      await authStore.getTrackingSettings();
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const setPremium = async () => {
    setLicense(LICENSE.PREMIUM);
    const model = { license: LICENSE.PREMIUM };
    const result = await adminService.updateLicenseSettings(model);
    if (result) {
      await authStore.getTrackingSettings();
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleShowLicense = () => {
    setShowToolTip(false);
    setShowLicense(true);
  };

  const handleCloseLicense = () => {
    setShowLicense(false);
    setComplete(false);
  };

  const handleUpdateSettings = async () => {
    const model = {
      license: license,
      displayOn: displayOn,
      blackBoxType: blackBoxType,
    };
    const result = await adminService.updateLicenseSettings(model);
    if (result) {
      await authStore.getTrackingSettings();
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const changeBlackBoxType = (type: BLACK_BOX_TYPE) => {
    const data = blackBoxType;
    if (!data.includes(type)) {
      data.push(type);
    } else {
      const index = data.indexOf(type);
      if (index > -1) {
        data.splice(index, 1);
      }
    }
    setBlackBoxType(data);
  };

  const changeDisplayOn = (type: DISPLAY_ON) => {
    const data = displayOn;
    if (!data.includes(type)) {
      data.push(type);
    } else {
      const index = data.indexOf(type);
      if (index > -1) {
        data.splice(index, 1);
      }
    }
    setDisplayOn(data);
  };

  const submitLicense = async (values: LicenseMail) => {
    const result = await adminService.requestLicense(values);
    if (result.data?.success) {
      setComplete(true);
    }
  };

  React.useEffect(() => {
    setLicense(authStore.license);
  }, [authStore, authStore.loggedUser, authStore.license]);

  React.useEffect(() => {
    setBlackBoxType(authStore.blackBoxType);
    setDisplayOn(authStore.displayOn);
  }, [authStore.displayOn, authStore.blackBoxType]);

  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <AdminWrapper>
          <Container fluid>
            {displayOn && (
              <>
                <Row>
                  <Col>
                    <Form.Check
                      inline
                      type="radio"
                      onChange={setStandard}
                      label={t(PRICE_QUOTATION_STANDARD_LICENSE)}
                      checked={authStore.license === LICENSE.STANDARD}
                      name="license"
                      id="standardLicense"
                      disabled={
                        authStore.loggedUser?.userType !==
                        ACCOUNT_ROLE.SUPERADMIN
                      }
                    />
                    <OverlayTrigger
                      key={'bottom'}
                      placement={'bottom'}
                      trigger={'click'}
                      rootClose
                      overlay={
                        <Tooltip
                          id="tooltip-info"
                          className="upgrade-tool-tip"
                          show={showToolTip}
                        >
                          {t(TRACKING_UPGRADE_REQUEST)}
                          <div>
                            <Button
                              variant="primary"
                              onClick={handleShowLicense}
                            >
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
                    <Form.Check
                      inline
                      type="radio"
                      onChange={setPremium}
                      label={t(PRICE_QUOTATION_PREMIUM_LICENSE)}
                      checked={authStore.license === LICENSE.PREMIUM}
                      name="license"
                      id="PremiumLicense"
                      disabled={
                        authStore.loggedUser?.userType !==
                        ACCOUNT_ROLE.SUPERADMIN
                      }
                    />
                  </Col>
                </Row>
                <Container
                  fluid
                  className={'block block-table black-box-type table-smaller '}
                  id="black-box-container"
                >
                  <Row className="black-box-check">
                    <Col xs={12}>
                      <h3 className="block-title">
                        {t(TRACKING_DISPLAY_FROM)}
                      </h3>
                    </Col>
                    <Form.Check
                      className="form-checkbox mb-3"
                      type="checkbox"
                      onChange={() => {
                        changeBlackBoxType(BLACK_BOX_TYPE.DINH_VI_HOP_QUY);
                      }}
                      label={t('TTAS')}
                      checked={
                        blackBoxType.indexOf(BLACK_BOX_TYPE.DINH_VI_HOP_QUY) !==
                        -1
                          ? true
                          : false
                      }
                      name="serviceType1"
                      id="serviceType1"
                      defaultValue="all"
                      disabled={
                        authStore.loggedUser?.userType !==
                          ACCOUNT_ROLE.SUPERADMIN ||
                        authStore.license === LICENSE.STANDARD
                      }
                    />

                    <Form.Check
                      className="form-checkbox mb-3"
                      type="checkbox"
                      onChange={() => {
                        changeBlackBoxType(BLACK_BOX_TYPE.VIETMAP);
                      }}
                      label={t('VIETMAP')}
                      checked={
                        blackBoxType.indexOf(BLACK_BOX_TYPE.VIETMAP) !== -1
                          ? true
                          : false
                      }
                      name="serviceType2"
                      id="serviceType2"
                      disabled={
                        authStore.loggedUser?.userType !==
                          ACCOUNT_ROLE.SUPERADMIN ||
                        authStore.license === LICENSE.STANDARD
                      }
                    />

                    <Form.Check
                      className="form-checkbox mb-3"
                      type="checkbox"
                      onChange={() => {
                        changeBlackBoxType(BLACK_BOX_TYPE.ANTECK);
                      }}
                      label={t('antek')}
                      checked={
                        blackBoxType.indexOf(BLACK_BOX_TYPE.ANTECK) !== -1
                          ? true
                          : false
                      }
                      name="serviceType3"
                      id="serviceType3"
                      disabled={
                        authStore.loggedUser?.userType !==
                          ACCOUNT_ROLE.SUPERADMIN ||
                        authStore.license === LICENSE.STANDARD
                      }
                    />
                  </Row>
                </Container>

                <Container
                  fluid
                  className={'block block-table black-box-type table-smaller'}
                  id="black-box-container"
                >
                  <Row className="black-box-check">
                    <Col xs={12}>
                      <h3 className="block-title">{t(TRACKING_DISPLAY_ON)}</h3>
                    </Col>
                    <Form.Check
                      className="form-checkbox mb-3"
                      type="checkbox"
                      onChange={() => {
                        changeDisplayOn(DISPLAY_ON.TRUCKOWNER);
                      }}
                      label={t(TRACKING_ON_TRUCKOWNER)}
                      checked={
                        displayOn.indexOf(DISPLAY_ON.TRUCKOWNER) !== -1
                          ? true
                          : false
                      }
                      name="truckowner"
                      id="display-Truckowner"
                      disabled={
                        authStore.loggedUser?.userType !==
                          ACCOUNT_ROLE.SUPERADMIN ||
                        authStore.license === LICENSE.STANDARD
                      }
                    />

                    <Form.Check
                      className="form-checkbox mb-3"
                      type="checkbox"
                      onChange={() => {
                        changeDisplayOn(DISPLAY_ON.CUSTOMER);
                      }}
                      label={t(TRACKING_ON_CUSTOMER)}
                      checked={
                        displayOn.indexOf(DISPLAY_ON.CUSTOMER) !== -1
                          ? true
                          : false
                      }
                      name="customer"
                      id="display-customer"
                      disabled={
                        authStore.loggedUser?.userType !==
                          ACCOUNT_ROLE.SUPERADMIN ||
                        authStore.license === LICENSE.STANDARD
                      }
                    />
                  </Row>
                </Container>
                <ButtonGroup className="form-actions">
                  <Button
                    variant={BUTTONVARIANT.PRIMARY}
                    onClick={handleUpdateSettings}
                  >
                    <span>{t(BUTTONS_UPDATE)}</span>
                    <i className="ico ico-update"></i>
                  </Button>
                </ButtonGroup>
                <LicenseModal
                  show={showLicense}
                  handleOk={submitLicense}
                  handleCancel={handleCloseLicense}
                  complete={complete}
                />
              </>
            )}
          </Container>
        </AdminWrapper>
      </React.Suspense>
    </>
  );
};

export default observer(TrackingSettings);
