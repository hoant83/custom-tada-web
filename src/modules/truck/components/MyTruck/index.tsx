import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  OverlayTrigger,
  Tooltip,
  ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import TruckFormModal from '@/modules/truck/components/TruckFormModal';
import { TRUCK_TYPE, TRUCK_STATUS } from '@/modules/truck/truck.enum';
import { NewTruckDto } from '@/modules/truck/truck.dto';
import { TruckOwnerAuthenticationStoreContext } from '@/modules/truckowner/authentication.store';
// import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
// import { useHistory } from 'react-router-dom';
// import { TRUCKOWNER_ROUTERS } from '@/modules/truckowner/router.enum';
// import { create } from 'domain';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title: string;
  truckOwnerID: number;
  tooltip: string;
}

const MyDriver = (props: ComponentProps) => {
  // const auth = React.useContext(AuthenticationStoreContext);
  const truckOwnerAuthStore = React.useContext(
    TruckOwnerAuthenticationStoreContext
  );
  // const history = useHistory();

  React.useEffect(() => {
    // const result = truckOwnerAuthStore.getTrucks();
  });
  /*
   * Props of Component
   */
  const { style, className, children, title, truckOwnerID, tooltip } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { TRUCK_PLATE_NO, TRUCK_LOAD, BUTTONS_ADD_MORE } = I18N;

  /*
   * show hide new/edit driver popup
   */
  const [showTruckPopup, setShowTruckPopup] = React.useState<boolean>(false);

  /*
   * set id of row that need to delete
   */
  // const [deleteID, setDeleteID] = React.useState<number>(-1);

  /*
   * set mode is create or update
   */
  const [mode, setMode] = React.useState<string>('create');

  /*
   * set driver info
   */
  const [initTruckInfo, setTruckInfo] = React.useState<NewTruckDto>({
    truckType: TRUCK_TYPE.ALL,
    truckNo: '',
    truckLoad: '',
    status: TRUCK_STATUS.UNVERIFIED,
    certificate: null,
  });

  /*
   * Action of Add more button
   *
   * @param void
   * @return void
   */
  const handleAddMore = () => {
    setShowTruckPopup(true);
    setTruckInfo({
      truckType: TRUCK_TYPE.ALL,
      truckNo: '',
      truckLoad: '',
      status: TRUCK_STATUS.UNVERIFIED,
      certificate: null,
    });
  };

  /*
   * Action of Edit button
   *
   * @param number id
   * @return void
   */
  const handleEdit = (id: number) => {
    setShowTruckPopup(true);
    setMode('update');
    // setDeleteID(id);
    // setDeleteID(1);
    setTruckInfo({
      truckType: TRUCK_TYPE.NORMAL,
      truckNo: '59H2 - 274.39',
      truckLoad: '1 ton',
      status: TRUCK_STATUS.VERIFIED,
      certificate: null,
    });
  };

  /*
   * Action of Delete button
   *
   * @param number id
   * @return void
   */
  const handleDelete = (id: number) => {
    // setDeleteID(id);
  };

  /*
   * Action of close icon on Truck form popup
   * @params: void
   * @return: void
   */
  const handleClose = () => {
    setShowTruckPopup(false);
  };

  /*
   * Action of Create button on Truck form popup
   * @params: NewTruckDto values
   * @return: void
   */
  const handleCreateTruck = async (values: any) => {
    // const createForm = truckOwnerAuthStore.createTruckForm;
    // createForm.truckType = values.truckType;
    // createForm.truckLoad = values.truckLoad;
    // createForm.truckNo = values.truckNo;
    // const result = await truckOwnerAuthStore.addTruck(createForm);
    // if (initTruckInfo.certificate) {
    //   await truckOwnerAuthStore.uploadCertificate(
    //     initTruckInfo.certificate,
    //     result.id
    //   );
    // }
    // setShowTruckPopup(false);
  };

  /*
   * Action of Update button on Truck form popup
   * @params: NewTruckDto values
   * @return: void
   */
  const handleUpdateTruck = (values: any) => {
    // console.log(values);
  };

  /*
   * Action of Delete button on Truck form popup
   * @params: void
   * @return: void
   */
  const handleDeleteTruck = () => {
    // console.log(deleteID);
  };

  /*
   * Action of Upload Driver License
   * @params: any event
   * @return: void
   */
  const handleUploadLicense = (event: any) => {
    const file = event.target.files[0];
    setTruckInfo({
      truckType: TRUCK_TYPE.NORMAL,
      truckNo: '',
      truckLoad: '',
      status: TRUCK_STATUS.UNVERIFIED,
      certificate: file,
    });
  };

  return (
    <>
      <Container
        fluid
        className={`block block-my-driver ${className ? className : ''}`}
        style={style}
      >
        <Row>
          {title && (
            <Col xs={12}>
              <h3 className="block-title">{title}</h3>
            </Col>
          )}
          <Col xs={12} className="block-content">
            <Table responsive="lg">
              <thead>
                <tr>
                  <th>{t(I18N.TRUCK_TYPE)}</th>
                  <th>{t(TRUCK_PLATE_NO)}</th>
                  <th>{t(TRUCK_LOAD)}</th>
                  <th>
                    <span>{t(I18N.TRUCK_STATUS)}</span>
                    {tooltip && (
                      <OverlayTrigger
                        key={'top'}
                        placement={'top'}
                        overlay={
                          <Tooltip id="tooltip-right">{tooltip}</Tooltip>
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
                <tr>
                  <td>Nguyễn Văn BB</td>
                  <td>0903 69 69 69</td>
                  <td>1 ton</td>
                  <td>Verified</td>
                  <td className="col-actions">
                    <Button
                      variant={BUTTONVARIANT.PRIMARY}
                      onClick={() => handleEdit(4)}
                      className="btn-icon"
                      size="lg"
                    >
                      <i className="ico ico-edit"></i>
                    </Button>
                    <Button
                      variant={BUTTONVARIANT.PRIMARY}
                      onClick={() => handleDelete(4)}
                      className="btn-icon"
                      size="lg"
                    >
                      <i className="ico ico-delete"></i>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>Nguyễn Văn AA</td>
                  <td>0903 69 69 69</td>
                  <td>1 ton</td>
                  <td>Verified</td>
                  <td className="col-actions">
                    <Button
                      variant={BUTTONVARIANT.PRIMARY}
                      onClick={() => handleEdit(4)}
                      className="btn-icon"
                      size="lg"
                    >
                      <i className="ico ico-edit"></i>
                    </Button>
                    <Button
                      variant={BUTTONVARIANT.PRIMARY}
                      onClick={() => handleDelete(4)}
                      className="btn-icon"
                      size="lg"
                    >
                      <i className="ico ico-delete"></i>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>Nguyễn Văn AA</td>
                  <td>0903 69 69 69</td>
                  <td>1 ton</td>
                  <td>Verified</td>
                  <td className="col-actions">
                    <Button
                      variant={BUTTONVARIANT.PRIMARY}
                      onClick={() => handleEdit(4)}
                      className="btn-icon"
                      size="lg"
                    >
                      <i className="ico ico-edit"></i>
                    </Button>
                    <Button
                      variant={BUTTONVARIANT.PRIMARY}
                      onClick={() => handleDelete(4)}
                      className="btn-icon"
                      size="lg"
                    >
                      <i className="ico ico-delete"></i>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>Nguyễn Văn AA</td>
                  <td>0903 69 69 69</td>
                  <td>1 ton</td>
                  <td>Verified</td>
                  <td className="col-actions">
                    <Button
                      variant={BUTTONVARIANT.PRIMARY}
                      onClick={() => handleEdit(4)}
                      className="btn-icon"
                      size="lg"
                    >
                      <i className="ico ico-edit"></i>
                    </Button>
                    <Button
                      variant={BUTTONVARIANT.PRIMARY}
                      onClick={() => handleDelete(4)}
                      className="btn-icon"
                      size="lg"
                    >
                      <i className="ico ico-delete"></i>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
            <ButtonGroup className="block-actions">
              <Button variant="primary" onClick={handleAddMore} size="lg">
                <span>{t(BUTTONS_ADD_MORE)}</span>
                <i className="ico ico-o-next"></i>
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        {children}
        <TruckFormModal
          show={showTruckPopup}
          handleClose={handleClose}
          handleCreate={handleCreateTruck}
          handleDelete={handleDeleteTruck}
          handleUpdate={handleUpdateTruck}
          handleUploadLicense={handleUploadLicense}
          mode={mode}
          initialValues={initTruckInfo}
        />
      </Container>
    </>
  );
};

export default observer(MyDriver);
