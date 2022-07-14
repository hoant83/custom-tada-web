import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, ButtonGroup, ListGroup, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

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

const InvoiceVATPopup = (props: ComponentProps) => {
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
    DEFAULT_BUSSINESS_PLACEHOLDER,
    COMPANY_NAME,
    COMPANY_ADDRESS,
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
              <span className="item-value">{order?.companyName ?? '-'}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">
                {t(DEFAULT_BUSSINESS_PLACEHOLDER)}
              </span>
              <span className="item-value">
                {order?.bussinessLicenseNO ?? '-'}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(COMPANY_ADDRESS)}</span>
              <span className="item-value">{order?.address ?? '-'}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t('Email')}</span>
              <span className="item-value">{order?.email ?? '-'}</span>
            </ListGroup.Item>
          </ListGroup>
          {children}
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

export default observer(InvoiceVATPopup);
