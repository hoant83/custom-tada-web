import React from 'react';
import { observer } from 'mobx-react-lite';
import FilterBy from '@/libs/components/FilterBy';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  label?: string;
  filters: FilterByDto[];
  handleFilter: any;
}

const OrderFilterBy = (props: ComponentProps) => {
  return (
    <>
      <FilterBy {...props} />
    </>
  );
};

export default observer(OrderFilterBy);
