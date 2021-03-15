import PropTypes from 'prop-types';

export const positiveNumber = (allow0 = false, optional = true) => {
  return (props, propName, componentName) => {
    const prop = props[propName];
    if (optional && prop === undefined) return;
    if (typeof prop !== 'number' || prop < 0 || (!allow0 && prop === 0))
      return new Error(
        `Invalid prop \`${propName}\` of type \`${typeof prop}\` supplied to \`${componentName}\`, expected \`number\` ${
          allow0 ? '>=' : '>'
        } 0.`
      );
  };
};

export const numberBetween = (
  min,
  max,
  { includeMin = false, includeMax = false, optional = true } = {}
) => {
  return (props, propName, componentName) => {
    const prop = props[propName];
    if (optional && prop === undefined) return;
    if (
      typeof prop !== 'number' ||
      !(min <= prop <= max) ||
      (!includeMin && min === prop) ||
      (!includeMax && max === prop)
    )
      return new Error(
        `Invalid prop \`${propName}\` of type \`${typeof prop}\` supplied to \`${componentName}\`, expected ${min} ${
          includeMin ? '<=' : '<'
        } \`number\` ${includeMax ? '<=' : '<'} ${max}.`
      );
  };
};

const comparator = {
  '>=': (a, b) => a >= b
};

export const compareToProp = (operator, otherPropName, optional = true) => {
  return (props, propName, componentName) => {
    const prop = props[propName];
    const otherProp = props[otherPropName];
    if (optional && prop === undefined) return;
    if (
      typeof prop !== 'number' ||
      typeof otherProp !== 'number' ||
      !comparator[operator](prop, otherProp)
    )
      return new Error(
        `Invalid prop \`${propName}\` of type \`${typeof prop}\` supplied to \`${componentName}\`, expected ${propName} ${operator} ${otherPropName}.`
      );
  };
};

export const fallbackProps = (fallbackProps) => {
  return (props, propName, componentName) => {
    const prop = props[propName];
    if (prop !== undefined) return;
    if (!fallbackProps)
      return new Error(
        `The prop \`${propName} is marked as required in \`${componentName}, but its value is \`undefined\`.`
      );
    for (const fallbackProp of fallbackProps) {
      if (props[fallbackProp] !== undefined) return;
    }
    return new Error(
      `The props \`${fallbackProps}\` and \`${propName} are marked as at least one required in \`${componentName}, but their values are all \`undefined\`.`
    );
  };
};

export const elementRef = PropTypes.shape({ current: PropTypes.object });

export const objectFitStyles = PropTypes.oneOf([
  'contain',
  'cover',
  'fill',
  'none',
  'scale-down'
]);

export const smallWidgetPositions = PropTypes.oneOf([
  false,
  'topLeft',
  'topCenter',
  'topRight',
  'bottomLeft',
  'bottomCenter',
  'bottomRight'
]);

export const largeWidgetPositions = PropTypes.oneOf([false, 'top', 'bottom']);

export const slideObject = PropTypes.oneOfType([
  PropTypes.object.isRequired,
  PropTypes.element.isRequired
]);

export const imageObject = PropTypes.shape({
  src: PropTypes.string.isRequired,
  srcset: PropTypes.string,
  alt: PropTypes.string,
  thumbnail: PropTypes.string
});
