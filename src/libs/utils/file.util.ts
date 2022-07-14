const EXTENTION_IMAGE = ['jpg', 'jpeg', 'png', 'gif'];

export const isImage = (path: string): boolean => {
  const extention = path ? path.split('.').pop() ?? '' : '';

  if (EXTENTION_IMAGE.includes(extention)) {
    return true;
  }

  return false;
};

export const getExtention = (path: string): string => {
  const pieces = path ? path.split('.') ?? [] : [];
  return pieces[pieces.length - 1];
};
