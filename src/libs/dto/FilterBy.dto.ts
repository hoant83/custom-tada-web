import { FILTER_TYPE } from '@/libs/enums/filter.enum';

export interface FilterByOptions {
  key: any;
  label: string;
}

export interface FilterByDto {
  key: string;
  label: string;
  type?: FILTER_TYPE;
  options?: FilterByOptions[];
}

export enum FilterKey {
  ALL = 'ALL',
  MULTIPLE = 'MULTIPLE',
}

export interface FilterByDtoV2 {
  key: FilterKey;
  label: string;
}
