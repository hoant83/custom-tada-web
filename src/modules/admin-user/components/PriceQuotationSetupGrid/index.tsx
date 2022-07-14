import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import type { FillEvent, PasteEvent, RowRendererProps } from 'react-data-grid';
import DataGrid, { Row as GridRow, TextEditor } from 'react-data-grid';
import { useTranslation } from 'react-i18next';
import AdditionalNote from './AdditionalNote';
import ContextMenuGrid from './ContextMenuGrid';
import './index.scss';

interface ComponentProps {
  handleSave: any;
  handleClose: any;
  data: any;
}

const RowRenderer = (props: RowRendererProps<any>) => {
  return (
    <ContextMenuTrigger
      id="grid-context-menu"
      collect={() => ({
        rowIdx: props.rowIdx,
        columnIdx: props.selectedCellIdx,
      })}
    >
      <GridRow {...props} />
    </ContextMenuTrigger>
  );
};

const createColumns = () => {
  const columns: any[] = [];
  for (let i = 0; i < 100; i++) {
    columns.push({
      key: `col${i}`,
      width: 200,
      resizable: true,
      editor: TextEditor,
    });
  }
  return columns;
};

const PriceQuotationSetupGrid = (props: ComponentProps) => {
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    PRICE_QUOTATION_FROM,
    PRICE_QUOTATION_TO,
    PRICE_QUOTATION_CURRENCY,
    PRICE_QUOTATION_SAVE,
    PRICE_QUOTATION_CANCEL,
  } = I18N;

  const { handleSave, handleClose, data } = props;

  const createRows = () => {
    const rows: any[] = [
      {
        rowType: 'header',
        col0: t(PRICE_QUOTATION_FROM),
        col1: t(PRICE_QUOTATION_TO),
        col2: 'Cont 20',
        col3: 'Cont 40',
        col4: '<1 ton',
        col5: '1-2 ton',
        col6: '2-3 ton',
        col7: '3-4 ton',
        col8: '4-6 ton',
        col9: '6-8 ton',
        col10: '8-10 ton',
        col11: '10-15 ton',
        col12: '15-20 ton',
        col13: '20-25 ton',
        col14: '25-30 ton',
        col15: '>30 ton',
      },
    ];

    for (let i = 0; i < 99; i++) {
      rows.push({});
    }
    return rows;
  };

  const [columns, setColumns] = React.useState(createColumns());
  const [rows, setRows] = React.useState(createRows());
  const [note, setNote] = React.useState('');
  const [currency, setCurrency] = React.useState('VND');

  React.useEffect(() => {
    if (data?.quotation) {
      const cols = data.quotation.columns.map((item: any) => ({
        ...item,
        editor: TextEditor,
      }));
      setColumns(cols);
      setRows(data.quotation.rows);
    }
    if (data?.note) {
      setNote(data.note);
    }
    if (data?.currency) {
      setCurrency(data.currency);
    }
  }, [data]);

  const handleFill = ({
    columnKey,
    sourceRow,
    targetRow,
  }: FillEvent<any>): any => {
    return {
      ...targetRow,
      [columnKey]: sourceRow[columnKey as keyof any],
    };
  };

  const handlePaste = ({
    sourceColumnKey,
    sourceRow,
    targetColumnKey,
    targetRow,
  }: PasteEvent<any>): any => {
    return {
      ...targetRow,
      [targetColumnKey]: sourceRow[sourceColumnKey as keyof Row],
    };
  };

  const onSetRowHeader = (
    e: React.MouseEvent<HTMLDivElement>,
    { rowIdx }: { rowIdx: number }
  ) => {
    if (rows[rowIdx]) {
      rows[rowIdx] = {
        ...rows[rowIdx],
        rowType: 'header',
      };
      setRows([...rows]);
    }
  };

  const onRowDelete = (
    e: React.MouseEvent<HTMLDivElement>,
    { rowIdx }: { rowIdx: number }
  ) => {
    setRows([...rows.slice(0, rowIdx), ...rows.slice(rowIdx + 1)]);
  };

  const onRowInsertAbove = (
    e: React.MouseEvent<HTMLDivElement>,
    { rowIdx }: { rowIdx: number }
  ) => {
    insertRow(rowIdx);
  };

  const onRowInsertBelow = (
    e: React.MouseEvent<HTMLDivElement>,
    { rowIdx }: { rowIdx: number }
  ) => {
    insertRow(rowIdx + 1);
  };

  const insertRow = (insertRowIdx: number) => {
    const newRow: any = {};

    setRows([
      ...rows.slice(0, insertRowIdx),
      newRow,
      ...rows.slice(insertRowIdx),
    ]);
  };

  const onColumnDelete = (
    e: React.MouseEvent<HTMLDivElement>,
    { columnIdx }: { columnIdx: number }
  ) => {
    const newRows = rows.map((item: any) => {
      const key = columns[columnIdx].key;
      delete item[key];
      return { ...item };
    });
    setRows(newRows);
    setColumns([
      ...columns.slice(0, columnIdx),
      ...columns.slice(columnIdx + 1),
    ]);
  };

  const onRowInsertLeft = (
    e: React.MouseEvent<HTMLDivElement>,
    { columnIdx }: { columnIdx: number }
  ) => {
    insertColumn(columnIdx);
  };

  const onRowInsertRight = (
    e: React.MouseEvent<HTMLDivElement>,
    { columnIdx }: { columnIdx: number }
  ) => {
    insertColumn(columnIdx + 1);
  };

  const insertColumn = (insertColumnIdx: number) => {
    const newCol: any = {
      key: `col${insertColumnIdx}_${new Date().getTime()}`,
      width: 200,
      resizable: true,
      editor: TextEditor,
    };

    setColumns([
      ...columns.slice(0, insertColumnIdx),
      newCol,
      ...columns.slice(insertColumnIdx),
    ]);
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col className="d-flex align-items-center">
          <div className="currency-label mr-4">
            {t(PRICE_QUOTATION_CURRENCY)}
          </div>
          <Form.Control
            className="currency-box"
            onChange={(e: any) => setCurrency(e.target.value)}
            value={currency}
            style={{ maxWidth: '85px' }}
            defaultValue="VND"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={9}>
          <DataGrid
            columns={columns}
            rows={rows}
            onRowsChange={setRows}
            onFill={handleFill}
            onPaste={handlePaste}
            className="fill-grid"
            rowRenderer={RowRenderer}
            headerRowHeight={5}
            rowClass={(row) =>
              row.rowType === 'header' ? 'header-row' : undefined
            }
            style={{ minHeight: '600px' }}
          />
          <ContextMenuGrid
            onSetRowHeader={onSetRowHeader}
            onRowDelete={onRowDelete}
            onRowInsertAbove={onRowInsertAbove}
            onRowInsertBelow={onRowInsertBelow}
            onColumnDelete={onColumnDelete}
            onColumnInsertLeft={onRowInsertLeft}
            onColumnInsertRight={onRowInsertRight}
          />
        </Col>
        <Col lg={3}>
          <AdditionalNote
            handleChange={(e: any) => setNote(e.target.value)}
            value={note}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleClose}>
            {t(PRICE_QUOTATION_CANCEL)}
          </Button>
          <Button
            variant="primary"
            className="ml-4"
            onClick={() => handleSave(columns, rows, note, currency)}
          >
            {t(PRICE_QUOTATION_SAVE)}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default observer(PriceQuotationSetupGrid);
