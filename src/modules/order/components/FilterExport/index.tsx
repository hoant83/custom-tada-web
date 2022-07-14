import React from 'react';
import { observer } from 'mobx-react-lite';
import FilterExport from '@/libs/components/FilterExport';
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
  exportingLabel: string;
  exportingTo: ExportingToDto[];
  exportingItems: string[];
  filtered?: boolean;
  handleResetFilter?: any;
}

const OrderFilterExport = (props: ComponentProps) => {
  return (
    <>
      <FilterExport {...props} />
    </>
  );
};

export default observer(OrderFilterExport);
