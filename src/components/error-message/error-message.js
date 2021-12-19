import React from 'react';
import { PropTypes } from 'prop-types';

const ErrorMessage = ({message}) => {
  return (
    <p className="container text text_type_main-default mt-5">
      {message}
    </p>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ErrorMessage;
