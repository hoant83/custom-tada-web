import React from 'react';
import { observer } from 'mobx-react-lite';
import zaloLogo from '@/modules/theme/assets/images/qr.jpg';
import '@/modules/theme/assets/css/sources/_footer.scss';
import { Button, Modal } from 'react-bootstrap';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
}

const ZaloFooter = (props: ComponentProps) => {
  const userStore = React.useContext(AuthenticationStoreContext);
  /*
   * Props of Component
   */
  const { className } = props;
  const [show, setShow] = React.useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ZaloModal = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <img
              src={
                userStore.systemFiles?.qr
                  ? userStore.systemFiles?.qrUrl
                  : zaloLogo
              }
              alt="Logo"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <>
      <div className={`logo-box ${className ? className : ''}`}>
        <div className="footer-info">
          <span onClick={handleShow}>
            <img
              src={
                userStore.systemFiles?.qr
                  ? userStore.systemFiles?.qrUrl
                  : zaloLogo
              }
              alt="Logo"
              className="zalo-modal-img"
            />
          </span>
          <div className="info-text">
            <span>{userStore.settings?.qrLabel ?? 'Tada Viet Nam'}</span>
          </div>
          <ZaloModal />
        </div>
      </div>
    </>
  );
};

export default observer(ZaloFooter);
