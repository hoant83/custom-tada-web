export const handleCheckConfirmationRule = (
  { getFieldValue }: any,
  fieldCheck: string,
  msgError: string
) => ({
  validator(rule: any, value: any) {
    if (!value || getFieldValue(fieldCheck) === value) {
      return Promise.resolve();
    }

    return Promise.reject(msgError);
  },
});
