import { I18N } from '@/modules/lang/i18n.enum';
import { FilterByDtoV2, FilterKey } from '../dto/FilterBy.dto';

const { SEARCH_ALL, SEARCH_MULTIPLE } = I18N;

export const filtersV2: FilterByDtoV2[] = [
  {
    key: FilterKey.ALL,
    label: SEARCH_ALL,
  },
  {
    key: FilterKey.MULTIPLE,
    label: SEARCH_MULTIPLE,
  },
];
