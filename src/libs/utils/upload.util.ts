import { MAXIMUM_OTHER_DOCUMENT } from '@/modules/account/account.constants';
import { toast } from 'react-toastify';

export const isMaximunOtherDocument = (
  listFile: File[],
  initInfo: Record<string, any>
): boolean => {
  let count = 0;
  if (listFile && listFile.length) {
    count += listFile.length;
  }

  if (initInfo && initInfo.otherDocumentURLs) {
    count += Object.keys(initInfo.otherDocumentURLs).length;
  }

  return count > MAXIMUM_OTHER_DOCUMENT;
};

export const handleDeleteURLOtherDocument = (
  key: string,
  otherDocumentURLs: Record<string, string>,
  callback: Function
): void => {
  if (otherDocumentURLs && otherDocumentURLs.hasOwnProperty(key)) {
    delete otherDocumentURLs[key];
    callback({ ...otherDocumentURLs });
  }
};

export const notifySuccess = (message: string): void => {
  toast.dismiss();
  toast.success(message);
};

export const notifyError = (message: string): void => {
  toast.dismiss();
  toast.error(message);
};
