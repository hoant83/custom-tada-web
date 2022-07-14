/* eslint-disable react-hooks/exhaustive-deps */
import ConfirmModal from '@/libs/components/ConfirmModal';
import Loading from '@/libs/components/Loading';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { LICENSE } from '@/libs/constants/price-quotation';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import LicenseModal from '@/modules/account/components/LicenseModal';
import {
  LicenseMail,
  PriceQuotationListDto,
} from '@/modules/admin-user/admin.dto';
import { ACCOUNT_ROLE } from '@/modules/admin-user/admin.enum';
import adminService from '@/modules/admin-user/admin.service';
import adminStore from '@/modules/admin-user/admin.store';
import PriceQuotationGrid from '@/modules/admin-user/components/PriceQuotationGrid';
import PriceQuotationModal from '@/modules/admin-user/components/PriceQuotationModal';
import { ADMIN_USER_ROUTERS } from '@/modules/admin-user/router.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
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
import { generatePath, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

interface DataType {
  items: any[];
  totals: number;
}

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

const PriceQuotation = () => {
  const history = useHistory();
  const pagingSize = +pageSizeOptions[1];
  const { t } = useTranslation();
  const {
    PRICE_QUOTATION_TITLE,
    PRICE_QUOTATION_STANDARD_LICENSE,
    PRICE_QUOTATION_PREMIUM_LICENSE,
    MESSAGES_CONFIRM_DELETE,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_CONFIRM_PUBLISH,
    MESSAGES_PUBLISH_SUCCESS,
    PRICE_QUOTATION_ADD_NEW,
    MESSAGES_UPDATE_SUCCESS,
    TRACKING_UPGRADE,
    PRICE_QUOTATION_UPGRADE_LICENSE,
    MESSAGES_CONFIRM_UNPUBLISH,
    MESSAGES_UNPUBLISH_SUCCESS,

    PRICING_ON_OFF,
  } = I18N;
  const authStore = React.useContext(AuthenticationStoreContext);

  const [quotationModel, setQuotationModel] = React.useState<any>({
    show: false,
    mode: 'add',
    defaultData: {},
  });
  const [license, setLicense] = React.useState(LICENSE.STANDARD);
  const [selectedQuotation, setSelectedQuotation] = React.useState<number>(0);
  const [criteriaDto, setCriteriaDto] = React.useState<PriceQuotationListDto>({
    skip: 0,
    take: pagingSize,
    orderBy: 'id',
    orderDirection: 'DESC',
  });
  const [data, setData] = React.useState<DataType>({ items: [], totals: 0 });
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = React.useState<
    boolean
  >(false);
  const [showConfirmPublishPopup, setShowConfirmPublishPopup] = React.useState<
    boolean
  >(false);
  const [
    showConfirmUnPublishPopup,
    setShowConfirmUnPublishPopup,
  ] = React.useState<boolean>(false);

  const [showLicense, setShowLicense] = React.useState<boolean>(false);

  const [showToolTip, setShowToolTip] = React.useState<boolean>(false);

  const [complete, setComplete] = React.useState<boolean>(false);
  const handleChangePageItem = (page: number) => {
    setCriteriaDto({
      skip: page > 1 ? (page - 1) * pagingSize : 0,
      take: pagingSize,
      orderBy: 'id',
      orderDirection: 'DESC',
    });
  };

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

  const getPriceQuotationsApi = async () => {
    const data: any = await adminService.getPriceQuotations(criteriaDto);
    setData({
      totals: data.data?.result?.count ? +data.data.result.count : 0,
      items: data.data?.result?.data ? data.data.result.data : [],
    });
  };

  React.useEffect(() => {
    getPriceQuotationsApi();
  }, [criteriaDto]);

  React.useEffect(() => {
    setLicense(authStore.license);
  }, [authStore, authStore.loggedUser, authStore.license]);

  const handleSubmit = (values: any) => {
    if (quotationModel.mode === 'edit') {
      history.push({
        pathname: generatePath(
          ADMIN_USER_ROUTERS.ADMIN_PRICE_QUOTATION_SETUP_EDIT,
          { id: values.id }
        ),
        state: { license, data: values },
      });
    } else {
      history.push({
        pathname: ADMIN_USER_ROUTERS.ADMIN_PRICE_QUOTATION_SETUP_CREATE,
        state: { license, data: values },
      });
    }
  };

  const handleDelete = (quotationId: number) => {
    setSelectedQuotation(quotationId);
    setShowConfirmDeletePopup(true);
  };

  const handleOkDelete = async () => {
    const result: any = await adminService.deletePriceQuotaion(
      selectedQuotation
    );
    if (result.data?.success) {
      getPriceQuotationsApi();
      toast.dismiss();
      toast.success(t(MESSAGES_DELETE_SUCCESS));
      setShowConfirmDeletePopup(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDeletePopup(false);
  };

  const handlePublish = (quotationId: number) => {
    setSelectedQuotation(quotationId);
    setShowConfirmPublishPopup(true);
  };

  const handleUnPublish = (quotationId: number) => {
    setSelectedQuotation(quotationId);
    setShowConfirmUnPublishPopup(true);
  };

  const handleOkPublish = async () => {
    const result: any = await adminService.publishPriceQuotaion(
      selectedQuotation
    );
    if (result.data?.success) {
      getPriceQuotationsApi();
      toast.dismiss();
      toast.success(t(MESSAGES_PUBLISH_SUCCESS));
      setShowConfirmPublishPopup(false);
    }
  };

  const handleOkUnPublish = async () => {
    const result: any = await adminService.unPublishPriceQuotaion(
      selectedQuotation
    );
    if (result.data?.success) {
      getPriceQuotationsApi();
      toast.dismiss();
      toast.success(t(MESSAGES_UNPUBLISH_SUCCESS));
      setShowConfirmUnPublishPopup(false);
    }
  };

  const handleCancelPublish = () => {
    setShowConfirmPublishPopup(false);
  };

  const handleCancelUnPublish = () => {
    setShowConfirmUnPublishPopup(false);
  };

  const handleEdit = (item: any) => {
    const selectedCusOptions = item.customers?.map((item: any) => ({
      label: item.firstName ? item.firstName : item.email,
      value: item.id,
    }));
    setQuotationModel({
      show: true,
      mode: 'edit',
      defaultData: {
        id: item.id,
        name: item?.company
          ? item?.company.name
          : item.name
          ? item.name
          : item.email,
        toCustomers: license === LICENSE.PREMIUM ? selectedCusOptions : [],
      },
    });
  };

  const handleShowLicense = () => {
    setShowToolTip(false);
    setShowLicense(true);
  };

  const handleCloseLicense = () => {
    setShowLicense(false);
    setComplete(false);
  };

  const submitLicense = async (values: LicenseMail) => {
    const result = await adminService.requestLicense(values);
    if (result.data?.success) {
      setComplete(true);
    }
  };

  const [setting, setSetting] = React.useState<boolean>(false);

  const getSetting = React.useCallback(async () => {
    const data = await authStore.getTrackingSettings();
    setSetting(data.enableQuotation);
  }, [authStore]);

  const handleUpdateSetting = async (value: boolean) => {
    const model = {
      enableQuotation: value,
    };
    const result = await adminService.updateLicenseSettings(model);
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
      setTimeout(() => {
        toast.dismiss();
      }, 300);
    }
  };

  React.useEffect(() => {
    getSetting();
  }, []);

  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <AdminWrapper pageTitle={t(PRICE_QUOTATION_TITLE)}>
          <Container fluid>
            <FormControlLabel
              control={
                <IOSSwitch
                  checked={!setting}
                  onChange={() => {
                    setSetting(!setting);
                    handleUpdateSetting(!setting);
                  }}
                  className="form-switch"
                />
              }
              label={t(PRICING_ON_OFF)}
            />
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
                    authStore.loggedUser?.userType !== ACCOUNT_ROLE.SUPERADMIN
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
                      {t(PRICE_QUOTATION_UPGRADE_LICENSE)}
                      <div>
                        <Button variant="primary" onClick={handleShowLicense}>
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
                    authStore.loggedUser?.userType !== ACCOUNT_ROLE.SUPERADMIN
                  }
                />
              </Col>
            </Row>
          </Container>
          <PriceQuotationGrid
            items={data.items}
            totals={data.totals}
            pagingSize={pagingSize}
            handleChangePageItem={handleChangePageItem}
            handleDelete={handleDelete}
            handlePublish={handlePublish}
            handleEdit={handleEdit}
            handleUnPublish={handleUnPublish}
          />
          <Row>
            <Col className="d-flex justify-content-center align-items-center">
              <Button
                variant="primary"
                onClick={() =>
                  setQuotationModel({
                    show: true,
                    mode: 'add',
                    defaultData: {},
                  })
                }
              >
                {t(PRICE_QUOTATION_ADD_NEW)}
                <i className="fas fa-plus-square ml-2"></i>
              </Button>
            </Col>
          </Row>
          <PriceQuotationModal
            show={quotationModel.show}
            handleSubmit={handleSubmit}
            handleClose={() =>
              setQuotationModel({
                show: false,
                mode: 'add',
                defaultData: {},
              })
            }
            license={authStore.license}
            mode={quotationModel.mode}
            defaultData={quotationModel.defaultData}
            handleShowLicense={handleShowLicense}
          />
          <ConfirmModal
            show={showConfirmDeletePopup}
            handleCancel={handleCancelDelete}
            handleOk={handleOkDelete}
          >
            <p>{t(MESSAGES_CONFIRM_DELETE)}</p>
          </ConfirmModal>

          <ConfirmModal
            show={showConfirmPublishPopup}
            handleCancel={handleCancelPublish}
            handleOk={handleOkPublish}
          >
            <p>{t(MESSAGES_CONFIRM_PUBLISH)}</p>
          </ConfirmModal>

          <ConfirmModal
            show={showConfirmUnPublishPopup}
            handleCancel={handleCancelUnPublish}
            handleOk={handleOkUnPublish}
          >
            <p>{t(MESSAGES_CONFIRM_UNPUBLISH)}</p>
          </ConfirmModal>
          <LicenseModal
            show={showLicense}
            handleOk={submitLicense}
            handleCancel={handleCloseLicense}
            complete={complete}
          />
        </AdminWrapper>
      </React.Suspense>
    </>
  );
};

export default observer(PriceQuotation);
