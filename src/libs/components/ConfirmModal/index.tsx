import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  formTitle?: string;
  handleOk: any;
  handleCancel: any;
  show: boolean;
}

const ConfirmModal = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    formTitle,
    handleCancel,
    handleOk,
    show = false,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { MODAL_CONFIRM, BUTTONS_OK, BUTTONS_CANCEL } = I18N;

  return (
    <Modal
      show={show}
      onHide={() => handleCancel()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`modal-custom modal-confirm ${className ? className : ''}`}
      style={style}
    >
      <Modal.Header>{formTitle ? formTitle : t(MODAL_CONFIRM)}</Modal.Header>
      <Modal.Body>
        <div className="modal-content">{children}</div>
        <ButtonGroup className="modal-actions">
          <Button variant="primary" onClick={() => handleOk()}>
            <span>{t(BUTTONS_OK)}</span>
          </Button>
          <Button variant="primary" onClick={() => handleCancel()}>
            <span>{t(BUTTONS_CANCEL)}</span>
          </Button>
        </ButtonGroup>
      </Modal.Body>
    </Modal>
  );
};

export default observer(ConfirmModal);
