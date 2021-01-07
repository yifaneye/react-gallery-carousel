import React from 'react';
import { Button } from 'react-responsive-button';
import 'react-responsive-button/dist/index.css';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

export const ArrowButton = (props) => {
  const className = `${styles.buttonWrapper} ${styles[props.direction]}`;
  const icons = {
    left: `url("data:image/svg+xml,%3Csvg height='40' preserveAspectRatio='xMidYMid meet' viewBox='0 0 20 40' width='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m20 0v40l-20-20z' fill='%23eee' fill-opacity='.5'/%3E%3C/svg%3E")`,
    right: `url("data:image/svg+xml,%3Csvg height='40' preserveAspectRatio='xMidYMid meet' viewBox='0 0 20 40' width='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m0 40v-40l20 20z' fill='%23eee' fill-opacity='.5'/%3E%3C/svg%3E")`
  };
  return (
    <div className={className}>
      <Button
        disabled={props.disabled}
        shape='rectangle'
        style={{
          width: 20,
          height: 40,
          backgroundColor: 'transparent',
          backgroundImage: icons[props.direction],
          backgroundSize: '20px 40px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        onClick={props.clickCallback}
      />
    </div>
  );
};

ArrowButton.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  disabled: PropTypes.bool,
  clickCallback: PropTypes.func
};

export const MediaButton = (props) => {
  const icon = props.isPlaying
    ? `url("data:image/svg+xml,%3Csvg height='30' preserveAspectRatio='xMidYMid meet' viewBox='0 0 30 30' width='30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eee' fill-opacity='.5'%3E%3Cpath d='m0 0h10v30h-10z'/%3E%3Cpath d='m20 0h10v30h-10z'/%3E%3C/g%3E%3C/svg%3E")`
    : `url("data:image/svg+xml,%3Csvg height='30' preserveAspectRatio='xMidYMid meet' viewBox='0 0 30 30' width='30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m15 22.5-15 7.5v-15-15l15 7.5 15 7.5z' fill='%23eee' fill-opacity='.5'/%3E%3C/svg%3E")`;
  const className = `${styles.buttonWrapper} ${styles.media}`;
  return (
    <div className={className}>
      <Button
        disabled={props.disabled}
        shape='rectangle'
        style={{
          width: 30,
          height: 30,
          backgroundColor: 'transparent',
          backgroundImage: icon,
          backgroundSize: '30px 30px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        onClick={props.clickCallback}
      />
    </div>
  );
};

MediaButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  clickCallback: PropTypes.func
};
