import { I18N } from '@/modules/lang/i18n.enum';
import i18n from 'i18next';

export const normalizeName = (
  firstName: string,
  lastName: string,
  replace?: string
): string => {
  const name =
    firstName !== undefined
      ? firstName
      : '' + lastName !== undefined
      ? lastName
      : '';
  return name !== '' ? name : replace ?? '';
};

export const getCompanyName = (
  loggedUser: any,
  company: any,
  replace?: string
): string => {
  if (company) {
    return (
      company?.name ??
      normalizeName(loggedUser?.firstName, loggedUser?.lastName, replace) ??
      ''
    );
  }
  return '';
};

export const getDisplayName = (user: any): string => {
  if (user.company) {
    const data = `${user.company?.name} (${
      user.firstName ? user.firstName : user.email
    })`;
    return data;
  }
  return `${user.firstName ? user.firstName : user.email}`;
};

export const sortOptions = (a: any, b: any): any => {
  a = a.label.toLowerCase();
  b = b.label.toLowerCase();
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

export const scrollToElement = (contentId: string) => {
  const elmnt: any = document.getElementById(contentId);
  if (!elmnt) return;
  const y = elmnt.getBoundingClientRect().top + window.scrollY;
  window.scroll({
    top: y,
    behavior: 'smooth',
  });
};

export const checkDeliveryCode = (
  verifiedDelivery: any[],
  skippedDelivery?: boolean
) => {
  if (skippedDelivery) {
    return false;
  }
  if (verifiedDelivery.length < 1) {
    return false;
  }

  for (let i = 0; i < verifiedDelivery.length; i++) {
    if (verifiedDelivery[i] === '1') {
      continue;
    } else {
      return false;
    }
  }
  return true;
};

export const getSendTo = (
  isCustomer: boolean,
  isTruckOwner: boolean,
  isDriver: boolean,
  noti: any
) => {
  let sendTo = '';
  if (isCustomer) {
    sendTo += `${i18n.t(I18N.ADMIN_MENU_CUSTOMER)}${
      noti.customers.length === 1 ? `: ${noti.customers[0].email}` : ''
    }, `;
  }
  if (isTruckOwner) {
    sendTo += `${i18n.t(I18N.ADMIN_MENU_TRUCKOWNER)}${
      noti.truckOwners.length === 1 ? `: ${noti.truckOwners[0].email}` : ''
    }, `;
  }
  if (isDriver) {
    sendTo += `${i18n.t(I18N.ADMIN_MENU_DRIVER)}${
      noti.drivers.length === 1 ? `: ${noti.drivers[0].phoneNumber}` : ''
    }, `;
  }

  sendTo = sendTo.replace(/,\s*$/, '');

  return sendTo;
};
