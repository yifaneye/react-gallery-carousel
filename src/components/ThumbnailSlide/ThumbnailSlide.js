import React, { useRef } from 'react';
import styles from './ThumbnailSlide.module.css';
import PropTypes from 'prop-types';
import useAnchor from '../../utils/useAnchor';

export const ThumbnailSlide = (props) => {
  const slideRef = useRef(null);
  const slideClassName = `${styles.slide}${
    props.isCurrent ? ' ' + styles.currentSlide : ''
  }`;

  useAnchor(slideRef, props.isCurrent);

  return (
    <div
      ref={slideRef}
      className={slideClassName}
      onClick={props.clickCallback}
    >
      {props.slide}
    </div>
  );
};

ThumbnailSlide.propTypes = {
  slide: PropTypes.node.isRequired,
  isCurrent: PropTypes.bool,
  clickCallback: PropTypes.func
};
