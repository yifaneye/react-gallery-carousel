import isEqual from 'lodash.isequal';

export const isEqualProps = (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
};
