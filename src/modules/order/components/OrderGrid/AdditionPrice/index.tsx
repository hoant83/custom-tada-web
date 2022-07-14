/* eslint-disable array-callback-return */
import { NUMBER_REGEXP } from '@/libs/constants/rules.constants';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import {
  AdditionalPrice,
  additionalPriceOptions,
  getAdditionalPriceOptions,
  InitAdditionalPrice,
} from '@/modules/order/order.constants';
import { ADDITIONAL_PRICE } from '@/modules/order/order.enum';
import { OrderStoreContext } from '@/modules/order/order.store';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';

interface ComponentProps {
  price: any;
  totalPriceStored: any;
  orderId: number;
  handleOrderSummary: any;
  handleActiveRow: any;
  additionalPrices: any[];
  handleSubmit: any;
}

const AdditionPrice = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    price,
    totalPriceStored,
    orderId,
    handleActiveRow,
    handleOrderSummary,
    additionalPrices,
    handleSubmit,
  } = props;
  const [showPriceEdit, setShowPriceEdit] = React.useState<boolean>(false);

  const { t } = useTranslation();
  const {
    BUTTONS_SAVE,
    BUTTONS_CANCEL,
    ORDER_ADJUSTMENT_AMOUNT,
    ORDER_ADDITIONAL_PRICE,
    MESSAGES_DELETE_SUCCESS,
    ORDER_EDIT_PRICE,
    BUTTONS_ADD_MORE,
    ORDER_PROPOSED_PRICE,
    ORDER_COST_TYPE,
    ORDER_ADJUSTMENT_BY_TRUCK,
  } = I18N;

  const orderStore = React.useContext(OrderStoreContext);
  /*
   * Validation
   */
  const schema = yup.object({
    adjustmentAmount: yup.string().matches(NUMBER_REGEXP).required(),
  });

  const [lastIndex, setLastIndex] = React.useState<number>(0);

  const [adjustmentAmount, setAdjustmentAmount] = React.useState<
    number | string
  >('');

  const [totalPrice, setTotalPrice] = React.useState<number>(totalPriceStored);

  const [currentOptionsList, setCurrentOptionsList] = React.useState<
    AdditionalPrice[]
  >([]);

  const handleAddCurrentOptions = (storeAdditionalPrices: any[]) => {
    if (!storeAdditionalPrices.length) {
      const newAdditionalPrice = { ...InitAdditionalPrice };
      newAdditionalPrice.id = lastIndex;
      setLastIndex(lastIndex + 1);
      setCurrentOptionsList([...currentOptionsList, newAdditionalPrice]);
      return;
    }

    const additionalPricesList: any[] = [];
    let cloneLastIndex = lastIndex;
    storeAdditionalPrices.map((p) => {
      if (p.type === ADDITIONAL_PRICE.ADJUSTMENT_AMOUNT) {
        setAdjustmentAmount(p.price);
        return;
      }
      additionalPricesList.push({
        id: cloneLastIndex,
        type: p.type,
        price: p.price,
      });
      cloneLastIndex = cloneLastIndex + 1;
    });
    setLastIndex(cloneLastIndex);
    setCurrentOptionsList([...currentOptionsList, ...additionalPricesList]);
  };

  const handleRemoveCurrentOptions = async (id: number) => {
    const deleteOption = currentOptionsList.find((o) => o.id === id);
    if (!deleteOption) return;
    const result = await orderStore.deleteAdditionalPrice(
      deleteOption?.type,
      totalPrice,
      orderId
    );
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_DELETE_SUCCESS));
      setCurrentOptionsList(currentOptionsList.filter((o) => o.id !== id));
    }
  };

  const handleUpdateAdditionalType = (id: number, type: ADDITIONAL_PRICE) => {
    const clone = [...currentOptionsList];
    const index = currentOptionsList.findIndex((o) => o?.id === id);

    if (index < 0) {
      return;
    }
    clone[index].type = type;
    setCurrentOptionsList(clone);
  };

  const handleUpdateAdditionalPrice = (id: number, price: number) => {
    const clone = [...currentOptionsList];
    const index = currentOptionsList.findIndex((o) => o?.id === id);
    if (index < 0) {
      return;
    }
    clone[index].price = price;

    setCurrentOptionsList(clone);
  };

  React.useEffect(() => {
    const prices = currentOptionsList.map((o) => (o ? o.price ?? 0 : 0));
    setTotalPrice(
      price +
        +adjustmentAmount +
        (!prices.length
          ? 0
          : prices.reduce((x, y) => {
              return x + y;
            }))
    );
  }, [adjustmentAmount, currentOptionsList, price]);

  React.useEffect(() => {
    handleAddCurrentOptions(additionalPrices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateBeforeSubmit = async (values: any) => {
    const additionalType = [
      ADDITIONAL_PRICE.ADJUSTMENT_AMOUNT,
      ...currentOptionsList.filter((x) => x.type !== null).map((o) => o.type),
    ];

    const additionalPrice = [
      adjustmentAmount,
      ...currentOptionsList
        .filter((x) => x.type !== null)
        .map((o) => +(o ? o?.price ?? 0 : 0)),
    ];

    if (additionalType.length === additionalPrice.length) {
      const result = await handleSubmit({
        additionalType,
        additionalPrice: additionalPrice.map((p) => +p),
        totalPrice,
        orderId,
      });

      if (result) {
        setShowPriceEdit(false);
      }
    }
  };

  const handleClose = () => {
    setShowPriceEdit(false);
  };

  return (
    <>
      {!showPriceEdit && (
        <>
          <span
            className="order-price-text"
            style={{ paddingRight: '10px' }}
            onClick={() => {
              handleOrderSummary(orderId);
              handleActiveRow(orderId);
              window.open(
                `${CUSTOMER_ROUTERS.CUSTOMER_ORDER_DETAIL}${orderId}`
              );
            }}
          >
            {totalPrice.toLocaleString()}
          </span>
          <Button
            className="button-edit"
            onClick={() => {
              setShowPriceEdit(true);
            }}
          >
            <i className="fas fa-edit"></i>
          </Button>
        </>
      )}
      {showPriceEdit && (
        <>
          <Modal show={showPriceEdit} onHide={() => handleClose()} centered>
            <Modal.Header>{t(ORDER_EDIT_PRICE)}</Modal.Header>
            <Modal.Body>
              <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                  handleCreateBeforeSubmit(values);
                }}
                initialValues={{
                  adjustmentAmount,
                  price,
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  errors,
                }) => (
                  <Form
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <Row className="item-center">
                      <Col xs={12} xl={6}>
                        <span className="item-bold-large">
                          {t(ORDER_PROPOSED_PRICE)}
                        </span>
                      </Col>
                      <Col xs={12} xl={6}>
                        <span style={{ fontSize: '16px' }}>
                          {values.price.toLocaleString()}
                        </span>
                      </Col>
                    </Row>
                    <Col className="item-center item-bold">
                      <span style={{ lineHeight: '80px' }}>
                        {t(ORDER_ADDITIONAL_PRICE)}
                      </span>
                    </Col>
                    <Form.Group className="unset-after">
                      <Row>
                        <Col xs={12} xl={6}>
                          <Dropdown
                            className="block-filters item-center form-label-required"
                            style={{
                              marginLeft: '25px',
                            }}
                          >
                            <Dropdown.Toggle
                              className="block-filters"
                              style={{
                                fontSize: '14px',
                              }}
                            >
                              <span>{t(ORDER_ADJUSTMENT_AMOUNT)}</span>
                            </Dropdown.Toggle>
                          </Dropdown>
                          <small
                            style={{ marginLeft: '25px', paddingLeft: '20px' }}
                          >
                            {t(ORDER_ADJUSTMENT_BY_TRUCK)}
                          </small>
                        </Col>
                        <Col xs={12} xl={4}>
                          <Form.Control
                            type="text"
                            name="adjustmentAmount"
                            value={values.adjustmentAmount}
                            onChange={(event) => {
                              setAdjustmentAmount(+event.target.value);
                              handleChange(event);
                            }}
                            isInvalid={!!errors.adjustmentAmount}
                            style={{ width: '160px', marginLeft: '25px' }}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                    {currentOptionsList.map((p) => (
                      <Form.Group className="unset-after">
                        <Row>
                          <Button
                            onClick={() => {
                              handleRemoveCurrentOptions(p.id);
                            }}
                            className="btn-icon"
                            size="sm"
                          >
                            <i
                              className="ico ico-delete"
                              style={{ top: '0px' }}
                            ></i>
                          </Button>
                          <Col xs={12} xl={6}>
                            <Dropdown className="block-filters item-center">
                              <Dropdown.Toggle
                                className="block-filters item-center"
                                style={{ fontSize: '14px' }}
                              >
                                {p?.type
                                  ? getAdditionalPriceOptions(t, p.type)
                                  : t(ORDER_COST_TYPE)}
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="block-filters">
                                {additionalPriceOptions.map((e) => (
                                  <Dropdown.Item
                                    onClick={() => {
                                      handleUpdateAdditionalType(p.id, e.key);
                                    }}
                                    // key={`export-action-${index}`}
                                    style={{ fontSize: '14px' }}
                                  >
                                    {t(e.label)}
                                  </Dropdown.Item>
                                ))}
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>

                          <Col xs={12} xl={4}>
                            <Form.Control
                              type="text"
                              value={p?.price ?? ''}
                              onChange={(event) => {
                                handleUpdateAdditionalPrice(
                                  p.id,
                                  +event.target.value
                                );
                              }}
                              // isInvalid={!p?.price}
                              style={{ width: '160px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {/* {errors.email} */}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </Form.Group>
                    ))}

                    <Row>
                      <Col className="item-center">
                        <span
                          onClick={() => {
                            handleAddCurrentOptions([]);
                          }}
                          style={{ color: 'deepSkyBlue' }}
                        >
                          <u>{t(BUTTONS_ADD_MORE)}</u>
                        </span>
                      </Col>
                    </Row>
                    <Row className="item-right" style={{ lineHeight: '80px' }}>
                      <Col xs={12} xl={7}>
                        <span className="item-bold-large">{'Total'}</span>
                      </Col>
                      <span style={{ fontSize: '16px' }}>
                        {totalPrice.toLocaleString()}
                      </span>
                    </Row>
                    <ButtonGroup className="form-actions item-center">
                      <Button onClick={handleClose}>
                        <span>{t(BUTTONS_CANCEL)}</span>
                      </Button>
                      <Button variant="primary" type="submit">
                        <span>{t(BUTTONS_SAVE)}</span>
                      </Button>
                    </ButtonGroup>
                  </Form>
                )}
              </Formik>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default observer(AdditionPrice);
