import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Modal, ListGroup, ButtonGroup, Button } from 'react-bootstrap';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';

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
  order?: any;
}

const SecretCodePopup = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { style, className, children, title, show, handleClose, order } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_CLOSE,
    ORDER_PICKUP_CODE_LABEL,
    ORDER_DELIVERY_CODE_LABEL,
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
              <span className="item-label">{t(ORDER_PICKUP_CODE_LABEL)}</span>
              <span className="item-value">{order?.pickupCode ?? '-'}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(ORDER_DELIVERY_CODE_LABEL)}</span>
              <span className="item-value">{order?.deliveryCode ?? '-'}</span>
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

export default observer(SecretCodePopup);
