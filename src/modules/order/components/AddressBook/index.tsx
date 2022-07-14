import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, ButtonGroup, ListGroup, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// import Select from 'react-select';

const SelectPackage = require('react-select');
const Select = SelectPackage.default;
/*
 * Props of Component
 */
interface ComponentProps {
  addresses?: any;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title: string;
  show: boolean;
  handleClose: any;
  customStyles: any;
  field: string;
  initDataBookPickup?: any;
  initDataBookDropoff?: any;
  handleChangeAddressBook?: any;
  openMenu: any;
}

const AddressBook = (props: ComponentProps) => {
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
    field,
    initDataBookPickup,
    initDataBookDropoff,
    handleChangeAddressBook,
    openMenu,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { BUTTONS_CLOSE } = I18N;
  const addressStyle = {
    menu: (provided: any) => ({
      ...provided,
      height: '300px',
    }),
    control: (provided: any) => ({
      ...provided,
      width: '70%',
      margin: 'auto',
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
        data?.company.toLowerCase().includes(search) ||
        data?.locationName.toLowerCase().includes(search)
      ) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };
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
        {title && <Modal.Header>{t(title)}</Modal.Header>}
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>
              <Select
                styles={addressStyle}
                className="address-book-dropdown"
                classNamePrefix="address-book-dropdown"
                options={
                  field === 'pickupAddressText'
                    ? initDataBookPickup
                    : initDataBookDropoff
                }
                name={field}
                onChange={handleChangeAddressBook}
                menuIsOpen={openMenu}
                filterOption={filterOption}
                placeholder="Search"
              />
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

export default observer(AddressBook);
