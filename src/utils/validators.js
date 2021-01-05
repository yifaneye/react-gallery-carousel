export const positiveNumber = (optional = true) => {
  return (props, propName, componentName) => {
    const prop = props[propName];
    if (optional && prop === undefined) return;
    if (typeof prop !== 'number' || prop <= 0)
      return new Error(
        `Invalid prop \`${propName}\` of type \`${typeof prop}\` supplied to \`${componentName}\`, expected \`number\`.`
      );
  };
};

export const numberBetween = (min, max, optional = true) => {
  return (props, propName, componentName) => {
    const prop = props[propName];
    if (optional && prop === undefined) return;
    if (typeof prop !== 'number' || min < prop < max)
      return new Error(
        `Invalid prop \`${propName}\` of type \`${typeof prop}\` supplied to \`${componentName}\`, expected ${min} < \`number\` < ${max}.`
      );
  };
};
