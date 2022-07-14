import { LanguageDto } from '@/modules/lang/lang.dto';
import { LANGUAGES } from '@/modules/lang/lang.enum';

export const languages: LanguageDto[] = [
  {
    key: LANGUAGES.EN,
    label: 'English',
    shortLabel: 'EN',
    isShow: true,
  },
  {
    key: LANGUAGES.VI,
    label: 'Tiếng Việt',
    shortLabel: 'VN',
    isShow: true,
  },
  {
    key: LANGUAGES.KR,
    label: '한국어',
    shortLabel: 'KR',
    isShow: false,
  },
  {
    key: LANGUAGES.ID,
    label: 'Bahasa',
    shortLabel: 'ID',
    isShow: false,
  },
];

export const Customerlanguages: LanguageDto[] = [
  {
    key: LANGUAGES.EN,
    label: 'English',
    shortLabel: 'EN',
    isShow: true,
  },
  {
    key: LANGUAGES.VI,
    label: 'Tiếng Việt',
    shortLabel: 'VN',
    isShow: true,
  },
  {
    key: LANGUAGES.KR,
    label: '한국어',
    shortLabel: 'KR',
    isShow: true,
  },
  {
    key: LANGUAGES.ID,
    label: 'Bahasa',
    shortLabel: 'ID',
    isShow: false,
  },
];
