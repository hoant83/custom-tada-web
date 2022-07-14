import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
  ButtonGroup,
} from 'react-bootstrap';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import DriverFormModal from '@/modules/truckowner/components/DriverFormModal';
import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import {
  FilterDriverDto,
  NewDriverDto,
} from '@/modules/truckowner/truckowner.dto';
import { newFormInit } from '@/modules/truckowner/truckowner.constants';
import { IMAGE_TYPE } from '@/modules/truckowner/truckowner.enum';
import { getVerifiedStatus } from '@/modules/account/account.constants';
import { ACTION_MODE } from '@/libs/enums/action.enum';
import { normalizeName } from '@/libs/utils/normalize.ulti';
import ConfirmModal from '@/libs/components/ConfirmModal';
import { toast } from 'react-toastify';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';
import {
  isMaximunOtherDocument,
  notifyError,
  notifySuccess,
} from '@/libs/utils/upload.util';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  tooltip: string;
}

const DriverSection = (props: ComponentProps) => {
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);

  /*
   * Props of Component
   */
  const { style, className, children, title, tooltip = '' } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    DRIVER_NAME,
    DRIVER_PHONE,
    DRIVER_STATUS,
    BUTTONS_ADD_MORE,
    MESSAGES_CONFIRM_DELETE,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_CREATED_SUCCESS,
    MESSAGES_UPDATE_SUCCESS,
    DRIVER_NEW_TITLE,
    DRIVER_EDIT_TITLE,
    MESSAGES_DOCUMENT_SIZE_LIMIT,
  } = I18N;

  /*
   * Set paging size
   */
  const [pagingSize] = React.useState<number>(+pageSizeOptions[1]);

  /*
   * set criteria
   */
  const [criteriaDto, setCriteriaDto] = React.useState<FilterDriverDto>({
    skip: 0,
    take: +pageSizeOptions[1],
  });

  /*
   * Set current Page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /*
   * Set frame Page
   */
  const [currentPageFrame, setCurrentPageFrame] = React.useState<number>(1);

  /*
   * Set total page
   */
  // const totals: number = items.length;
  const maxPage: number = 4;
  const [totalPage, setTotalPage] = React.useState<number>(0);

  /*
   * Handle when changing current page
   *
   * @param number page
   * @return void
   */
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setCurrentPageFrame(Math.ceil(page / maxPage));
    setCriteriaDto({
      skip: page > 1 ? (page - 1) * +pageSizeOptions[1] : 0,
      take: +pageSizeOptions[1],
    });
  };

  /*
   * set mode is create or update
   */
  const [mode, setMode] = React.useState<string>(ACTION_MODE.CREATE);

  /*
   * show hide new/edit driver popup
   */
  const [showDriverPopup, setShowDriverPopup] = React.useState<boolean>(false);

  /*
   * show hide new/edit driver popup
   */
  const [showConfirmPopup, setShowConfirmPopup] = React.useState<boolean>(
    false
  );

  /*
   * set driver info
   */
  const [initDriverInfo, setDriverInfo] = React.useState<NewDriverDto>(
    newFormInit
  );

  /*
   * set id of row that need to delete
   */
  const [deleteID, setDeleteID] = React.useState<number>(-1);

  /*
   * set id of row that need to update
   */
  const [updateID, setUpdateID] = React.useState<number>(-1);

  const [cardFront, setCardFront] = React.useState({
    file: null,
  });

  const [cardBack, setCardBack] = React.useState({
    file: null,
  });

  const [licenseCard, setLicenseCard] = React.useState({
    file: null,
  });

  const [otherDocuments, setOtherDocuments] = React.useState<
    Record<'files', File[]>
  >({
    files: [],
  });

  const [
    disableChooseOtherDocument,
    setDisableChooseOtherDocument,
  ] = React.useState<boolean>(false);

  /*
   * set id of row that need to update
   */
  // const [updatedImages, setUpdateImages] = React.useState<any>(updateImages);

  /*
   * Action of Add more button
   *
   * @param void
   * @return void
   */
  const handleAddMore = () => {
    setDriverInfo(newFormInit);
    setShowDriverPopup(true);
    setMode(ACTION_MODE.CREATE);
  };

  /*
   * Action of Delete button
   *
   * @param number id
   * @return void
   */
  const handleDelete = async (id: number) => {
    setShowConfirmPopup(true);
    setDeleteID(id);
    setMode(ACTION_MODE.DELETE);
  };

  /*
   * Action of Edit button
   *
   * @param number id
   * @return void
   */
  const handleEdit = async (id: number) => {
    const driver = await truckOwnerStore.getDriverByIdByAdmin(id);
    if (driver) {
      setMode(ACTION_MODE.EDIT);
      setDeleteID(id);
      setUpdateID(id);
      setDriverInfo({
        firstName: driver.firstName,
        phoneNumber: driver.phoneNumber,
        cardNo: driver.cardNo,
        ownerId: driver.ownerId,
        idCardFrontImage: driver.cardFrontURL,
        idCardBackImage: driver.cardBackURL,
        driverLicense: driver.licenseURL,
        otherDocumentURLs: driver.otherDocumentURLs,
      });
      setShowDriverPopup(true);
    }
  };

  const handleCloseDriver = () => {
    setShowDriverPopup(false);
    setDisableChooseOtherDocument(false);
  };

  const uploadDriverFiles = async (id: number) => {
    if (cardFront.file) {
      await truckOwnerStore.uploadDriverCardFrontByAdmin(cardFront.file, id);
    }
    if (cardBack.file) {
      await truckOwnerStore.uploadDriverCardBackByAdmin(cardFront.file, id);
    }
    if (licenseCard.file) {
      await truckOwnerStore.uploadDriverLicenseByAdmin(licenseCard.file, id);
    }
    if (otherDocuments.files && otherDocuments.files.length) {
      await truckOwnerStore.uploadTruckOtherDoc(otherDocuments.files, id);
      setOtherDocuments({ files: [] });
    }
    return true;
  };

  const handleSubmitDriver = async (values: any) => {
    truckOwnerStore.setDriverForm(truckOwnerStore.truckOwnerAdmin.id, values);

    if (mode === ACTION_MODE.CREATE) {
      const result = await truckOwnerStore.addDriverByAdmin(
        truckOwnerStore.truckOwnerAdmin.id
      );

      if (result) {
        const data = await uploadDriverFiles(result.id);
        if (data) {
          truckOwnerStore.getDriversByAdmin(
            truckOwnerStore.truckOwnerAdmin.id,
            criteriaDto
          );
        }
        setDriverInfo(newFormInit);
        truckOwnerStore.resetDriverForm();
        toast.dismiss();
        toast.success(t(MESSAGES_CREATED_SUCCESS));
        setShowDriverPopup(false);
      }
    }

    if (mode === ACTION_MODE.EDIT) {
      const result = await uploadDriverFiles(updateID);
      if (result) {
        const data = await truckOwnerStore.updateDriverByAdmin(updateID);
        if (data) {
          setDriverInfo(newFormInit);
          truckOwnerStore.getDriversByAdmin(
            truckOwnerStore.truckOwnerAdmin.id,
            criteriaDto
          );
          truckOwnerStore.resetDriverForm();
          toast.dismiss();
          toast.success(t(MESSAGES_UPDATE_SUCCESS));
          setShowDriverPopup(false);
          setUpdateID(-1);
        }
      }
    }
  };

  const handleDeleteDriver = () => {
    setShowConfirmPopup(true);
    setShowDriverPopup(false);
    setMode(ACTION_MODE.DELETE);
  };

  const handleUploadCardFront = (event: any) => {
    setCardFront({ file: event.target.files[0] });
  };

  const handleUploadCardBack = (event: any) => {
    setCardBack({ file: event.target.files[0] });
  };

  const handleUploadLicense = (event: any) => {
    setLicenseCard({ file: event.target.files[0] });
  };

  const handleUploadMultipleDocument = (event: any) => {
    const listFile: File[] = Object.values(event.target.files);

    if (isMaximunOtherDocument(listFile, initDriverInfo)) {
      setDisableChooseOtherDocument(false);
      notifyError(t(MESSAGES_DOCUMENT_SIZE_LIMIT));
      return;
    }

    setOtherDocuments({ files: listFile });
  };

  const handleDeleteOtherDocument = async (key: string) => {
    const result = await truckOwnerStore.deleteDriverFileByFileId(
      updateID,
      key,
      REFERENCE_TYPE.OTHER_DRIVER_DOCUMENT
    );

    if (result) {
      delete initDriverInfo.otherDocumentURLs?.key;
      setDisableChooseOtherDocument(isMaximunOtherDocument([], initDriverInfo));
      notifySuccess(t(MESSAGES_DELETE_SUCCESS));

      return true;
    }

    return false;
  };

  const handleOk = async () => {
    setShowConfirmPopup(false);
    if (deleteID) {
      const result = await truckOwnerStore.deleteDriverByAdmin(deleteID);
      if (result) {
        setDeleteID(-1);
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
        truckOwnerStore.getDriversByAdmin(
          truckOwnerStore.truckOwnerAdmin.id,
          criteriaDto
        );
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  const handleDeleteImage = async (type: IMAGE_TYPE) => {
    if (type === IMAGE_TYPE.FRONT) {
      const result = truckOwnerStore.deleteDriverFile(
        updateID,
        REFERENCE_TYPE.DRIVER_ID_CARD_FRONT_IMAGE
      );
      if (result) {
        initDriverInfo.idCardFrontImage = '';
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
    if (type === IMAGE_TYPE.BACK) {
      const result = truckOwnerStore.deleteDriverFile(
        updateID,
        REFERENCE_TYPE.DRIVER_ID_CARD_BACK_IMAGE
      );
      if (result) {
        initDriverInfo.idCardBackImage = '';
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
    if (type === IMAGE_TYPE.LICENSE) {
      const result = truckOwnerStore.deleteDriverFile(
        updateID,
        REFERENCE_TYPE.DRIVER_LICENSE
      );
      if (result) {
        initDriverInfo.driverLicense = '';
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
  };

  React.useEffect(() => {
    if (truckOwnerStore.truckOwnerAdmin) {
      truckOwnerStore.getDriversByAdmin(
        truckOwnerStore.truckOwnerAdmin.id,
        criteriaDto
      );
    }
  }, [truckOwnerStore, truckOwnerStore.truckOwnerAdmin, criteriaDto]);

  React.useEffect(() => {
    setTotalPage(
      Math.ceil(truckOwnerStore.totalAdminDrivers / +pageSizeOptions[1])
    );
  }, [truckOwnerStore.totalAdminDrivers]);

  return (
    <>
      {truckOwnerStore.adminDrivers && (
        <Container
          fluid
          className={`block block-table table-smaller ${
            className ? className : ''
          }`}
          style={style}
        >
          <Row>
            {title && (
              <Col xs={12}>
                <h3 className="block-title">{title}</h3>
              </Col>
            )}
            <Col xs={12} className="block-content">
              <Table className="table-wrapper">
                <thead>
                  <tr>
                    <th>{t(DRIVER_NAME)}</th>
                    <th>{t(DRIVER_PHONE)}</th>
                    <th>
                      <span>{t(DRIVER_STATUS)}</span>
                      {tooltip && (
                        <OverlayTrigger
                          key={'top'}
                          placement={'top'}
                          overlay={
                            <Tooltip id="tooltip-info">{tooltip}</Tooltip>
                          }
                        >
                          <div className="tooltip-icon">
                            <span className="ico ico-faq"></span>
                          </div>
                        </OverlayTrigger>
                      )}
                    </th>
                    <th className="col-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {truckOwnerStore.adminDrivers.map(
                    (item: any, index: number) => (
                      <tr key={item.id}>
                        <td data-th={`${t(DRIVER_NAME)}: `}>
                          {normalizeName(item?.firstName, item.lastName)}
                        </td>
                        <td data-th={`${t(DRIVER_PHONE)}: `}>
                          {item.phoneNumber}
                        </td>
                        <td data-th={`${t(DRIVER_STATUS)}: `}>
                          {getVerifiedStatus(t, item.verifiedStatus)}
                        </td>
                        <td className="col-actions">
                          <Button
                            variant={BUTTONVARIANT.PRIMARY}
                            onClick={() => handleEdit(item.id)}
                            className="btn-icon"
                            size="lg"
                          >
                            <i className="ico ico-edit"></i>
                          </Button>
                          <Button
                            variant={BUTTONVARIANT.PRIMARY}
                            onClick={(e) => handleDelete(item.id)}
                            className="btn-icon"
                            size="lg"
                          >
                            <i className="ico ico-delete"></i>
                          </Button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
              {totalPage > 1 && (
                <>
                  <Paging
                    totalPage={totalPage}
                    totals={truckOwnerStore.totalAdminDrivers}
                    currentPageFrame={currentPageFrame}
                    maxPage={maxPage}
                    handleChangePage={handleChangePage}
                    current={currentPage}
                    pageSize={pagingSize}
                  />
                </>
              )}
              <ButtonGroup className="block-actions">
                <Button variant="primary" onClick={handleAddMore}>
                  <span>{t(BUTTONS_ADD_MORE)}</span>
                  <i className="ico ico-plus"></i>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          {children}

          <DriverFormModal
            show={showDriverPopup}
            handleClose={handleCloseDriver}
            handleSubmitDriver={handleSubmitDriver}
            handleDelete={handleDeleteDriver}
            handleUploadCardFront={handleUploadCardFront}
            handleUploadCardBack={handleUploadCardBack}
            handleUploadLicense={handleUploadLicense}
            handleDeleteImage={handleDeleteImage}
            handleUploadMultipleDocument={handleUploadMultipleDocument}
            handleDeleteOtherDocument={handleDeleteOtherDocument}
            mode={mode}
            initialValues={initDriverInfo}
            formTitle={
              mode === ACTION_MODE.EDIT
                ? t(DRIVER_EDIT_TITLE)
                : t(DRIVER_NEW_TITLE)
            }
            disableChooseOtherDocument={disableChooseOtherDocument}
          />
          <ConfirmModal
            show={showConfirmPopup}
            handleCancel={handleCancel}
            handleOk={handleOk}
          >
            <p>{t(MESSAGES_CONFIRM_DELETE)}</p>
          </ConfirmModal>
        </Container>
      )}
    </>
  );
};

export default observer(DriverSection);
