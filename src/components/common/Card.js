import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ cardContent }) => {
  return <div className="account-stats-card">{cardContent}</div>;
};

Card.propTypes = {
  cardContent: PropTypes.object.isRequired
};

export default Card;
