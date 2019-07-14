import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, name, placeholder, id, value, onChange, required, disabled }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  disconnect: PropTypes.bool
};

export default Input;
