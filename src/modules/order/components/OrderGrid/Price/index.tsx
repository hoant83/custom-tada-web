import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-bootstrap';
import { OrderStoreContext } from '@/modules/order/order.store';
import {
  mdiMinusCircleOutline,
  mdiPlusCircleOutline,
  mdiCheckCircleOutline,
  mdiCloseCircleOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';

interface ComponentProps {
  priceRequest: any;
  suggestedPrice: any;
  useSuggestedPrice: any;
  orderId: number;
  handleOrderSummary: any;
  handleActiveRow: any;
}

const Price = (props: ComponentProps) => {
  const orderStore = React.useContext(OrderStoreContext);
  /*
   * Props of Component
   */
  const {
    priceRequest,
    suggestedPrice,
    useSuggestedPrice,
    orderId,
    handleActiveRow,
    handleOrderSummary,
  } = props;
  const [showPriceEdit, setShowPriceEdit] = React.useState<boolean>(false);

  const [price, setPrice] = React.useState<number>(
    useSuggestedPrice ? suggestedPrice : priceRequest
  );

  const handleChangePrice = (event: any) => {
    setPrice(+event.target.value);
  };

  const handleUpdateOrderPrice = async () => {
    await orderStore.updatePrice(price, orderId);
  };

  const handleClickPrice = async (action: string) => {
    switch (action) {
      case 'minus':
        if (+price >= 50000) {
          setPrice(+price - 50000);
        } else {
          setPrice(0);
        }
        break;
      case 'plus':
        setPrice(+price + 50000);
        break;
      case 'update':
        await handleUpdateOrderPrice();
        setShowPriceEdit(false);
        break;
      case 'cancel':
        setShowPriceEdit(false);
        break;
    }
  };

  return (
    <>
      {!showPriceEdit && (
        <>
          <span
            className="order-price-text"
            style={{ paddingRight: '30px' }}
            onClick={() => {
              handleOrderSummary(orderId);
              handleActiveRow(orderId);
              window.open(
                `${CUSTOMER_ROUTERS.CUSTOMER_ORDER_DETAIL}${orderId}`
              );
            }}
          >
            {price && price.toLocaleString()}
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
          <form
            className="price-edit"
            onBlur={() => {
              handleUpdateOrderPrice();
              setShowPriceEdit(false);
            }}
          >
            <div className="price-container">
              <i
                className="ico"
                onClick={() => {
                  handleClickPrice('minus');
                }}
              >
                <Icon path={mdiMinusCircleOutline} size={'20px'} />
              </i>

              <input
                type="text"
                name="priceRequest"
                value={price}
                onChange={handleChangePrice}
              />
              <i
                className="ico"
                onClick={() => {
                  handleClickPrice('plus');
                }}
              >
                <Icon path={mdiPlusCircleOutline} size={'20px'} />
              </i>
            </div>
            <div className="action-container">
              <i
                className="ico"
                onClick={() => {
                  handleClickPrice('cancel');
                }}
              >
                <Icon path={mdiCloseCircleOutline} size={'20px'} color="red" />
              </i>

              <i
                className="ico"
                onClick={() => {
                  handleClickPrice('update');
                }}
              >
                <Icon path={mdiCheckCircleOutline} size={'20px'} />
              </i>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default observer(Price);
