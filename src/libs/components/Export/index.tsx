import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col } from 'react-bootstrap';
import ExportData from '@/libs/components/ExportData';
import { ExportingToDto } from '@/libs/dto/ExportingTo.dto';
import FilterBy from '@/libs/components/FilterBy';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';
/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  exportingLabel?: string;
  exportingTo?: ExportingToDto[];
  exportingItems?: string[];
  filtered?: boolean;
  handleResetFilter?: any;
  handFilter: any;
  filters: FilterByDto[];
}

const Export = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    exportingLabel,
    exportingTo,
    exportingItems,
    filtered = false,
    handleResetFilter,
    filters,
    handFilter,
  } = props;

  return (
    <>
      <Container
        fluid
        className={`block-filters ${className ? className : ''}`}
        style={style}
      >
        <Row>
          <Col xs={12} xl={10} lg={12}>
            <FilterBy
              handleFilter={handFilter}
              filters={filters}
              filtered={filtered}
              handleResetFilter={handleResetFilter}
            />
          </Col>
          {exportingLabel && exportingTo && (
            <Col xs={12} xl={2} lg={12} md="auto">
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

export default observer(Export);
