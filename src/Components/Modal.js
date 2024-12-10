import React from "react";
import PropTypes from "prop-types";

const Modal = ({ onClose, size, modalTitle, children }) => {
  const modalStyle = {
    display: "block",
    overflow: "scroll",
  };

  const modalBackdropStyle = {
    zIndex: "1060",
    height: "100%",
  };

  const modalDialogStyle = {
    zIndex: "1070",
  };

  const modalBodyStyle = {
    maxHeight: "85vh",
    overflowY: "scroll",
  };

  return (
    <div className="modal" tabIndex="-1" style={modalStyle}>
      <div
        className="modal-backdrop fade in"
        style={modalBackdropStyle}
        onClick={onClose}
      />
      <div className={`modal-dialog ${size}`} style={modalDialogStyle}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
            <h4 className="modal-title">{modalTitle}</h4>
          </div>
          <div className="modal-body" style={modalBodyStyle}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["modal-sm", "modal-lg", ""]),
  modalTitle: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Modal.defaultProps = {
  size: "",
};

export default Modal;
