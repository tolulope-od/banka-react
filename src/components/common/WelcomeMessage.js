import React from 'react';
import PropTypes from 'prop-types';

const WelcomeMessage = ({ messageHead, messageBody, optionalLink }) => {
  return (
    <div className="col s5">
      <h1 className="tag-heading">{messageHead}</h1>
      <p className="bodyTxt intro">{messageBody}</p>
      {optionalLink}
    </div>
  );
};

WelcomeMessage.propTypes = {
  messageHead: PropTypes.string.isRequired,
  messageBody: PropTypes.string.isRequired,
  optionalLink: PropTypes.object
};

export default WelcomeMessage;
