// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";

const FailedPurchaseModal = ({ onClose }) => (
  <div className="purchase-message-modal">
    <div className="purchase-message-content purchased-fail">
      <p>Your media bundle purchase has failed, please contact your bank and try again.</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

FailedPurchaseModal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default FailedPurchaseModal;
