import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import axios from "axios";
import IPConfig from "./IPConfig";
import { useParams } from "react-router";

// eslint-disable-next-line react/prop-types
const HomeMessageModal = ({ onClose, userId }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [, setMessageObject] = useState();
  const navigate = useNavigate();
  const [, setMessage] = useState([]);
  const [ip] = useState(IPConfig());
  const { userid } = useParams(); // Access userid parameter

  console.log(userId);
  console.log(isChecked);
  const acceptButtonStyle = {
    backgroundColor: isChecked ? "green" : "#f1faff",
    color: isChecked ? "white" : "#38a7e7",
    cursor: isChecked ? "pointer" : "not-allowed"
  };
  const nextPage = () => {
    navigate(`/client_portal/checkout/${userid}`);
  };

  useEffect(() => {
    axios
      .get(`${ip}/api/${userId}`, {
        headers: {
          Accept: "application/json"
        }
      })
      .then(response => {
        console.log(response);
        setMessageObject(response.data);
        setMessage(response.data.message);
        console.log(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  }, [ip]);

  const handleCheckboxChange = () => {
    setIsChecked(prevChecked => !prevChecked);
  };

  const handleAccept = () => {
    console.log("handleAccept called");
    console.log("isChecked:", isChecked);

    if (isChecked) {
      //Resets purchased_response to 0
      axios
        .post(
          `${ip}/${userId}/payment/reset_client`,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          console.log("POST request success:", response);
        })
        .catch(error => {
          console.error("POST request error:", error);
        });

      axios
        .post(
          `${ip}/disclaimer/${userId}/${isChecked}`,
          {
            key1: "value1",
            key2: "value2"
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          console.log("POST request success:", response);

          if (
            response.data &&
            response.data.message === "Disclaimer updated successfully"
          ) {
            console.log("API success:", response.data);

            onClose();
            nextPage();
          } else {
            console.error("API error:", response.data);
          }
        })
        .catch(error => {
          console.error("POST request error:", error);
        });
    }
  };

  return (
    <div className="home-message-modal">
      <div className="home-message-content">
        <p>
          Link2Extreme is redirecting you to Paygate in order to process your
          payment.
        </p>
        <div className="check-box-text">
          <p>Please confirm by checking the box:</p>
          <input
            className="check-box"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="btn-msg">
          <button
            className="btn-msg2"
            onClick={handleAccept}
            disabled={!isChecked}
            style={acceptButtonStyle}
          >
            Accept
          </button>
          <button className="btn-msg2" onClick={onClose}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

HomeMessageModal.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default HomeMessageModal;
