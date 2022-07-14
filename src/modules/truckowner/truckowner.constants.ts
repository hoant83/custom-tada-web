import {
  DriverRequestDto,
  NewCompanyRequestDto,
  NewDriverDto,
  NewDriverRequestDto,
  NewTruckDto,
  NewTruckRequestDto,
  UpdateTruckOwnerRequestDto,
  TruckOwnerUpdateFormDto,
  AdminTruckOwnerRequestDto,
  NewBankAccountRequestDto,
} from '@/modules/truckowner/truckowner.dto';
import {
  TRUCK_TYPE,
  VERIFIED_STATUS,
  TRUCK_STATUS,
  USER_STATUS,
} from '@/modules/truckowner/truckowner.enum';
import { I18N } from '@/modules/lang/i18n.enum';

export const newFormInit: NewDriverDto = {
  firstName: '',
  phoneNumber: '',
  cardNo: '',
  ownerId: '',
  idCardFrontImage: null,
  idCardBackImage: null,
  driverLicense: null,
};

export const newTruckFormInit: NewTruckDto = {
  truckNo: '',
  truckLoad: '',
};

export const newRequestInit: NewDriverRequestDto = {
  firstName: '',
  phoneNumber: '',
  cardNo: '',
  ownerId: -1,
};

export const updateRequestInit: DriverRequestDto = {
  firstName: '',
  phoneNumber: '',
  cardNo: '',
  verifiedStatus: VERIFIED_STATUS.PENDING,
  status: USER_STATUS.INACTIVE,
  licenseNo: '',
  email: '',
};

export const newCompanyInit: NewCompanyRequestDto = {
  name: '',
  phone: '',
  address: '',
  licenseNo: '',
};

export const newTruckInit: NewTruckRequestDto = {
  truckNo: '',
  truckLoad: '',
  truckType: TRUCK_TYPE.TRAILOR_TRACTOR_TRUCK,
};

// Init data of bank account
export const newBankAccountInit: NewBankAccountRequestDto = {
  companyName: '',
  businessLicenseNo: '',
  bankName: '',
  bankBranch: '',
  bankAccountHolderName: '',
  bankAccountNumber: '',
};

export const newTruckOwnerInit: UpdateTruckOwnerRequestDto = {
  // phoneNumber: '',
  // email: '',
  // firstName: '',
  // lastName: '',
  // password: '',
  // cardNo: '',
};

export const updateImages: any = {
  idCardFrontImage: null,
  idCardBackImage: null,
  driverLicense: null,
};

export const TruckService = [
  {
    key: TRUCK_TYPE.ALL,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_ALL,
  },
  {
    key: TRUCK_TYPE.TRAILOR_TRACTOR_TRUCK,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_TRAILORTRACTOR,
  },
  {
    key: TRUCK_TYPE.NORMAL_TRUCK_VAN,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_NORMAL,
  },
  {
    key: TRUCK_TYPE.NON_MOTORIZED_VEHICLE,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_NON_MOTORIZED,
  },
  {
    key: TRUCK_TYPE.CONCATENATED_GOODS,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_CONCATENATED_GOODS,
  },
  {
    key: TRUCK_TYPE.CONTRACT_CAR,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_CONTRACT_CAR,
  },
];

export const TruckType = [
  {
    key: '',
    label: '',
  },
  {
    key: TRUCK_TYPE.TRAILOR_TRACTOR_TRUCK,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_TRAILORTRACTOR,
  },
  {
    key: TRUCK_TYPE.NORMAL_TRUCK_VAN,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_NORMAL,
  },
  {
    key: TRUCK_TYPE.NON_MOTORIZED_VEHICLE,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_NON_MOTORIZED,
  },
  {
    key: TRUCK_TYPE.CONCATENATED_GOODS,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_CONCATENATED_GOODS,
  },
  {
    key: TRUCK_TYPE.CONTRACT_CAR,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_CONTRACT_CAR,
  },
];

export const getTruckService = (key: TRUCK_TYPE) => {
  return TruckService.find((item) => item.key === key)?.label;
};

export const VerifiedStatus = [
  {
    key: VERIFIED_STATUS.UNVERIFIED,
    label: I18N.STATUS_UNVERIFIED,
  },
  {
    key: VERIFIED_STATUS.PENDING,
    label: I18N.STATUS_PENDING,
  },
  {
    key: VERIFIED_STATUS.VERIFIED,
    label: I18N.STATUS_VERIFIED,
  },
];

export const TruckStatus = [
  {
    key: TRUCK_STATUS.UNVERIFIED,
    label: I18N.STATUS_UNVERIFIED,
  },
  {
    key: TRUCK_STATUS.PENDING,
    label: I18N.STATUS_PENDING,
  },
  {
    key: TRUCK_STATUS.VERIFIED,
    label: I18N.STATUS_VERIFIED,
  },
];

// ------------------------
// Admin
// ------------------------
export const truckOwnerUpdateFormInit: TruckOwnerUpdateFormDto = {
  phoneNumber: '',
  email: '',
  firstName: '',
  lastName: '',
  cardNo: '',
  userStatus: USER_STATUS.INACTIVE,
  verifiedStatus: VERIFIED_STATUS.UNVERIFIED,
};

export const adminTruckOwnerFormInit: AdminTruckOwnerRequestDto = {};
