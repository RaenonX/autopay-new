import React from 'react';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import styles from './main.module.scss';
import {FloatingControlCommonProps} from './type';


type Props = React.InputHTMLAttributes<HTMLInputElement> & FloatingControlCommonProps<HTMLInputElement> & {
  feedbackOnValid?: string,
  feedbackOnInvalid?: string,
  description?: string,
};

export const FloatingInput = ({label, feedbackOnValid, feedbackOnInvalid, description, ...props}: Props) => {
  // `placeholder` is not displayed here, but it's required for the floating label to work
  // `placeholder` also needs a non-zero-length value or the animation won't be displayed
  return (
    <FloatingLabel label={label} className={props.className}>
      <Form.Control {...props} placeholder=" " className={styles['override-autofill']}/>
      {
        feedbackOnValid &&
        <Form.Control.Feedback>{feedbackOnValid}</Form.Control.Feedback>
      }
      {
        feedbackOnInvalid &&
        <Form.Control.Feedback type="invalid">{feedbackOnInvalid}</Form.Control.Feedback>
      }
      {
        description &&
        <Form.Text className="text-info">{description}</Form.Text>
      }
    </FloatingLabel>
  );
};
