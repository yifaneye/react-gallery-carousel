import React from 'react';
import { Button } from 'react-responsive-button';
import 'react-responsive-button/dist/index.css';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

export const ArrowButton = (props) => {
  const className = `${styles.buttonWrapper} ${styles[props.direction]}`;
  return (
    <div className={className}>
      <Button
        disabled={props.disabled}
        shape='rectangle'
        style={{
          width: 20,
          height: 40,
          backgroundColor: 'transparent',
          backgroundImage: `url("data:image/svg+xml,%3Csvg height='40' preserveAspectRatio='xMidYMid meet' viewBox='0 0 10 20' width='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m0 20-10 10v-20-20l10 10 10 10z' fill='%23eee' fill-opacity='0.5'/%3E%3C/svg%3E%0A")`,
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
