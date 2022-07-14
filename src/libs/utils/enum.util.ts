export const getKeyNameFromEnum = (
  customEnum: Record<string, unknown>
): string[] => Object.keys(customEnum).filter((key) => !(parseInt(key) >= 0));

export const getObjectFromEnum = (
  customEnum: Record<string, any>
): Record<string, any> => {
  const result: Record<string, any> = {};
  const keys = getKeyNameFromEnum(customEnum);
  keys.forEach((key) => {
    result[key] = customEnum[key];
  });

  return result;
};
