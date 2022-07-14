import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { ORDER_TYPE, ACTIONS_MODE } from '@/modules/order/order.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  orderType?: ORDER_TYPE;
  handleOrderType?: any;
  handleCloneAction: any;
  mode?: string;
  handleOpenMultipleOrder?: any;
}

const SwitchOrder = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    children,
    className,
    style,
    orderType,
    handleOrderType,
    handleCloneAction,
    mode = ACTIONS_MODE.CREATE,
    handleOpenMultipleOrder,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_ORDERTYPE_STANDARD,
    ORDER_ORDERTYPE_STANDARDNOTE,
    ORDER_ORDERTYPE_QUICK,
    ORDER_ORDERTYPE_QUICKNOTE,
    ORDER_CLONE,
    ORDER_CLONENOTE,
    PLACEHOLDER_CLONE_INPUT,

    IMPORT_LABEL,
    IMPORT_FROM_EXCEL,
  } = I18N;

  const [orderClone, setOrderClone] = React.useState<string>('');

  return (
    <>
      <div
        className={`block-selected-order ${
          mode === ACTIONS_MODE.EDIT ? 'block-edit' : ''
        } ${className ? className : ''}`}
        style={style}
      >
        {mode === ACTIONS_MODE.CREATE && (
          <>
            <div
              className={`item ${
                orderType === ORDER_TYPE.STANDARD ? 'active' : ''
              }`}
              onClick={() => handleOrderType(ORDER_TYPE.STANDARD)}
            >
              <i className="ico ico-standard"></i>
              <div className="box">
                <h4 className="item-title">{t(ORDER_ORDERTYPE_STANDARD)}</h4>
                <span className="item-subtitle">
                  {t(ORDER_ORDERTYPE_STANDARDNOTE)}
                </span>
              </div>
            </div>
            <div
              className={`item ${
                orderType === ORDER_TYPE.QUICK ? 'active' : ''
              }`}
              onClick={() => handleOrderType(ORDER_TYPE.QUICK)}
            >
              <i className="ico ico-quick"></i>
              <div className="box">
                <h4 className="item-title">{t(ORDER_ORDERTYPE_QUICK)}</h4>
                <span className="item-subtitle">
                  {t(ORDER_ORDERTYPE_QUICKNOTE)}
                </span>
              </div>
            </div>
          </>
        )}
        {mode === ACTIONS_MODE.EDIT && (
          <div
            className="item active"
            onClick={() => handleOrderType(orderType)}
          >
            <i
              className={`ico ${
                orderType === ORDER_TYPE.STANDARD ? 'ico-standard' : 'ico-quick'
              }`}
            ></i>
            <div className="box">
              <h4 className="item-title">
                {orderType === ORDER_TYPE.STANDARD
                  ? t(ORDER_ORDERTYPE_STANDARD)
                  : t(ORDER_ORDERTYPE_QUICK)}
              </h4>
              <span className="item-subtitle">
                {orderType === ORDER_TYPE.STANDARD
                  ? t(ORDER_ORDERTYPE_STANDARDNOTE)
                  : t(ORDER_ORDERTYPE_QUICKNOTE)}
              </span>
            </div>
          </div>
        )}
        {mode === ACTIONS_MODE.CREATE && (
          <div className="item clone-item">
            <i className="ico ico-clone"></i>
            <div className="box">
              <h4 className="item-title">{t(ORDER_CLONE)}</h4>
              <span className="item-subtitle">{t(ORDER_CLONENOTE)}</span>
            </div>
            <div className="form-clone">
              <Form.Control
                type="text"
                placeholder={t(PLACEHOLDER_CLONE_INPUT)}
                name="search"
                defaultValue={orderClone}
                onChange={(event: any) => setOrderClone(event?.target.value)}
              />
              <Button onClick={() => handleCloneAction(orderClone)}>
                <i className="ico ico-larrow-next"></i>
              </Button>
            </div>
          </div>
        )}
        {mode === ACTIONS_MODE.CREATE && (
          <div
            className="item multiple-item"
            onClick={() => handleOpenMultipleOrder()}
          >
            <i className="ico ico-clone"></i>
            <div className="box">
              <h4 className="item-title">{t(IMPORT_LABEL)}</h4>
              <span className="item-subtitle">{t(IMPORT_FROM_EXCEL)}</span>
            </div>
          </div>
        )}
      </div>
      {children}
    </>
  );
};

export default observer(SwitchOrder);
