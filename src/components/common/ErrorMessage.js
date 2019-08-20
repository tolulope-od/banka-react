import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ errors }) => (
  <div>
    <img
      src="https://res.cloudinary.com/tolulope-od/image/upload/v1563463864/action-error_ohkpfa.png"
      alt="error-image"
      width="80"
    />
    <h3>{errors.error || 'Something Unusual happened'}</h3>
    <input
      type="submit"
      className="accnt-create-btn"
      name="addAccount"
      value="OK"
      id="submit-btn"
    />
  </div>
);

ErrorMessage.propTypes = {
  errors: PropTypes.object
};

export default ErrorMessage;
