// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const RecordsMessageModal = ({ onClose }) => (
  <div className="record-message-modal">
    <div className="record-message-content">
      <p>No records found matching filter criterias</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

RecordsMessageModal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default RecordsMessageModal;
