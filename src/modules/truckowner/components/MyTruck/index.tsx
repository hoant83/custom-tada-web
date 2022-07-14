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
import TruckFormModal from '@/modules/truckowner/components/TruckFormModal';
import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import {
  FilterDriverDto,
  NewTruckDto,
} from '@/modules/truckowner/truckowner.dto';
import { newTruckFormInit } from '@/modules/truckowner/truckowner.constants';
import { ACTION_MODE } from '@/libs/enums/action.enum';
import {
  getTruckServiceType,
  getTruckStatus,
} from '@/modules/truckowner/truckowner.util';
import ConfirmModal from '@/libs/components/ConfirmModal';
import { toast } from 'react-toastify';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';
import { IMAGE_TYPE } from '../../truckowner.enum';
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

const MyTruck = (props: ComponentProps) => {
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);

  /*
   * Props of Component
   */
  const { style, className, children, title, tooltip = '' } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    TRUCK_NEW_TITLE,
    TRUCK_EDIT_TITLE,
    TRUCK_TYPE,
    TRUCK_PLATE_NO,
    TRUCK_LOAD,
    TRUCK_STATUS,
    BUTTONS_ADD_MORE,
    MESSAGES_CONFIRM_DELETE,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_CREATED_SUCCESS,
    MESSAGES_UPDATE_SUCCESS,
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
  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  /*
   * show hide new/edit driver popup
   */
  const [showConfirmPopup, setShowConfirmPopup] = React.useState<boolean>(
    false
  );

  /*
   * set driver info
   */
  const [initInfo, setInfo] = React.useState<NewTruckDto>(newTruckFormInit);

  /*
   * set id of row that need to delete
   */
  const [deleteID, setDeleteID] = React.useState<number>(-1);

  /*
   * set id of row that need to update
   */
  const [updateID, setUpdateID] = React.useState<number>(-1);

  const [certificate, setCertificate] = React.useState({
    file: null,
  });

  const [otherDocuments, setOtherDocuments] = React.useState<
    Record<'files', File[]>
  >({
    files: [],
  });

  const [
    disableChooseOtherDocumentument,
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
    setInfo(newTruckFormInit);
    setShowPopup(true);
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
    const truck = await truckOwnerStore.getTruckById(id);
    if (truck) {
      setMode(ACTION_MODE.EDIT);
      setDeleteID(id);
      setUpdateID(id);
      setInfo({
        truckNo: truck.truckNo,
        truckLoad: truck.truckLoad,
        truckType: truck.truckType,
        certificateURL: truck.certificateURL,
        otherDocumentURLs: truck.otherDocumentURLs,
      });
      setShowPopup(true);
    }
  };

  const handleCloseDriver = () => {
    setDisableChooseOtherDocument(false);
    setShowPopup(false);
  };

  const uploadFiles = async (id: number) => {
    if (certificate.file) {
      await truckOwnerStore.uploadCertificate(certificate.file, id);
    }

    if (otherDocuments.files && otherDocuments.files.length) {
      await truckOwnerStore.uploadTruckOtherDoc(otherDocuments.files, id);
      setOtherDocuments({ files: [] });
    }
    return true;
  };

  const handleSubmit = async (values: any) => {
    truckOwnerStore.setTruckForm(values);
    if (mode === ACTION_MODE.CREATE) {
      const result = await truckOwnerStore.addTruck();
      if (result) {
        const data = await uploadFiles(result.id);
        if (data) {
          truckOwnerStore.getTrucks(criteriaDto);
        }
        setInfo(newTruckFormInit);
        truckOwnerStore.resetTruckForm();
        toast.dismiss();
        toast.success(t(MESSAGES_CREATED_SUCCESS));
        setShowPopup(false);
      }
    }
    if (mode === ACTION_MODE.EDIT) {
      const result = await uploadFiles(updateID);
      if (result) {
        const data = await truckOwnerStore.updateTruck(updateID);
        if (data) {
          setInfo(newTruckFormInit);
          truckOwnerStore.getTrucks(criteriaDto);
          truckOwnerStore.resetTruckForm();
          toast.dismiss();
          toast.success(t(MESSAGES_UPDATE_SUCCESS));
          setShowPopup(false);
          setUpdateID(-1);
        }
      }
    }
  };

  const handleDeleteDriver = () => {
    setShowConfirmPopup(true);
    setShowPopup(false);
    setMode(ACTION_MODE.DELETE);
  };

  const handleUploadCetificate = (event: any) => {
    setCertificate({ file: event.target.files[0] });
  };

  const handleUploadMultipleDocument = (event: any) => {
    const listFile: File[] = Object.values(event.target.files);

    if (isMaximunOtherDocument(listFile, initInfo)) {
      setDisableChooseOtherDocument(false);
      notifyError(t(MESSAGES_DOCUMENT_SIZE_LIMIT));
      return;
    }

    setOtherDocuments({ files: listFile });
  };

  const handleOk = async () => {
    setShowConfirmPopup(false);
    if (deleteID) {
      const result = await truckOwnerStore.deleteTruck(deleteID);
      if (result) {
        setDeleteID(-1);
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
        truckOwnerStore.getTrucks(criteriaDto);
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  const handleDeleteImage = async (type: IMAGE_TYPE) => {
    if (type === IMAGE_TYPE.CERTIFICATE) {
      const result = truckOwnerStore.deleteTruckFile(
        updateID,
        REFERENCE_TYPE.TRUCK_CERTIFICATE
      );
      if (result) {
        initInfo.certificateURL = '';
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
  };

  const handleDeleteOtherDocument = async (key: string) => {
    const result = await truckOwnerStore.deleteTruckFileByFileId(
      updateID,
      key,
      REFERENCE_TYPE.OTHER_TRUCK_DOCUMENT
    );

    if (result) {
      delete initInfo.otherDocumentURLs?.key;
      setDisableChooseOtherDocument(isMaximunOtherDocument([], initInfo));
      notifySuccess(t(MESSAGES_DELETE_SUCCESS));

      return true;
    }

    return false;
  };

  React.useEffect(() => {
    truckOwnerStore.getTrucks(criteriaDto);
  }, [authStore.loggedUser, truckOwnerStore, criteriaDto]);

  React.useEffect(() => {
    setTotalPage(Math.ceil(truckOwnerStore.totalTrucks / +pageSizeOptions[1]));
  }, [truckOwnerStore.totalTrucks]);

  return (
    <>
      {truckOwnerStore.myTrucks && (
        <Container
          fluid
          className={`block block-table table-smaller my-truck ${
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
                    <th>{t(TRUCK_TYPE)}</th>
                    <th>{t(TRUCK_PLATE_NO)}</th>
                    <th>{t(TRUCK_LOAD)}</th>
                    <th>
                      <span>{t(TRUCK_STATUS)}</span>
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
                  {truckOwnerStore.myTrucks.map((item: any, index: number) => (
                    <tr key={item.id}>
                      <td data-th={`${t(TRUCK_TYPE)}: `}>
                        {getTruckServiceType(t, item.truckType)}
                      </td>
                      <td data-th={`${t(TRUCK_PLATE_NO)}: `}>{item.truckNo}</td>
                      <td data-th={`${t(TRUCK_LOAD)}: `}>{item.truckLoad}</td>
                      <td data-th={`${t(TRUCK_STATUS)}: `}>
                        {getTruckStatus(t, item.truckStatus)}
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
                  ))}
                </tbody>
              </Table>
              {totalPage > 1 && (
                <>
                  <Paging
                    totalPage={totalPage}
                    totals={truckOwnerStore.totalTrucks}
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

          <TruckFormModal
            show={showPopup}
            handleClose={handleCloseDriver}
            handleSubmitTruck={handleSubmit}
            handleDelete={handleDeleteDriver}
            handleUploadCetificate={handleUploadCetificate}
            handleDeleteImage={handleDeleteImage}
            handleUploadMultipleDocument={handleUploadMultipleDocument}
            handleDeleteOtherDocument={handleDeleteOtherDocument}
            mode={mode}
            initialValues={initInfo}
            formTitle={
              mode === ACTION_MODE.EDIT
                ? t(TRUCK_EDIT_TITLE)
                : t(TRUCK_NEW_TITLE)
            }
            disableChooseOtherDocument={disableChooseOtherDocumentument}
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

export default observer(MyTruck);
