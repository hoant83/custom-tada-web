import { I18N } from '@/modules/lang/i18n.enum';
import React from 'react';
import { ContextMenu, MenuItem, SubMenu } from 'react-contextmenu';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import './context-menu.scss';

interface ComponentProps {
  onSetRowHeader: any;
  onRowDelete: any;
  onRowInsertAbove: any;
  onRowInsertBelow: any;
  onColumnDelete: any;
  onColumnInsertLeft: any;
  onColumnInsertRight: any;
}

const initAvaileble = {
  rowDel: true,
  rowIns: true,
  colDel: true,
  colIns: true,
};

const ContextMenuGrid = (props: ComponentProps) => {
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    PRICE_QUOTATION_DEL_ROW,
    PRICE_QUOTATION_DEL_COLUMN,
    PRICE_QUOTATION_ADD_ROW,
    PRICE_QUOTATION_ADD_ROW_ABOVE,
    PRICE_QUOTATION_ADD_ROW_BELOW,
    PRICE_QUOTATION_ADD_COLUMN,
    PRICE_QUOTATION_ADD_COLUMN_LEFT,
    PRICE_QUOTATION_ADD_COLUMN_RIGHT,
  } = I18N;

  const [available, setAvailable] = React.useState(initAvaileble);

  const {
    onSetRowHeader,
    onRowDelete,
    onRowInsertAbove,
    onRowInsertBelow,
    onColumnDelete,
    onColumnInsertLeft,
    onColumnInsertRight,
  } = props;

  const handleShow = (e: any) => {
    const data = e.detail?.data || null;
    const avail = { ...initAvaileble };
    if (data) {
      if (data.rowIdx === 0) {
        avail.rowDel = false;
        avail.rowIns = false;
      }
      if (!data.columnIdx) {
        avail.colDel = false;
        avail.colIns = false;
      }
    }
    setAvailable(avail);
  };

  return (
    <>
      {createPortal(
        <ContextMenu id="grid-context-menu" onShow={handleShow}>
          {/* <MenuItem onClick={onSetRowHeader}>Set row as header</MenuItem> */}
          <MenuItem onClick={onRowDelete} disabled={!available.rowDel}>
            {t(PRICE_QUOTATION_DEL_ROW)}
          </MenuItem>
          <MenuItem onClick={onColumnDelete} disabled={!available.colDel}>
            {t(PRICE_QUOTATION_DEL_COLUMN)}
          </MenuItem>
          <SubMenu
            title={`${t(PRICE_QUOTATION_ADD_ROW)}`}
            disabled={!available.rowIns}
          >
            <MenuItem onClick={onRowInsertAbove}>
              {t(PRICE_QUOTATION_ADD_ROW_ABOVE)}
            </MenuItem>
            <MenuItem onClick={onRowInsertBelow}>
              {t(PRICE_QUOTATION_ADD_ROW_BELOW)}
            </MenuItem>
          </SubMenu>
          <SubMenu
            title={`${t(PRICE_QUOTATION_ADD_COLUMN)}`}
            disabled={!available.colIns}
          >
            <MenuItem onClick={onColumnInsertLeft}>
              {t(PRICE_QUOTATION_ADD_COLUMN_LEFT)}
            </MenuItem>
            <MenuItem onClick={onColumnInsertRight}>
              {t(PRICE_QUOTATION_ADD_COLUMN_RIGHT)}
            </MenuItem>
          </SubMenu>
        </ContextMenu>,
        document.body
      )}
    </>
  );
};

export default ContextMenuGrid;
