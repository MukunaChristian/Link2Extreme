// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const PurchaseMessageModal = ({ onClose }) => (
  <div className="purchase-message-modal">
    <div className="purchase-message-content">
      <p>Please purchase your media bundle in order for you to download.</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

PurchaseMessageModal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default PurchaseMessageModal;
