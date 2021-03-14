import React from 'react';
import styles from './IconButton.module.css';
import PropTypes from 'prop-types';

// use inline SVGs to reduce the number of additional requests
const icons = {
  left: (
    <div className={styles.iconWrapper + ' ' + styles.rectangle}>
      <svg
        height='40'
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 20 40'
        width='20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title id='left-title'>Left</title>
        <path d='m20 0v40l-20-20z' fill='#fff' />
      </svg>
    </div>
  ),
  right: (
    <div className={styles.iconWrapper + ' ' + styles.rectangle}>
      <svg
        height='40'
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 20 40'
        width='20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title id='right-title'>Right</title>
        <path d='m0 40v-40l20 20z' fill='#fff' />
      </svg>
    </div>
  ),
  play: (
    <div className={styles.iconWrapper + ' ' + styles.square}>
      <svg
        height='30'
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 30 30'
        width='30'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title id='play-title'>Play</title>
        <path d='m15 22.5-15 7.5v-15-15l15 7.5 15 7.5z' fill='#fff' />
      </svg>
    </div>
  ),
  pause: (
    <div className={styles.iconWrapper + ' ' + styles.square}>
      <svg
        height='30'
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 30 30'
        width='30'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title id='pause-title'>Pause</title>
        <g fill='#fff'>
          <path d='m0 0h10v30h-10z' />
          <path d='m20 0h10v30h-10z' />
        </g>
      </svg>
    </div>
  ),
  max: (
    <div className={styles.iconWrapper + ' ' + styles.square}>
      <svg
        height='30'
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 30 30'
        width='30'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title id='max-title'>Maximize</title>
        <g fill='#fff'>
          <path d='m0 0h10v5h-10z' />
          <path d='m0 25h10v5h-10z' />
          <path d='m5 0v10h-5v-10z' />
          <path d='m5 20v10h-5v-10z' />
          <path d='m20 0h10v5h-10z' />
          <path d='m20 25h10v5h-10z' />
          <path d='m30 0v10h-5v-10z' />
          <path d='m30 20v10h-5v-10z' />
        </g>
      </svg>
    </div>
  ),
  min: (
    <div className={styles.iconWrapper + ' ' + styles.square}>
      <svg
        height='30'
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 30 30'
        width='30'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title id='min-title'>Minimize</title>
        <g fill='#fff'>
          <path d='m0 5h10v5h-10z' />
          <path d='m0 20h10v5h-10z' />
          <path d='m10 0v10h-5v-10z' />
          <path d='m10 20v10h-5v-10z' />
          <path d='m20 5h10v5h-10z' />
          <path d='m20 20h10v5h-10z' />
          <path d='m25 0v10h-5v-10z' />
          <path d='m25 20v10h-5v-10z' />
        </g>
      </svg>
    </div>
  ),
  active: (
    <div className={styles.iconWrapper + ' ' + styles.circle}>
      <svg
        height='10'
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 10 10'
        width='10'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title id='active-title'>Active</title>
        <path
          d='m10 5c0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5 5 2.24 5 5z'
          fill='#fff'
        />
      </svg>
    </div>
  ),
  passive: (
    <div className={styles.iconWrapper + ' ' + styles.circle}>
      <svg
        height='10'
        preserveAspectRatio='xMidYMid meet'
        viewBox='0 0 10 10'
        width='10'
        xmlns='http://www.w3.org/2000/svg'
      >
        <title id='passive-title'>Passive</title>
        <path
          d='m10 5c0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5 5 2.24 5 5z'
          fill='#bbb'
        />
      </svg>
    </div>
  )
};

export const IconButton = (props) => {
  const icon = props.icon === undefined ? icons[props.name] : props.icon;
  return (
    <button
      className={`${styles.button} ${
        props.hasShadow ? ' ' + styles.buttonShadow : ''
      }`}
      aria-label={props.label}
      aria-disabled={false}
      onClick={props.clickCallback}
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
  clickCallback: PropTypes.func.isRequired
};
