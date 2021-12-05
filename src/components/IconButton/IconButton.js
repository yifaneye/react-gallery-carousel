import React from 'react';
import styles from './IconButton.module.css';
import PropTypes from 'prop-types';

// use inline SVGs to reduce the number of additional requests
const icons = {
  left: (
    <div className={styles.iconWrapper + ' ' + styles.rectangle}>
      <svg
        className={styles.icon}
        height='40'
        preserveAspectRatio='xMidYMid meet'
        role='img'
        viewBox='0 0 20 40'
        width='20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='m19 1v37l-18-20z' />
      </svg>
    </div>
  ),
  right: (
    <div className={styles.iconWrapper + ' ' + styles.rectangle}>
      <svg
        className={styles.icon}
        height='40'
        preserveAspectRatio='xMidYMid meet'
        role='img'
        viewBox='0 0 20 40'
        width='20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='m1 1v38l18-19z' />
      </svg>
    </div>
  ),
  play: (
    <div className={styles.iconWrapper + ' ' + styles.square}>
      <svg
        className={styles.icon}
        height='30'
        preserveAspectRatio='xMidYMid meet'
        role='img'
        viewBox='0 0 30 30'
        width='30'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='m1 1v28l28-14z' />
      </svg>
    </div>
  ),
  pause: (
    <div className={styles.iconWrapper + ' ' + styles.square}>
      <svg
        className={styles.icon}
        height='30'
        preserveAspectRatio='xMidYMid meet'
        role='img'
        viewBox='0 0 30 30'
        width='30'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='m1 1v28h9v-28zm19 0v28h9v-28z' />
      </svg>
    </div>
  ),
  max: (
    <div className={styles.iconWrapper + ' ' + styles.square}>
      <svg
        className={styles.icon}
        height='30'
        preserveAspectRatio='xMidYMid meet'
        role='img'
        viewBox='0 0 30 30'
        width='30'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='m1 1v10h5v-5h5v-5zm18 0v5h5v5h5v-10zm-18 18v10h10v-5h-5v-5zm18 5v5h10v-10h-5v5z' />
      </svg>
    </div>
  ),
  min: (
    <div className={styles.iconWrapper + ' ' + styles.square}>
      <svg
        className={styles.icon}
        height='30'
        preserveAspectRatio='xMidYMid meet'
        role='img'
        viewBox='0 0 30 30'
        width='30'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='m6 1v5h-5v5h10v-10zm13 0v10h10v-5h-5v-5zm-18 18v5h5v5h5v-10zm18 0v10h5v-5h5v-5z' />
      </svg>
    </div>
  ),
  active: (
    <div className={styles.iconWrapper + ' ' + styles.circle}>
      <svg
        className={styles.icon}
        height='10'
        preserveAspectRatio='xMidYMid meet'
        role='img'
        viewBox='0 0 10 10'
        width='10'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='5' cy='5' r='4' fill='#888' />
      </svg>
    </div>
  ),
  passive: (
    <div className={styles.iconWrapper + ' ' + styles.circle}>
      <svg
        className={styles.icon}
        height='10'
        preserveAspectRatio='xMidYMid meet'
        role='img'
        viewBox='0 0 10 10'
        width='10'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='5' cy='5' r='4' />
      </svg>
    </div>
  )
};

export const IconButton = (props) => {
  // only take the user-supplied icon if it is not undefined;
  // use the default icon as a fallback
  const icon = props.icon !== undefined ? props.icon : icons[props.name];
  return (
    <button
      className={
        styles.button + `${props.hasShadow ? ' ' + styles.buttonShadow : ''}`
      }
      type='button'
      aria-label={props.label}
      aria-disabled={false}
      onClick={props.onClick}
    >
      {icon}
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.node,
  name: PropTypes.oneOf([
    'left',
    'right',
    'play',
    'pause',
    'max',
    'min',
    'active',
    'passive'
  ]).isRequired,
  hasShadow: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
