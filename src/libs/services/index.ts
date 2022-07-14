import axios from 'axios';
import { handleResponseError } from '@/libs/utils/apis.util';
import { removeFromStorage } from '@/libs/utils/storage.util';
import { toast } from 'react-toastify';
import { THEMES, VALIDATE_TOKEN_URL } from '@/theme.enum';
import { Errors } from '@/modules/message/message.constants';
import i18n from 'i18next';
import LogStore from '@/modules/log/log.store';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (!!localStorage.getItem('token')) {
    config.headers.common['Authorization'] =
      'Bearer ' + localStorage.getItem('token');
  }
  config.headers.common['Access-Control-Allow-Origin'] = '*';
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    // Remove all toasts !
    toast.dismiss();

    if (!error.response) {
      toast.error('Unknown error happened! Please contact admin for support');
      LogStore.writeLog(error);
      return handleResponseError(error);
    }

    const { data } = error.response;
    const { detailError } = data;

    let messageDetail = '';
    let messageCode = '';

    if (error.response.status === 403) {
      removeFromStorage('token');
      if (!window.location.pathname.includes('login'))
        window.location.replace('/');
    }

    if (detailError) {
      if (Array.isArray(detailError.message)) {
        messageDetail = detailError.message[0];
        messageCode = detailError?.errorCode ?? '';
      } else {
        messageDetail = detailError.message;
        messageCode = detailError?.errorCode ?? '';
      }
    } else {
      messageDetail = data.message;
      messageCode = data?.errorCode ?? '';
    }

    let validateTokenUrl = VALIDATE_TOKEN_URL.TRUCKOWNER;
    if (process.env.REACT_APP_THEME === THEMES.TADATRUCK) {
      validateTokenUrl = VALIDATE_TOKEN_URL.TADATRUCK;
    }
    if (process.env.REACT_APP_THEME === THEMES.ADMIN) {
      validateTokenUrl = VALIDATE_TOKEN_URL.ADMIN;
    }

    if (error.response.config.url === validateTokenUrl) {
      removeFromStorage('token');
      window.location.replace('/');
    }
    if (messageCode !== '') {
      const error = Errors.find((error) => error.key === messageCode);
      if (error) toast.error(i18n.t(error.label));
      else toast.error(messageDetail);
    } else {
      toast.error(messageDetail);
    }

    if (error.response.status === 400) {
      return data;
    }

    return handleResponseError(error);
  }
);

export default axiosInstance;
