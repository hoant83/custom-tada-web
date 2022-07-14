export const EMAIL_RULE = /^[a-z][a-z0-9_.-]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;

export const NUMBER_REGEXP = /^((-|\+?)([0-9]{1,3}(,?[0-9])*)(\.[0-9]+|\.)?|\.[0-9]+)$/;

export const PHONE_REGEXP =
  process.env.REACT_APP_REGION === 'VN'
    ? /([0,84,+84][0-9]{9,10})\b/
    : NUMBER_REGEXP;
