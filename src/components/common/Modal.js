import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ onClick, modalContent, className }) => {
  return (
    <div id="myModal" className={className} onClick={onClick}>
      <div className="modal-content" id="account-modal-content" onClick={onClick}>
        <span className="close" onClick={onClick} id="close-button">
          &times;
        </span>
        <div>{modalContent}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  modalContent: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired
};

export default Modal;
