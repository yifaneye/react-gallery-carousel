import React, { Fragment } from 'react';
import { ArrowButton } from '../Button/Button';

export const ArrowButtons = (props) => {
  if (props.disabled) return null;

  return (
    <Fragment>
      <ArrowButton direction='left' clickCallback={props.onClickLeft} />
      <ArrowButton direction='right' clickCallback={props.onClickRight} />
    </Fragment>
  );
};
