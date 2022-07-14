import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col } from 'react-bootstrap';
import FilterBy from '@/libs/components/FilterBy';
import ExportData from '@/libs/components/ExportData';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';
import { ExportingToDto } from '@/libs/dto/ExportingTo.dto';
/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  filters: FilterByDto[];
  handFilter: any;
  exportingLabel?: string;
  exportingTo?: ExportingToDto[];
  exportingItems?: string[];
  filtered?: boolean;
  handleResetFilter?: any;
}

const FilterExport = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    children,
    filters,
    handFilter,
    exportingLabel,
    exportingTo,
    exportingItems,
    filtered = false,
    handleResetFilter,
  } = props;

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} md={10}>
            <FilterBy
              handleFilter={handFilter}
              filters={filters}
              filtered={filtered}
              handleResetFilter={handleResetFilter}
            />
          </Col>
          {exportingLabel && exportingTo && (
            <Col xs={12} md={2}>
              <ExportData
                label={exportingLabel}
                exportingTo={exportingTo}
                exportingItems={exportingItems}
              />
            </Col>
          )}
        </Row>
        {children && <Row>{children}</Row>}
      </Container>
    </>
  );
};

export default observer(FilterExport);
