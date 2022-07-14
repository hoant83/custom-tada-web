import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Modal, ListGroup, ButtonGroup, Button } from 'react-bootstrap';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { normalizeName } from '@/libs/utils/normalize.ulti';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title: string;
  show: boolean;
  handleClose: any;
  truckOwner?: any;
}

const TruckOwnerProfilePopup = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    show,
    handleClose,
    truckOwner,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_CLOSE,
    ORDER_TRUCKOWNER_COMPANY,
    ORDER_TRUCKOWNER_NAME,
    ORDER_TRUCKOWNER_PHONE,
    ORDER_TRUCKOWNER_EMAIL,
    TRUCKOWNER_PUBLIC_ID,
  } = I18N;

  return (
    <>
      <Modal
        show={show}
        onHide={() => handleClose()}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`modal-custom modal-profile ${className ? className : ''}`}
        style={style}
      >
        {title && <Modal.Header>{title}</Modal.Header>}
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>
              <span className="item-label">{t(TRUCKOWNER_PUBLIC_ID)}</span>
              <span className="item-value">{truckOwner?.publicId ?? '-'}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(ORDER_TRUCKOWNER_COMPANY)}</span>
              <span className="item-value">
                {truckOwner?.company?.name ?? '-'}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(ORDER_TRUCKOWNER_NAME)}</span>
              <span className="item-value">
                {normalizeName(truckOwner?.firstName, truckOwner?.lastName) &&
                normalizeName(truckOwner?.firstName, truckOwner?.lastName) !==
                  ' '
                  ? normalizeName(truckOwner?.firstName, truckOwner?.lastName)
                  : ' - '}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(ORDER_TRUCKOWNER_PHONE)}</span>
              <span className="item-value">
                {truckOwner?.phoneNumber ?? '-'}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(ORDER_TRUCKOWNER_EMAIL)}</span>
              <span className="item-value">{truckOwner?.email ?? '-'}</span>
            </ListGroup.Item>
          </ListGroup>
          {children}
          <ButtonGroup className="block-actions">
            <Button variant={BUTTONVARIANT.PRIMARY} onClick={handleClose}>
              {t(BUTTONS_CLOSE)}
            </Button>
          </ButtonGroup>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default observer(TruckOwnerProfilePopup);
