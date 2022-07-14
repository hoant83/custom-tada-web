import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Button, ButtonGroup, Col } from 'react-bootstrap';
import MultiSelect from 'react-multi-select-component';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Formik } from 'formik';
import * as yup from 'yup';
import bsCustomFileInput from 'bs-custom-file-input';

import { AdminStoreContext } from '@/modules/admin-user/admin.store';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  formTitle?: string;
  show: boolean;
  handleClose: any;
  handleAssign: any;
  order?: any;
  selectedDriverValues?: any[];
  selectedTruckValues?: any[];
  selectedTruckOwnerValues?: any[];
  handleAssignTruckOwner?: any;
  handleChangeDriver: any;
  handleChangeTruck: any;
}

const AssignAsTruckOwnerForm = (props: ComponentProps) => {
  const adminStore = React.useContext(AdminStoreContext);

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    formTitle = '',
    show,
    handleClose,
    handleAssign,
    selectedDriverValues = [],
    selectedTruckValues = [],
    handleAssignTruckOwner,
    handleChangeDriver,
    handleChangeTruck,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_REQUIRED,
    BUTTONS_ASSIGN_JOB,
    TRUCK_ASSIGN_LABEL,
    DRIVER_ASSIGN_LABEL,
    TRUCKOWNER_ASSIGN_TITLE,
    ACCOUNT_SELECT_ALL,
  } = I18N;

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  /*
   * Validation
   */
  const schema = yup.object({
    order: yup.string().notRequired(),
  });

  const [truckOwnerOptions, setTruckOwnerOptions] = React.useState<any[]>([]);

  const [driverOptions, setDriverOptions] = React.useState<any[]>([]);
  const [selectedDrivers, setSelectedDrivers] = React.useState(
    selectedDriverValues ?? []
  );

  const [truckOptions, setTruckOptions] = React.useState<any[]>([]);
  const [selectedTrucks, setSelectedTrucks] = React.useState(
    selectedTruckValues ?? []
  );

  const [messageDriver, setMessageDriver] = React.useState<string>('');
  const [messageTruck, setMessageTruck] = React.useState<string>('');

  React.useEffect(() => {
    if (adminStore.truckOwners) {
      adminStore.truckOwners.forEach((item: any, index: number) => {
        adminStore.truckOwners[index].label = item.email;
        adminStore.truckOwners[index].value = item.id;
      });

      setTruckOwnerOptions(adminStore.truckOwners);
    }
  }, [adminStore.truckOwners]);

  React.useEffect(() => {
    if (adminStore.truckOwnerDrivers) {
      adminStore.truckOwnerDrivers.forEach((item: any, index: number) => {
        adminStore.truckOwnerDrivers[index].label = item.firstName;
        adminStore.truckOwnerDrivers[index].value = item.id;
      });

      setDriverOptions(adminStore.truckOwnerDrivers);
    }
  }, [adminStore.truckOwnerDrivers]);

  React.useEffect(() => {
    if (adminStore.truckOwnerTrucks) {
      adminStore.truckOwnerTrucks.forEach((item: any, index: number) => {
        adminStore.truckOwnerTrucks[index].label = item.truckNo;
        adminStore.truckOwnerTrucks[index].value = item.id;
      });

      setTruckOptions(adminStore.truckOwnerTrucks);
    }
  }, [adminStore.truckOwnerTrucks]);

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`modal-custom modal-driver ${className ? className : ''}`}
      style={style}
    >
      <Modal.Header>
        {formTitle ? formTitle : t(TRUCKOWNER_ASSIGN_TITLE)}
      </Modal.Header>
      <Modal.Body>
        <Formik
          onSubmit={() => {
            // if (selectedTruckOwners.length < 1) {
            //   setMessageTruckOwner(t(VALIDATE_REQUIRED));
            // }
            if (selectedDrivers.length < 1) {
              setMessageDriver(t(VALIDATE_REQUIRED));
            }
            if (selectedTrucks.length < 1) {
              setMessageTruck(t(VALIDATE_REQUIRED));
            }
            handleAssign();
          }}
          initialValues={{}}
          validationSchema={schema}
        >
          {({ handleSubmit }) => (
            <Form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className={`form form-driver ${className ? className : ''}`}
              style={style}
            >
              {children}

              <Form.Group
                as={Col}
                xs={12}
                controlId="truckowners"
                className="item-center"
              >
                <Form.Control
                  as="select"
                  defaultValue=""
                  onChange={(event) => {
                    handleAssignTruckOwner(event.target.value);
                    setSelectedDrivers([]);
                    setSelectedTrucks([]);
                    setDriverOptions([]);
                    setTruckOptions([]);
                  }}
                >
                  <option>Choose Truck Owner</option>
                  {truckOwnerOptions.map((value, index) => {
                    return (
                      <option key={`truck-owner-${index}`} value={value.key}>
                        {t(value.label)}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group
                as={Col}
                xs={12}
                controlId="drivers"
                className="item-center"
              >
                <MultiSelect
                  options={driverOptions}
                  value={selectedDrivers}
                  onChange={(value: any) => {
                    setSelectedDrivers(value);
                    handleChangeDriver(value);
                    if (value.length < 1) {
                      setMessageDriver(t(VALIDATE_REQUIRED));
                    } else {
                      setMessageDriver('');
                    }
                  }}
                  labelledBy={''}
                  disableSearch={true}
                  overrideStrings={{
                    selectSomeItems: t(DRIVER_ASSIGN_LABEL),
                    allItemsAreSelected: t(ACCOUNT_SELECT_ALL),
                  }}
                  className="multi-select mb-3"
                />
                {messageDriver && (
                  <Form.Control.Feedback
                    type="invalid"
                    className="pb-3 text-left"
                  >
                    {messageDriver}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group
                as={Col}
                xs={12}
                controlId="trucks"
                className="item-center"
              >
                <MultiSelect
                  options={truckOptions}
                  value={selectedTrucks}
                  onChange={(value: any) => {
                    setSelectedTrucks(value);
                    handleChangeTruck(value);
                    if (value.length < 1) {
                      setMessageTruck(t(VALIDATE_REQUIRED));
                    } else {
                      setMessageTruck('');
                    }
                  }}
                  labelledBy={''}
                  disableSearch={true}
                  overrideStrings={{
                    selectSomeItems: t(TRUCK_ASSIGN_LABEL),
                    allItemsAreSelected: t(ACCOUNT_SELECT_ALL),
                  }}
                  className="multi-select mb-3"
                />
                {messageTruck && (
                  <Form.Control.Feedback
                    type="invalid"
                    className="pb-3 text-left"
                  >
                    {messageTruck}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <ButtonGroup className="form-actions item-center">
                <Button variant="dark" type="submit">
                  <span>{t(BUTTONS_ASSIGN_JOB)}</span>
                  <i className="ico ico-o-next"></i>
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default observer(AssignAsTruckOwnerForm);
