/* eslint-disable array-callback-return */
import { getSendTo } from '@/libs/utils/normalize.ulti';
import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, ButtonGroup, ListGroup, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { SOURCE } from '../../notification.constants';

interface ComponentProps {
  show: boolean;
  notiData: any;
  handleClose: any;
}
const NotificationDetailModal = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { show, notiData, handleClose } = props;

  const [customers, setCustomers] = React.useState<any[]>([]);

  const [truckOwners, setTruckOwners] = React.useState<any[]>([]);

  const [drivers, setDrivers] = React.useState<any[]>([]);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_CLOSE,
    NOTIFICATION_BODY,
    NOTIFICATION_MANUAL,
    NOTIFICATION_TITLE,
    NOTIFICATION_CREATED_BY,
    NOTIFICATION_SEND_TO,
    NOTIFICATION_SYSTEM,
  } = I18N;

  const dropdownStyle = {
    menu: (provided: any) => ({
      ...provided,
      height: '124px',
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: '103px',
    }),
    control: (provided: any) => ({
      ...provided,
    }),
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      borderTop: '1px solid #F3F3F3',
    }),
  };

  const filterOption = (candidate: any, input: any) => {
    const data = candidate.value;
    const search = input.toLowerCase();
    if (input) {
      if (
        data?.email.toLowerCase().includes(search) ||
        data?.phoneNumber.toLowerCase().includes(search)
      ) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  const filterOptionDrivers = (candidate: any, input: any) => {
    const data = candidate.value;
    const search = input.toLowerCase();
    if (input) {
      if (data?.phoneNumber.toLowerCase().includes(search)) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  React.useEffect(() => {
    if (notiData) {
      const customerData: any[] = [];
      const truckOwnerData: any[] = [];
      const driversData: any[] = [];

      if (notiData?.customers && notiData?.customers.length > 0) {
        notiData.customers.map((u: any) => {
          customerData.push({
            value: u,
            label: (() => {
              return (
                <div style={{ textAlign: 'center' }} className="user-data">
                  <span className="user-name">{`${u.name ?? ''}`}</span>
                  <div>{u.email}</div>
                  <div>{`${u.phoneNumber ?? ''}`}</div>
                </div>
              );
            })(),
            disabled: true,
          });
        });
      }
      if (notiData?.truckOwners && notiData?.truckOwners.length > 0) {
        notiData.truckOwners.map((u: any) => {
          truckOwnerData.push({
            value: u,
            label: (() => {
              return (
                <div style={{ textAlign: 'center' }} className="user-data">
                  <span className="user-name">{`${u.name ?? ''}`}</span>
                  <div>{u.email}</div>
                  <div>{`${u.phoneNumber ?? ''}`}</div>
                </div>
              );
            })(),
            disabled: true,
          });
        });
      }

      if (notiData?.drivers && notiData?.drivers.length > 0) {
        notiData.drivers.map((u: any) => {
          driversData.push({
            value: u,
            label: (() => {
              return (
                <div style={{ textAlign: 'center' }} className="user-data">
                  <span className="user-name">{`${u.name ?? ''}`}</span>
                  <div>{u.email}</div>
                  <div>{`${u.phoneNumber ?? ''}`}</div>
                </div>
              );
            })(),
            disabled: true,
          });
        });
      }
      setCustomers(customerData);
      setTruckOwners(truckOwnerData);
      setDrivers(driversData);
    }
  }, [notiData]);

  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClose()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-custom modal-noti"
      >
        <Modal.Header>{'Noti Info'}</Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>
              <span className="item-label">{'id'}</span>
              <span className="item-value">{notiData.id}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(NOTIFICATION_TITLE)}</span>
              <span className="item-value">{notiData.title}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(NOTIFICATION_BODY)}</span>
              <span className="item-value">{notiData.body}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(NOTIFICATION_CREATED_BY)}</span>
              <span className="item-value">
                {notiData.source === SOURCE.SYSTEM
                  ? t(NOTIFICATION_SYSTEM)
                  : `${t(NOTIFICATION_MANUAL)}: ${
                      notiData.createdByEmail ? notiData.createdByEmail : ''
                    }`}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="send-to">
              <span className="item-label">{t(NOTIFICATION_SEND_TO)}</span>
              <span className="item-value">
                {getSendTo(
                  notiData.sendToCustomer,
                  notiData.sendToTruck,
                  notiData.sendToDriver,
                  notiData
                )}
              </span>
            </ListGroup.Item>
          </ListGroup>
          {notiData.sendToCustomer ? (
            <ListGroup>
              <ListGroup.Item className="send-to">
                <span className="item-label">{'Send to Customers'}</span>
                {customers.length > 0 && (
                  <Select
                    styles={dropdownStyle}
                    className="address-book-dropdown customers"
                    classNamePrefix="address-book-dropdown"
                    options={customers}
                    menuIsOpen={true}
                    filterOption={filterOption}
                    placeholder="Search"
                    isOptionDisabled={(customers) => customers.disabled}
                  />
                )}
              </ListGroup.Item>
            </ListGroup>
          ) : (
            <ListGroup>
              <ListGroup.Item className="send-to-empty">
                <span className="item-label">{'Send to Customers:'}</span>
                <span className="item-value">{'-'}</span>
              </ListGroup.Item>
            </ListGroup>
          )}

          {notiData.sendToTruck ? (
            <ListGroup>
              <ListGroup.Item className="send-to">
                <span className="item-label">{'Send to trucks:'}</span>
                {truckOwners.length > 0 && (
                  <Select
                    styles={dropdownStyle}
                    className="address-book-dropdown truckowners"
                    classNamePrefix="address-book-dropdown"
                    options={truckOwners}
                    menuIsOpen={true}
                    filterOption={filterOption}
                    placeholder="Search"
                    isOptionDisabled={(truckOwners) => truckOwners.disabled}
                  />
                )}
              </ListGroup.Item>
            </ListGroup>
          ) : (
            <ListGroup>
              <ListGroup.Item className="send-to-empty">
                <span className="item-label">{'Send to trucks:'}</span>
                <span className="item-value">{'-'}</span>
              </ListGroup.Item>
            </ListGroup>
          )}

          {notiData.sendToDriver ? (
            <ListGroup>
              <ListGroup.Item className="send-to">
                <span className="item-label">{'Send to drivers:'}</span>
                {drivers.length > 0 && (
                  <Select
                    styles={dropdownStyle}
                    className="address-book-dropdown drivers"
                    classNamePrefix="address-book-dropdown"
                    options={drivers}
                    menuIsOpen={true}
                    filterOption={filterOptionDrivers}
                    placeholder="Search"
                    isOptionDisabled={(drivers) => drivers.disabled}
                  />
                )}
              </ListGroup.Item>
            </ListGroup>
          ) : (
            <ListGroup>
              <ListGroup.Item className="send-to-empty">
                <span className="item-label">{'Send to drivers:'}</span>
                <span className="item-value">{'-'}</span>
              </ListGroup.Item>
            </ListGroup>
          )}
          <ButtonGroup className="block-actions">
            <Button variant="dark" onClick={handleClose}>
              {t(BUTTONS_CLOSE)}
            </Button>
          </ButtonGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default observer(NotificationDetailModal);
