import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Modal, ListGroup, ButtonGroup, Button } from 'react-bootstrap';
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
  customer?: any;
}

const CustomerAcceptProfilePopup = (props: ComponentProps) => {
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
    customer,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_CLOSE,
    CUSTOMER_NAME,
    CUSTOMER_PHONE,
    CUSTOMER_EMAIL,
    COMPANY_NAME,
    JOB_THANKYOU_MESSAGE,
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
              <span className="item-label">{t(COMPANY_NAME)}</span>
              <span className="item-value">
                {customer?.company?.name ?? '-'}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(CUSTOMER_NAME)}</span>
              <span className="item-value">
                {normalizeName(customer?.firstName, customer?.lastName) &&
                normalizeName(customer?.firstName, customer?.lastName) !== ' '
                  ? normalizeName(customer?.firstName, customer?.lastName)
                  : ' - '}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(CUSTOMER_PHONE)}</span>
              <span className="item-value">{customer?.phoneNumber ?? '-'}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(CUSTOMER_EMAIL)}</span>
              <span className="item-value">{customer?.email}</span>
            </ListGroup.Item>
          </ListGroup>
          {children}
          <Modal.Footer>{t(JOB_THANKYOU_MESSAGE)}</Modal.Footer>
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

export default observer(CustomerAcceptProfilePopup);
