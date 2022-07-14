import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExportingToDto } from '@/libs/dto/ExportingTo.dto';
import Export from '@/libs/components/Export';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  exportingLabel: string;
  exportingTo: ExportingToDto[];
  exportingItems: string[];
  filtered?: boolean;
  handleResetFilter?: any;
  handFilter: any;
  filters: FilterByDto[];
}

const JobsOrderExport = (props: ComponentProps) => {
  return (
    <>
      <Export {...props} />
    </>
  );
};

export default observer(JobsOrderExport);
