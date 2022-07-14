import React from 'react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Modal, Form, Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import DateTimePicker from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { AdminStoreContext } from '../../admin.store';
import { parseInt } from 'lodash';
import { toast } from 'react-toastify';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import { THEMES } from '@/theme.enum';

/**
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  show: boolean;
  handleClose: any;
  driver: any;
  refetch: any;
}

const EarningSettlementModal = (props: ComponentProps) => {
  /**
   * Store
   */
  const adminStore = React.useContext(AdminStoreContext);
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);

  /**
   * Theme (admin and truckowner)
   */
  const theme = process.env.REACT_APP_THEME;

  /**
   * Props
   */
  const { className, style, show, handleClose, driver, refetch } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    COMMISSION_PAYMENT,
    COMMISSION_PAYMENT_NOTES,
    COMMISSION_AMOUNT,
    COMMISSION_PAID_DATE,
    COMMISSION_PAID_BY,
    COMMISSION_TRANSFER,
    COMMISSION_OTHERS,
    COMMISSION_UPDATE,
    COMMISSION_CASH,
    VALIDATE_REQUIRED,
    VALIDATE_NUMBER,
    MESSAGES_PAID_SUCCESS,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    note: yup.string(),
    amount: yup
      .number()
      .typeError(t(VALIDATE_NUMBER))
      .required(t(VALIDATE_REQUIRED))
      .nullable(),
  });

  /**
   * State storage date paid
   */
  const [date, setDate] = React.useState<Date>(new Date());

  /**
   * State storage paid by type
   */
  const [paidBy, setPaidBy] = React.useState<{
    isCash: boolean;
    isTransfer: boolean;
    isOthers: boolean;
  }>({ isCash: false, isTransfer: false, isOthers: false });

  /**
   * State storage others note
   */
  const [othersNote, setOthersNote] = React.useState<string>('');

  /**
   * Function handle update paid
   */
  const handleUpdate = async (values: any) => {
    values.amount = parseInt(values.amount, 10);
    const data: any = { ...values, date, ...paidBy, othersNote };
    let result = null;
    if (theme === THEMES.ADMIN) {
      result = driver
        ? await adminStore.payDriverEarning(driver.id, data)
        : null;
    } else if (theme === THEMES.TRUCKOWNER) {
      result = driver
        ? await truckOwnerStore.payDriverEarning(driver.id, data)
        : null;
    }

    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_PAID_SUCCESS));
      refetch();
      handleClose();
    }
  };

  /**
   * Function handle change date paid
   */
  const handleChangeDatePaid = (date: Date) => {
    setDate(date);
  };

  /**
   * Function handle change paid by
   */
  const handleChangePaidBy = (type: string) => {
    setPaidBy((prev) => ({
      isCash: false,
      isTransfer: false,
      isOthers: false,
      [type]: true,
    }));
  };

  /**
   * Function handle change others note
   */
  const handleOthersNote = (e: any) => {
    setOthersNote(e.target.value);
  };

  /**
   * Initial value form
   */
  const initialValues = { note: '', amount: null, date: null };

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`modal-custom ${className ? className : ''}`}
      style={style}
    >
      <Modal.Header>{t(COMMISSION_PAYMENT)}</Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            handleUpdate(values);
          }}
          initialValues={initialValues}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
            <Form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className={`form form-driver ${className ? className : ''}`}
              style={style}
            >
              <Form.Group as={Col} xs={12} controlId="drivers" className="">
                <Form.Label>{t('Pay to')}</Form.Label>
                <p>{driver && driver.firstName}</p>
                <p>{driver && driver.phoneNumber}</p>
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="drivers" className="">
                <Form.Label>{t(COMMISSION_PAYMENT_NOTES)}</Form.Label>
                <Form.Control
                  type="text"
                  name="note"
                  onChange={handleChange}
                  isInvalid={!!errors.note}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.note}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="drivers" className="">
                <Form.Label>{t(COMMISSION_AMOUNT)}</Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                  onChange={handleChange}
                  isInvalid={!!errors.amount}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="drivers" className="">
                <Form.Label>{t(COMMISSION_PAID_DATE)}</Form.Label>
                <DateTimePicker
                  dateFormat="DD-MM-YYYY"
                  timeFormat={false}
                  className="fullwidth-datepicker"
                  onChange={handleChangeDatePaid}
                  value={date}
                />
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="drivers" className="">
                <Form.Label>{t(COMMISSION_PAID_BY)}</Form.Label>
                <Row>
                  <Col>
                    <Form.Check
                      inline
                      label={t(COMMISSION_CASH)}
                      name="paidBy"
                      type="radio"
                      id="isCash"
                      onChange={() => handleChangePaidBy('isCash')}
                    />
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label={t(COMMISSION_TRANSFER)}
                      name="paidBy"
                      type="radio"
                      id="isTransfer"
                      onChange={() => handleChangePaidBy('isTransfer')}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={4} style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Check
                      inline
                      label={t(COMMISSION_OTHERS)}
                      name="paidBy"
                      type="radio"
                      id="isOthers"
                      onChange={() => handleChangePaidBy('isOthers')}
                    />
                  </Col>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      name="othersNote"
                      placeholder={t(COMMISSION_OTHERS)}
                      value={othersNote}
                      onChange={(e) => handleOthersNote(e)}
                      // isInvalid={!!errors.percentCommission}
                    />
                    {/* <Form.Control.Feedback type="invalid">
                  {errors.percentCommission}
                </Form.Control.Feedback> */}
                  </Col>
                </Row>
              </Form.Group>
              <ButtonGroup className="form-actions">
                <Button variant="primary" type="submit">
                  <span>{t(COMMISSION_UPDATE)}</span>
                  <i className="ico ico-plus"></i>
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EarningSettlementModal;
