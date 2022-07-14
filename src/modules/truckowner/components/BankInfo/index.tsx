import { BUTTONVARIANT } from '@/libs/enums/button.enum';
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
  truckOwner?: any;
}

const TruckOwnerBankInfoPopup = (props: ComponentProps) => {
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
    BANK_ACCOUNT_TITLE,
    BANK_NAME,
    BANK_BRANCH,
    BANK_ACCOUNT_NUMBER,
    BANK_ACCOUNT_HOLDER_NAME,
    COMPANY_PLACEHOLDER,
    BUSSINESS_PLACEHOLDER,
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
        {title && <Modal.Header>{t(BANK_ACCOUNT_TITLE)}</Modal.Header>}
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>
              <span className="item-label">{t(COMPANY_PLACEHOLDER)}</span>
              <span className="item-value">
                {truckOwner?.companyName ?? '-'}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(BUSSINESS_PLACEHOLDER)}</span>
              <span className="item-value">
                {truckOwner?.businessLicenseNo ?? '-'}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(BANK_NAME)}</span>
              <span className="item-value">
                {truckOwner?.bankName ?? ' - '}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(BANK_BRANCH)}</span>
              <span className="item-value">
                {truckOwner?.bankBranch ?? '-'}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(BANK_ACCOUNT_HOLDER_NAME)}</span>
              <span className="item-value">
                {truckOwner?.bankAccountHolderName ?? '-'}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="item-label">{t(BANK_ACCOUNT_NUMBER)}</span>
              <span className="item-value">
                {truckOwner?.bankAccountNumber ?? '-'}
              </span>
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

export default observer(TruckOwnerBankInfoPopup);
