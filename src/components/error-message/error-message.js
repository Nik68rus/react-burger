import React from 'react';
import { PropTypes } from 'prop-types';

const ErrorMessage = ({message}) => {
  return (
    <section className="container">
      <p className="text text_type_main-default mt-5">
        {message}
      </p>
    </section>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ErrorMessage;
